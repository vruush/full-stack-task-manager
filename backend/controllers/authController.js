const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
require("dotenv").config();

// POST /api/auth/register
function register(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters." });
  }

  // Check if user already exists
  db.get("SELECT id FROM users WHERE username = ?", [username], (err, row) => {
    if (err) return res.status(500).json({ message: "Server error", error: err.message });
    if (row) return res.status(409).json({ message: "Username already exists." });

    const hashedPassword = bcrypt.hashSync(password, 10);

    db.run(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword],
      function (err) {
        if (err) return res.status(500).json({ message: "Server error", error: err.message });

        return res.status(201).json({
          message: "User registered successfully.",
          user: { id: this.lastID, username },
        });
      }
    );
  });
}

// POST /api/auth/login
function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err) return res.status(500).json({ message: "Server error", error: err.message });
    if (!user) return res.status(401).json({ message: "Invalid credentials." });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    return res.status(200).json({
      message: "Login successful.",
      token,
      user: { id: user.id, username: user.username },
    });
  });
}

module.exports = { register, login };
