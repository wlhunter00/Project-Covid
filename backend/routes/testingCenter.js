const express = require("express");
const router = express.Router();
const fs = require("fs");
var request = require("request-promise");
const centerData = require("./../data/Testing-Center-Data.json");

router.post("/", async (req, res) => {
  var serverLocation = req.body;
  var coords = parseCoord(serverLocation);
  if (!coords) {
    return res.status(400).send({
      message: "Could not read coordinates!"
    });
  }
  const MPurl =
    "http://www.mapquestapi.com/geocoding/v1/reverse?key=5FAG0NhAjLLNkkvmLKhMfzSvqQcEhING&location=" +
    coords[0] +
    "," +
    coords[1];
  try {
    await request(MPurl, async function(err, response, body) {
      var data = JSON.parse(body);
      let address = await data["results"][0]["locations"][0]["adminArea3"];
      try {
        let stateInfo = await getStateInfo(address);
        res.send(stateInfo);
      } catch (err) {
        return res.status(400).send({
          message: err
        });
      }
    });
  } catch (err) {
    return res.status(400).send({
      message: err
    });
  }
});

function parseCoord(loc) {
  try {
    // var loc = JSON.parse(request);
    var latitude = loc["location"]["coords"]["latitude"];
    var longitude = loc["location"]["coords"]["longitude"];
    return [latitude, longitude];
  } catch (err) {
    console.error(err);
  }
}

async function getStateInfo(address) {
  for (const prop in centerData) {
    if (centerData[prop].Abbreviation === address) {
      return centerData[prop];
    }
  }
}

module.exports = router;
