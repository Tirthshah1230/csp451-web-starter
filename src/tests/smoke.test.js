// Minimal "smoke test" to ensure Node runs and basic modules load.
// Not a full test framework: this is intentionally lightweight for Week 2.

const assert = require("assert");
const { connect } = require("../db");

(function run() {
  const db = connect();
  assert.strictEqual(typeof db, "object");
  assert.strictEqual(db.connected, true);
  console.log("✅ smoke.test.js passed");
})();
