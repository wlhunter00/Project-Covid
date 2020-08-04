const express = require("express");
const router = express.Router();
const covidAPI = require("covid19-api");

router.get("/", async (req, res) => {
    try {
        const body = await covidAPI.getTravelHealthNotices();
        return res.send(body[0][0]);
    }
    catch (err) {
        return res.send(err);
    }
});

module.exports = router;