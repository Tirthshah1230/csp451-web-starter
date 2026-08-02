// Lite lint: checks for tabs and trailing whitespace in JS/HTML/CSS/MD.
// This is NOT a replacement for ESLint — it's a simple checkpoint helper.

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..");
const exts = new Set([".js", ".html", ".css", ".md"]);

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

  const text = fs.readFileSync(file, "utf8");
  const lines = text.split(/\r?\n/);

  lines.forEach((line, i) => {
    if (line.includes("\t")) {
      throw new Error(`Tab found: ${file}:${i + 1}`);
    }
    if (/[ \t]+$/.test(line)) {
      throw new Error(`Trailing whitespace: ${file}:${i + 1}`);
    }
  });
}

try {
  walk(ROOT);
  console.log("✅ lint-lite passed");
} catch (err) {
  console.error("❌ lint-lite failed:", err.message);
  process.exit(1);
}
