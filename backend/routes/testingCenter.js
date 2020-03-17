const express = require("express");
const router = express.Router();
const fs = require("fs");
const CsvReadableStream = require("csv-reader");

const ABBREV = "Abbreviation";
const csv = require("csv-parser");
var request = require("request-promise");

router.post("/", async (req, res) => {
  var serverLocation = req.body;
  var coords = parseCoord(serverLocation);

  const MPurl =
    "http://www.mapquestapi.com/geocoding/v1/reverse?key=5FAG0NhAjLLNkkvmLKhMfzSvqQcEhING&location=" +
    coords[0] +
    "," +
    coords[1];

  request(MPurl, async function(error, response, body) {
    var data = JSON.parse(body);
    address = data["results"][0]["locations"][0]["adminArea3"];
    console.log(address);
    let stateInfo = await getStateInfo(address);
    console.log(stateInfo);
    res.send(address);
  });
});

function parseCoord(loc) {
  try {
    // var loc = JSON.parse(request);
    console.log(loc);
    var latitude = loc["location"]["coords"]["latitude"];
    var longitude = loc["location"]["coords"]["longitude"];
    return [latitude, longitude];
  } catch (err) {
    console.error(err);
  }
}

async function getStateInfo(address) {
  var readStream = fs
    .createReadStream("./data/test-center.csv")
    .pipe(csv())
    .on("data", function(row) {
      try {
        if (row[ABBREV] == address) {
          readStream.destroy();
          return row;
        }
      } catch (err) {
        console.log(err);
      }
    });
}

module.exports = router;
