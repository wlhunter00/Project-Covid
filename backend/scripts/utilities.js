const mailjet = require ('node-mailjet').connect(process.env.MAILJET_API_KEY, process.env.MAILJET_API_SECRET_KEY)
const emails = [
	"talk2ajah@gmail.com",
	"ajahso4@yahoo.com"
]

const Notification = require("../models/notification");



const chars = ['a','b','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
				'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
				'1','2','3','4','5','6','7','8','9','0']
/*
	creates a unique pass code that would be used to authenticate users
*/
function createCode(){
	let code = '';
	let numOfChars = 5;
	for(let i = 0; i < numOfChars; i++){
		let charIndex = Math.floor(Math.random() * chars.length);
		code += chars[charIndex];
	}
	return code;
}

/*
	responsible for sending out emails 
*/


function sendEmail(email){
	if(emails.indexOf(email) > -1){
		let code = createCode();
		// send user email
		const request = mailjet
		.post("send", {'version': 'v3.1'})
		.request({
		  "Messages":[
		    {
		      "From": {
		        "Email": "ajah@renterland.com",
		        "Name": "Ajah Chukwuemeka"
		      },
		      "To": [
		        {
		          "Email": email,
		          "Name": "Corona Virus Volunteer"
		        }
		      ],
		      "Subject": "Your login pass code: COVID-19 Team",
		      "TextPart": `Please use this pass code to login on the push notification service ${code}`,
		      "HTMLPart": `<p>Please use this pass code to login on the push notification service <b>${code}</b></p>`,
		      "CustomID": "AppGettingStartedTest"
		    }
		  ]
		});
		request.then((result) => {
		    console.log(result.body)
		 })
		.catch((err) => {
		    console.log(err)
		})

		return {email:email, code:code,  success:true}
	}
	return {email:email, code:undefined, success:false}
}

function sendNotification(requestBody, responseFunction){
	let newNotification = new Notification();
	newNotification.title = requestBody.title;
	newNotification.body = requestBody.body;
	// send notification sequence
	newNotification.save(function(err, savedNotification){
		if(err){
			console.log(err);
			return responseFunction(err);
		}
		return responseFunction(savedNotification);
	})
}

module.exports = {
	sendEmail : sendEmail,
	sendNotification: sendNotification
}