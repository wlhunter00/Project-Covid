const express = require("express");
const router = express.Router();
const spawn = require("child_process").spawn;

const nlpScriptRoute = "./../scripts/getconfidence.py";

router.get("/", async (req, res) => {
  var symptoms = req.body.symptoms;
  const nlpScript = spawn("python", [nlpScriptRoute, symptoms]);
  res.send(nlpScript);
});

module.exports = router;
