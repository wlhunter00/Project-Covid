const express = require("express");
const router = express.Router();
var request = require("request-promise");

router.post("/", async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Could not read location!"
    });
  }
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
      let location = await data["results"][0]["locations"];
      if (location === undefined || location.length == 0) {
        return res.status(400).send({
          message: "Could not parse coordinates!"
        });
      }
      let address = location[0];
      res.send(address);
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

module.exports = router;
