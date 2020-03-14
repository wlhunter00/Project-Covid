const express = require("express");
const router = express.Router();

const nlpScriptRoute = "./../scripts/getconfidence.py";

router.get("/", async (req, res) => {
  res.send(data);
});

module.exports = router;
