const express = require("express");
const router = express.Router();
var request = require("request");

function replaceByValue(value, newvalue) {
  if (value === null) {
    value = newvalue;
  }
  return value;
}

function calculateRatios(data) {
  data["deathrate"] = (data["death"] / data["positive"]) * 100;
  data["positiverate"] = (data["positive"] / data["total"]) * 100;
  data["pendingrate"] = (data["pending"] / data["total"]) * 100;
  return data;
}

function cleanJSON(json, state) {
  for (var k = 0; k < json.length; ++k) {
    json[k]["pending"] = replaceByValue(json[k]["pending"], 0);
    json[k]["death"] = replaceByValue(json[k]["death"], 0);
    json[k]["negative"] = replaceByValue(json[k]["negative"], 0);
    json[k]["positive"] = replaceByValue(json[k]["positive"], 0);
    calculateRatios(json[k]);
  }
  return json;
}

function parseOut(data, val, target) {
  var newData = [];
  for (var k = 0; k < data.length; ++k) {
    if (data[k][target] === val) {
      newData.push(data[k]);
    }
  }
  return JSON.stringify(newData);
}

router.get("/allData", async (req, res) => {
  try {
    await request("https://covid.cape.io/states/daily", function(
      error,
      response,
      body
    ) {
      var data = JSON.parse(body);
      cleanJSON(data);
      res.send(data);
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/allData/:state", async (req, res) => {
  const state = req.params.state;
  try {
    await request("https://covid.cape.io/states/daily", function(
      error,
      response,
      body
    ) {
      var data = JSON.parse(body);
      var data2 = JSON.parse(parseOut(data, state, "state"));
      cleanJSON(data2);
      res.send(data2);
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/today", async (req, res) => {
  try {
    await request("https://covid.cape.io/states/daily", function(
      error,
      response,
      body
    ) {
      var data = JSON.parse(body);
      const latest = data[0]["date"];
      var data2 = JSON.parse(parseOut(data, latest, "date"));
      cleanJSON(data2);
      res.send(data2);
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/today/:state", async (req, res) => {
  const state = req.params.state;
  try {
    await request("https://covid.cape.io/states/daily", function(
      error,
      response,
      body
    ) {
      var data = JSON.parse(body);
      const latest = data[0]["date"];
      var data2 = JSON.parse(
        parseOut(JSON.parse(parseOut(data, latest, "date")), state, "state")
      );
      cleanJSON(data2);
      res.send(data2);
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:date", async (req, res) => {
  const date = parseInt(req.params.date);
  try {
    await request("https://covid.cape.io/states/daily", function(
      error,
      response,
      body
    ) {
      var data = JSON.parse(body);
      var data2 = JSON.parse(parseOut(data, date, "date"));
      cleanJSON(data2);
      res.send(data2);
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:date/:state", async (req, res) => {
  const date = parseInt(req.params.date);
  const state = req.params.state;
  try {
    await request("https://covid.cape.io/states/daily", function(
      error,
      response,
      body
    ) {
      var data = JSON.parse(body);
      var data2 = JSON.parse(
        parseOut(JSON.parse(parseOut(data, date, "date")), state, "state")
      );
      cleanJSON(data2);
      res.send(data2);
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
