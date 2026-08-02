// Format check: ensures files end with a newline.
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..");
const exts = new Set([".js", ".html", ".css", ".md", ".json"]);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name === "node_modules" || e.name === ".git") continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else check(full);
  }
}

function check(file) {
  const ext = path.extname(file);
  if (!exts.has(ext)) return;
  const buf = fs.readFileSync(file);
  if (buf.length === 0) return;
  if (buf[buf.length - 1] !== 0x0a) {
    throw new Error(`Missing final newline: ${file}`);
  }
}

try {
  walk(ROOT);
  console.log("✅ format-lite passed");
} catch (err) {
  console.error("❌ format-lite failed:", err.message);
  process.exit(1);
}
