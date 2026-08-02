const express = require("express");

const router = express.Router();

/**
 * Starter endpoint to prove the API works.
 * Feature branch: feature/api-endpoints should expand this structure:
 * - add route modules, controllers, and validation
 * - add at least one POST endpoint
 */
router.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

module.exports = { router };
