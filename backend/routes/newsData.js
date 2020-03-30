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

const CurrentsAPI = require("currentsapi");
const currentsapi = new CurrentsAPI(
  "PM3LZ_crm3Fc8aMyEs2Qpen-bs5KbpwvE32qQ3p3HfRIM0D1"
);
const availableCountriesCheap = [
  "us",
  "au",
  "ve",
  "de",
  "br",
  "ca",
  "cn",
  "fi",
  "fr",
  "hk",
  "in",
  "id",
  "vn",
  "my",
  "sg",
  "jp",
  "ph",
  "mx",
  "nl",
  "no",
  "nz",
  "pt",
  "ru",
  "sa",
  "ch",
  "sk",
  "tw",
  "th",
  "ae",
  "de",
  "gb",
  "ie",
  "zw",
  "mm",
  "it",
  "gr"
];

router.post("/", async (req, res) => {
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
    } else {
      locCountry = "N/A";
    }
  } else {
    locCountry = "N/A";
  }
  var params = {
    q: "virus",
    country: locCountry
  };
  if (locCountry === "N/A") {
    console.log("invalid country");
    delete params.country;
    params.language = "en";
  }
  console.log(params);
  try {
    newsapi.v2.topHeadlines(params).then(response => {
      return res.send(response.articles);
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/cheap", async (req, res) => {
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
            if (availableCountriesCheap.includes(address)) {
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
    } else {
      locCountry = "N/A";
    }
  } else {
    locCountry = "N/A";
  }
  var params = {
    keywords: "virus",
    country: locCountry
  };
  if (locCountry === "us") {
    params.domain = "npr.org";
  }
  if (locCountry === "N/A") {
    console.log("invalid country");
    delete params.country;
    params.language = "en";
  }
  console.log(params);
  try {
    currentsapi.search(params).then(response => {
      return res.send(response.news);
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
