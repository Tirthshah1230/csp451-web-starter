/**
 * In-memory database module for CSP-451 CheckPoint 2.
 * Configuration is loaded from environment variables.
 */

const config = {
  url: process.env.DB_URL || "memory://local",
  poolSize: Number(process.env.DB_POOL || 4),
  timeoutMs: Number(process.env.DB_TIMEOUT || 5000),
};

const tables = new Map();
let connected = false;

function validateConfig() {
  if (!config.url) {
    throw new Error("DB_URL must not be empty.");
  }

  if (!Number.isInteger(config.poolSize) || config.poolSize < 1) {
    throw new Error("DB_POOL must be a positive integer.");
  }

  if (!Number.isInteger(config.timeoutMs) || config.timeoutMs < 100) {
    throw new Error("DB_TIMEOUT must be at least 100 milliseconds.");
  }
}

function connect() {
  validateConfig();
  connected = true;

  return {
    connected,
    driver: "memory",
    config: { ...config },
  };
}

function disconnect() {
  connected = false;

  return {
    connected,
  };
}

function requireConnection() {
  if (!connected) {
    throw new Error("Database connection has not been established.");
  }
}

function validateTableName(tableName) {
  if (typeof tableName !== "string" || !tableName.trim()) {
    throw new Error("Table name must be a non-empty string.");
  }

  return tableName.trim();
}

function cloneRow(row) {
  return JSON.parse(JSON.stringify(row));
}

function insert(tableName, row) {
  requireConnection();

  const table = validateTableName(tableName);

  if (!row || typeof row !== "object" || Array.isArray(row)) {
    throw new Error("Row must be a valid object.");
  }

  if (!tables.has(table)) {
    tables.set(table, []);
  }

  const storedRow = {
    id: row.id || `${table}-${Date.now()}-${tables.get(table).length + 1}`,
    ...cloneRow(row),
  };

  tables.get(table).push(storedRow);

  return cloneRow(storedRow);
}

function query(tableName, predicate = () => true) {
  requireConnection();

  const table = validateTableName(tableName);

  if (typeof predicate !== "function") {
    throw new Error("Predicate must be a function.");
  }

  const rows = tables.get(table) || [];

  return rows.filter(predicate).map(cloneRow);
}

function findById(tableName, id) {
  requireConnection();

  const table = validateTableName(tableName);
  const rows = tables.get(table) || [];
  const row = rows.find((item) => item.id === id);

  return row ? cloneRow(row) : null;
}

function getConnectionStatus() {
  return {
    connected,
    driver: "memory",
  };
}

module.exports = {
  config,
  connect,
  disconnect,
  insert,
  query,
  findById,
  getConnectionStatus,
};
