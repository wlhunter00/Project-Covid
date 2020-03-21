const express = require("express");
const router = express.Router();
const spawn = require("child_process").spawn;
const symptomData = require("./../data/Symptom-Percentages.json");
const nlpScriptRoute = __dirname + "/scripts/new_symptom.py";
const jsonPath = __dirname + "/scripts/Symptom-Percentages.json";

function getSympInfo(symptom) {
  for (const prop in symptomData) {
    if (symptomData[prop].Symptom.toLowerCase() === symptom) {
      return symptomData[prop];
    }
  }
  var notSymp = { message: "No data regarding the symptom found!" };
  return notSymp;
}

router.post("/", async (req, res) => {
  var symptoms = req.body.symptoms;
  if (!symptoms) {
    return res.status(400).send("No text sent!");
  }
  var nlpScript = spawn("python", [nlpScriptRoute, symptoms, jsonPath]);
  nlpScript.stdout.on("data", function(data) {
    return res.send(data);
    var pythonReturn = data.toString();
    var responseList = [];
    var sympList = pythonReturn.split(";");
    sympList.pop();
    if (
      sympList === undefined ||
      sympList.length == 0 ||
      sympList[0] === "No matches found"
    ) {
      return res.send({
        message: "No Symptoms found"
      });
    }
    var jsonArray = [];
    for (symp in sympList) {
      jsonArray.push(getSympInfo(sympList[symp]));
    }
    return res.send(jsonArray);
  });
  nlpScript.stderr.on("data", data => {
    console.log("error: ", data.toString());
    return res.status(400).send(data.toString());
  });
});

module.exports = router;
