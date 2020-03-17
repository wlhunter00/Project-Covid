const express = require("express");
const router = express.Router();
const Notification = require("./../models/notification.js");

router.get("/", async (req, res) => {
  res.send("test");
});

module.exports = router;
