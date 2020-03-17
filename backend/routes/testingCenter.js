const express = require("express");
const router = express.Router();
const fs = require("fs");
const CsvReadableStream = require("csv-reader");
const Notification = require("./../models/notification.js");

const ABBREV = "Abbreviation";
const csv = require("csv-parser");
var request = require("request-promise");
var address;
var stateInfo;

router.get("/testCenter", async (req, res) => {
  var serverLocation = req.body;
  console.log(serverLocation);

  var coords = parseCoord(serverLocation);

  const MPurl =
    "http://www.mapquestapi.com/geocoding/v1/reverse?key=5FAG0NhAjLLNkkvmLKhMfzSvqQcEhING&location=" +
    coords[0] +
    "," +
    coords[1];
  request(MPurl, function(error, response, body) {
    var data = JSON.parse(body);
    address = data["results"][0]["locations"][0]["adminArea3"];
    console.log(address);
  }).then(getStateInfo);

  res.send(stateInfo);
});

function parseCoord(request) {
  try {
    var loc = JSON.parse(request);
    var latitude = loc["location"]["coords"]["latitude"];
    var longitude = loc["location"]["coords"]["longitude"];
    return [latitude, longitude];
  } catch (err) {
    console.error(err);
  }
}

function getStateInfo() {
  var readStream = fs
    .createReadStream("./data/test-center.csv")
    .pipe(csv())
    .on("data", function(row) {
      try {
        if (row[ABBREV] == address) {
          stateInfo = row;
          readStream.destroy();
        }
      } catch (err) {}
    });
}

module.exports = router;
