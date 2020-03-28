const express = require("express");
const router = express.Router();
var request = require("request-promise");

const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("d64db49e30a44bf2a0411d73f363dbb4");
const availableCountries = [
  "ae",
  "ar",
  "at",
  "au",
  "be",
  "bg",
  "br",
  "ca",
  "ch",
  "cn",
  "co",
  "cu",
  "cz",
  "de",
  "eg",
  "fr",
  "gb",
  "gr",
  "hk",
  "hu",
  "id",
  "ie",
  "il",
  "in",
  "it",
  "jp",
  "kr",
  "lt",
  "lv",
  "ma",
  "mx",
  "my",
  "ng",
  "nl",
  "no",
  "nz",
  "ph",
  "pl",
  "pt",
  "ro",
  "rs",
  "ru",
  "sa",
  "se",
  "sg",
  "si",
  "sk",
  "th",
  "tr",
  "tw",
  "ua",
  "us",
  "ve",
  "za"
];

router.get("/", async (req, res) => {
  var locCountry = "us";
  if (Object.keys(req.body).length != 0) {
    var serverLocation = req.body;
    var coords = parseCoord(serverLocation);
    if (coords) {
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
            console.log("Can't parse coordinates");
          } else {
            let address = location[0].adminArea1.toLowerCase();
            if (availableCountries.includes(address)) {
              locCountry = address;
            } else {
              locCountry = "N/A";
            }
          }
        });
      } catch (err) {
        return res.status(400).send({
          message: err
        });
      }
    }
  }
  var params = {
    q: "virus",
    country: locCountry
  };
  if (locCountry === "N/A") {
    console.log("invalid country");
    params.delete(country);
    params.language = "en";
  }
  console.log(params);
  try {
    newsapi.v2.topHeadlines(params).then(response => {
      res.send(response.articles.slice(0, 3));
    });
  } catch (err) {
    console.log(err);
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
