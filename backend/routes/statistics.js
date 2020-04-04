const express = require("express");
const router = express.Router();
var request = require("request-promise");
const countryNames = require("./../data/countries.json");
const stateNames = require("./../data/states.json");

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

function getStateAbrev(abbreviation) {
  for (const prop in stateNames) {
    if (stateNames[prop].abbreviation.toLowerCase() === abbreviation) {
      return stateNames[prop].name;
    }
  }
  console.log("No State Name Found!");
  return null;
}

function getCountryAbrev(abbreviation) {
  for (const prop in countryNames) {
    if (countryNames[prop].code.toLowerCase() === abbreviation) {
      return countryNames[prop].name.toLowerCase();
    }
  }
  console.log("No Country Name Found!");
  return null;
}

router.post("/", async (req, res) => {
  // Get country statistics
  var stats = {
    Global_Stats: {
      NewConfirmed: 0,
      TotalConfirmed: 0,
      NewDeaths: 0,
      TotalDeaths: 0,
      NewRecovered: 0,
      TotalRecovered: 0
    }
  };
  var prettyStats = {
    Global_Stats: {
      NewConfirmed: "",
      TotalConfirmed: "",
      NewDeaths: "",
      TotalDeaths: "",
      NewRecovered: "",
      TotalRecovered: ""
    }
  }
  var locationData = false;
  var globalData = false;
  var stateData = false;
  var stateName;
  var stateConfirmed;
  var stateRecovered;
  var stateDeaths;
  var countryData = [];
  var countryCode;
  var stateCode;
  var globalDate;
  var stateDate;
  try {
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
              let address = location[0];
              let county = address.adminArea4;
              let state = address.adminArea3;
              stateCode = getStateAbrev(state.toLowerCase());
              let country = address.adminArea1;
              countryCode = getCountryAbrev(country.toLowerCase());
              locationData = true;
            }
          });
        } catch (err) {
          return res.status(400).send({
            message: err
          });
        }
      }
    }
  } catch (err) {
    return res.status(400).send({
      message: err
    });
  }
  try {
    await request("https://api.covid19api.com/summary", function(
      error,
      response,
      body
    ) {
      bodyData = JSON.parse(body);
      globalDate = new Date(bodyData.Date);
      countryData = bodyData.Countries;
    });
    // Set global data
    globalData = true;
  } catch (err) {
    return res.status(400).send({
      message: err
    });
  }
  if (locationData) {
    var dateObj = new Date();
    dateObj.setHours(dateObj.getHours() - 2);
    const statusCodes = ["Confirmed", "Recovered", "Deaths"];
    for (const code in statusCodes) {
      var reqURL =
        "https://api.covid19api.com/live/country/" +
        countryCode +
        "/status/" +
        statusCodes[code].toLowerCase() +
        "/date/" +
        dateObj.toISOString();
      try {
        await request(reqURL, function(error, response, body) {
          tempStateData = JSON.parse(body);
          for (const prop in tempStateData) {
            if (tempStateData[prop].Province === stateCode) {
              stateName = tempStateData[prop]["Province"];
              stateDate = tempStateData[prop]["Date"];
              if (statusCodes[code] === "Confirmed") {
                stateConfirmed = tempStateData[prop]["Cases"];
                stateData = true;
              }
              if (statusCodes[code] === "Recovered") {
                stateRecovered = tempStateData[prop]["Cases"];
                stateData = true;
              }
              if (statusCodes[code] === "Deaths") {
                stateDeaths = tempStateData[prop]["Cases"];
                stateData = true;
              }
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
  if (globalData) {
    for (const prop in countryData) {
      stats.Global_Stats.NewConfirmed += countryData[prop].NewConfirmed;
      prettyStats.Global_Stats.NewConfirmed = stats.Global_Stats.NewConfirmed.toLocaleString('en-US')
      stats.Global_Stats.TotalConfirmed += countryData[prop].TotalConfirmed;
      prettyStats.Global_Stats.TotalConfirmed = stats.Global_Stats.TotalConfirmed.toLocaleString('en-US')
      stats.Global_Stats.NewDeaths += countryData[prop].NewDeaths;
      prettyStats.Global_Stats.NewDeaths = stats.Global_Stats.NewDeaths.toLocaleString('en-US')
      stats.Global_Stats.TotalDeaths += countryData[prop].TotalDeaths;
      prettyStats.Global_Stats.TotalDeaths = stats.Global_Stats.TotalDeaths.toLocaleString('en-US')
      stats.Global_Stats.NewRecovered += countryData[prop].NewRecovered;
      prettyStats.Global_Stats.NewRecovered = stats.Global_Stats.NewRecovered.toLocaleString('en-US')
      stats.Global_Stats.TotalRecovered += countryData[prop].TotalRecovered;
      prettyStats.Global_Stats.TotalRecovered = stats.Global_Stats.TotalRecovered.toLocaleString('en-US')
      prettyStats.Global_Stats.Updated = globalDate;
    }
    if (locationData) {
      for (const prop in countryData) {
        if (countryData[prop].Slug === countryCode) {
          console.log("Country match!");
          stats.Country_Stats = countryData[prop];
          prettyStats.Country_Stats = {}
        }
      }
      for(const prop in stats.Country_Stats) {
        if(typeof stats.Country_Stats[prop]=="number"){
            prettyStats.Country_Stats[prop] = stats.Country_Stats[prop].toLocaleString('en-US');
        }else{
          prettyStats.Country_Stats[prop] = stats.Country_Stats[prop]
        }
        prettyStats.Country_Stats.Updated = globalDate;
      }
    }
  }
    if (stateData) {
      prettyStats.Province_Stats = {
        Name: stateName,
        Confirmed: stateConfirmed.toLocaleString('en-US'),
        Recovered: stateRecovered.toLocaleString('en-US'),
        Deaths: stateDeaths.toLocaleString('en-US'),
        Updated: stateDate
      };
    }

  return res.send(prettyStats);
});

router.post("/address", async (req, res) => {
  // Get country statistics
  var stats = {
    Global_Stats: {
      NewConfirmed: 0,
      TotalConfirmed: 0,
      NewDeaths: 0,
      TotalDeaths: 0,
      NewRecovered: 0,
      TotalRecovered: 0
    }
  };
  var locationData = false;
  var globalData = false;
  var stateData = false;
  var stateName;
  var stateConfirmed;
  var stateRecovered;
  var stateDeaths;
  var countryData = [];
  var countryCode;
  var stateCode;
  var globalDate;
  var stateDate;

  try {
    if (Object.keys(req.body).length != 0) {
      var address = req.body;
      let county = address.adminArea4;
      let state = address.adminArea3;
      stateCode = getStateAbrev(state.toLowerCase());
      let country = address.adminArea1;
      countryCode = getCountryAbrev(country.toLowerCase());
      locationData = true;
    }
  } catch (err) {
    console.log(err);
    locationData = false;
  }
  try {
    await request("https://api.covid19api.com/summary", function(
      error,
      response,
      body
    ) {
      bodyData = JSON.parse(body);
      globalDate = new Date(bodyData.Date);
      countryData = bodyData.Countries;
    });
    // Set global data
    globalData = true;
  } catch (err) {
    return res.status(400).send({
      message: err
    });
  }
  if (locationData) {
    var dateObj = new Date();
    dateObj.setHours(dateObj.getHours() - 2);
    const statusCodes = ["Confirmed", "Recovered", "Deaths"];
    for (const code in statusCodes) {
      var reqURL =
        "https://api.covid19api.com/live/country/" +
        countryCode +
        "/status/" +
        statusCodes[code].toLowerCase() +
        "/date/" +
        dateObj.toISOString();
      try {
        await request(reqURL, function(error, response, body) {
          tempStateData = JSON.parse(body);
          for (const prop in tempStateData) {
            if (tempStateData[prop].Province === stateCode) {
              stateName = tempStateData[prop]["Province"];
              stateDate = tempStateData[prop]["Date"];
              if (statusCodes[code] === "Confirmed") {
                stateConfirmed = tempStateData[prop]["Cases"];
                stateData = true;
              }
              if (statusCodes[code] === "Recovered") {
                stateRecovered = tempStateData[prop]["Cases"];
                stateData = true;
              }
              if (statusCodes[code] === "Deaths") {
                stateDeaths = tempStateData[prop]["Cases"];
                stateData = true;
              }
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
  if (globalData) {
    for (const prop in countryData) {
      stats.Global_Stats.NewConfirmed += countryData[prop].NewConfirmed;
      stats.Global_Stats.TotalConfirmed += countryData[prop].TotalConfirmed;
      stats.Global_Stats.NewDeaths += countryData[prop].NewDeaths;
      stats.Global_Stats.TotalDeaths += countryData[prop].TotalDeaths;
      stats.Global_Stats.NewRecovered += countryData[prop].NewRecovered;
      stats.Global_Stats.TotalRecovered += countryData[prop].TotalRecovered;
      stats.Global_Stats.Updated = globalDate;
    }
    if (locationData) {
      for (const prop in countryData) {
        if (countryData[prop].Slug === countryCode) {
          console.log("Country match!");
          stats.Country_Stats = countryData[prop];
        }
      }
      stats.Country_Stats.Updated = globalDate;
    }
  }
  if (stateData) {
    stats.Province_Stats = {
      Name: stateName,
      Confirmed: stateConfirmed,
      Recovered: stateRecovered,
      Deaths: stateDeaths,
      Updated: stateDate
    };
  }

  return res.send(stats);
});

module.exports = router;
