const express = require("express");
const { authenticate } = require("../services/auth-service");

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body || {};
  const result = authenticate(email, password);

  if (!result.success) {
    return res.status(result.status).json({
      success: false,
      error: result.error,
    });
  }

  return res.status(200).json({
    success: true,
    message: result.message,
    user: result.user,
  });
});

module.exports = { router };