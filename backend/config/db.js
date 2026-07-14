const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// SQLite database file will be created automatically in backend/ folder
const dbPath = path.join(__dirname, "..", "database.sqlite");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Failed to connect to database:", err.message);
  } else {
    console.log("✅ Connected to SQLite database");
  }
});

// Create tables if they don't already exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT CHECK(status IN ('To Do', 'In Progress', 'Completed')) DEFAULT 'To Do',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
});

module.exports = db;
