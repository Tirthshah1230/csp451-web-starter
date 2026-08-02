const express = require("express");

const router = express.Router();
const items = [];

function validateItem(payload = {}) {
  const errors = [];
  const name = String(payload.name || "").trim();
  const quantity = Number(payload.quantity);
  const description = String(payload.description || "").trim();

  if (!name) {
    errors.push("Item name is required.");
  } else if (name.length > 80) {
    errors.push("Item name must be 80 characters or fewer.");
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    errors.push("Quantity must be a positive integer.");
  } else if (quantity > 1000) {
    errors.push("Quantity must not exceed 1000.");
  }

  if (description.length > 250) {
    errors.push("Description must be 250 characters or fewer.");
  }

  return {
    valid: errors.length === 0,
    errors,
    value: {
      name,
      quantity,
      description,
    },
  };
}

router.get("/", (req, res) => {
  res.json({
    count: items.length,
    items,
  });
});

router.post("/", (req, res) => {
  const validation = validateItem(req.body);

  if (!validation.valid) {
    return res.status(400).json({
      success: false,
      errors: validation.errors,
    });
  }

  const item = {
    id: items.length + 1,
    ...validation.value,
    createdAt: new Date().toISOString(),
  };

  items.push(item);

  return res.status(201).json({
    success: true,
    item,
  });
});

module.exports = {
  router,
  items,
  validateItem,
};