const express = require("express");
const router = express.Router();
const Notification = require("./../models/notification.js");
const utils = require("../scripts/utilities");
const dotenv = require('dotenv');
dotenv.config();

let userPassCodes = {}

router.get("/", async (req, res) => {
  res.send("test");
});

router.post("/verify/email", function(req, res){
	let response = utils.sendEmail(req.body.email)

	userPassCodes[req.body.email] = response.code;
	return res.send(response);
});

router.post("/verify/passcode", function(req, res){
	console.log(req.body);
	if(userPassCodes[req.body.email] == req.body.passCode){
		return res.send({success:true, message:"Successfully logged in"});
	}
	return res.send({success:false, message:"Incorrect pass code. Please try again"});
});



router.post("/notification", function(req,res){
	console.log(req.body);
	utils.sendNotification(req.body, function(response){
		if(response instanceof Error){
			return res.send({success:false, message:"The push notification could not be sent."});
		}
		console.log(response);
		return res.send({success:true, message:"The push notification has been successfully sent"});
	})
});

router.post("/pushtoken", function(req,res){
	utils.addPushToken(req.body, function(response){
		if(response instanceof Error){
			return res.send({success:false, message:"Could not save push token to DB"});
		}
		return res.send({success:true, message:"The push token was successfully saved."});
	})
})

module.exports = router;
