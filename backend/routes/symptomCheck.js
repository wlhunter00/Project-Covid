const express = require("express");
const router = express.Router();
const spawn = require("child_process").spawn;
const nlpScriptRoute =
  __dirname.slice(0, __dirname.lastIndexOf("\\")) + "/scripts/testScript.py";

router.post("/", async (req, res) => {
  var symptoms = req.body.symptoms;
  var nlpScript = spawn("python", [nlpScriptRoute, symptoms]);
  nlpScript.stdout.on("data", function(data) {
    console.log(data.toString());
    res.send(data.toString());
  });
  nlpScript.stderr.on("data", data => {
    console.log("error: ", data.toString());
    res.status(400).send(data.toString());
  });
});

module.exports = router;
