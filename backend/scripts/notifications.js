const PushToken = require("../models/pushtoken");

const expoServer = require('expo-server-sdk');

let Expo = expoServer.Expo
let expo = new Expo();

function sendNotification(message){
	// Create the messages that you want to send to clents
	let messages = [];
	PushToken.find({}, function(err, tokens){
		if(err){
			console.log(err)
			return err;
		}
		if(!tokens){
			return [];
		}
		for (let pushToken of tokens) {
		  	// validation of token
			if (!Expo.isExpoPushToken(pushToken)) {
		    	console.error(`Push token ${pushToken} is not a valid Expo push token`);
		    	continue;
			}

		  	// Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications)
		  	messages.push({
		    	to: pushToken,
		    	sound: 'default',
		    	body: message.body,
		    	data: { withSome: message.title },
		  	});
		}

		let chunks = expo.chunkPushNotifications(messages);
		let tickets = [];
		(async () => {
		 	// Send the chunks to the Expo push notification service. There are
		  	for (let chunk of chunks) {
		    	try {
		      		let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
	      			console.log(ticketChunk);
	      			tickets.push(...ticketChunk);
		      	} catch (error) {
		      		console.error(error);
		    	}
		  	}
		})();


	});
}

module.exports = {
	sendNotification: sendNotification,
}