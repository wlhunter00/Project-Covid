const express = require("express");
const router = express.Router();
var request = require("request");

router.get("/allData", async (req, res) => {
  try {
    await request("https://covid.cape.io/states/daily", function(
      error,
      response,
      body
    ) {
      var data = JSON.parse(body);
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
