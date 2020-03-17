const express = require("express");
const router = express.Router();
const Notification = require("./../models/notification.js");
const utils = require("../scripts/utilities");

router.get("/", async (req, res) => {
  res.send("test");
});

router.post("/verify/email", function(req, res){
	let response = utils.sendEmail(req.body.email)
	return res.send(response);
})

module.exports = router;
