const express = require("express");
const router = express.Router();
const Notification = require("./../models/notification.js");

router.post("/", async (req, res) => {
  var location = req.body;
  console.log(location);
  res.send(location);
});

module.exports = router;
