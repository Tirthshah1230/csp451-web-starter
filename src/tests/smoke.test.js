// Minimal "smoke test" to ensure Node runs and basic modules load.
// Not a full test framework: this is intentionally lightweight for Week 2.

const assert = require("assert");

const {
  connect,
  disconnect,
  insert,
  query,
  findById,
  getConnectionStatus,
} = require("../db");

const {
  authenticate,
  normalizeEmail,
  validateCredentials,
} = require("../services/auth-service");

const { validateItem } = require("../routes/api/items");

(function run() {
  const db = connect();

  assert.strictEqual(typeof db, "object");
  assert.strictEqual(db.connected, true);

  const insertedUser = insert("users", {
    name: "Database Student",
    role: "student",
  });

  assert.ok(insertedUser.id);
  assert.strictEqual(insertedUser.name, "Database Student");

  const users = query("users");
  assert.strictEqual(users.length, 1);

  const foundUser = findById("users", insertedUser.id);
  assert.strictEqual(foundUser.role, "student");

  const normalizedEmail = normalizeEmail("  STUDENT@example.com ");
  assert.strictEqual(normalizedEmail, "student@example.com");

  const missingCredentials = validateCredentials("", "");
  assert.strictEqual(missingCredentials.valid, false);
  assert.ok(missingCredentials.errors.length >= 1);

  const invalidLogin = authenticate(
    "wrong@example.com",
    "WrongPassword"
  );

  assert.strictEqual(invalidLogin.success, false);
  assert.strictEqual(invalidLogin.status, 401);

  const validLogin = authenticate(
    "student@example.com",
    "Password123"
  );

  assert.strictEqual(validLogin.success, true);
  assert.strictEqual(validLogin.status, 200);
  assert.strictEqual(
    validLogin.user.email,
    "student@example.com"
  );

  const invalidItem = validateItem({
    name: "",
    quantity: 0,
  });

  assert.strictEqual(invalidItem.valid, false);
  assert.ok(invalidItem.errors.length >= 1);

  const validItem = validateItem({
    name: "Network Adapter",
    quantity: 2,
    description: "USB network adapter",
  });

  assert.strictEqual(validItem.valid, true);
  assert.strictEqual(
    validItem.value.name,
    "Network Adapter"
  );
  assert.strictEqual(validItem.value.quantity, 2);

  disconnect();
  assert.strictEqual(
    getConnectionStatus().connected,
    false
  );

  console.log("✅ smoke.test.js passed");
})();
