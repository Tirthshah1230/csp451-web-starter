const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "csp451-api",
    time: new Date().toISOString(),
  });
});

module.exports = { router };
