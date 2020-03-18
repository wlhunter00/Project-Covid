const express = require("express");
const router = express.Router();
const fs = require("fs");
var request = require("request-promise");
const neatCsv = require("neat-csv");

// ISSUE: ASYNC issue. At line 23 we are asking for state info and to parse a csv, it parses the csv but returns before the parsing is done.

router.post("/", async (req, res) => {
  var serverLocation = req.body;
  var coords = parseCoord(serverLocation);
  const MPurl =
    "http://www.mapquestapi.com/geocoding/v1/reverse?key=5FAG0NhAjLLNkkvmLKhMfzSvqQcEhING&location=" +
    coords[0] +
    "," +
    coords[1];
  try {
    await request(MPurl, async function(err, response, body) {
      var data = JSON.parse(body);
      let address = await data["results"][0]["locations"][0]["adminArea3"];
      console.log(address);
      try {
        // we are awaiting here but its not working
        let stateInfo = await getStateInfo(address);
        console.log(stateInfo);
        // res.send(address);
      } catch (err) {
        console.log(err);
      }
      res.send(address);
    });
  } catch (err) {
    console.log(err);
  }
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
  const file = fs.readFile("./data/test-center.csv", async (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // We are awaiting here
    const allInfo = await neatCsv(data);

    // parse the csv
    for (var i = 0; i < allInfo.length; ++i) {
      if (allInfo[i].Abbreviation === address) {
        const stateInfo = allInfo[i];
        // Console logging works
        console.log(stateInfo);
        // but then returning doesn't
        return stateInfo;
      }
    }
  });
}

module.exports = router;
