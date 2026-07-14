const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./config/db"); // initializes DB + creates tables

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Task Management API is running 🚀" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

// Global error handler (catches unexpected errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on the server." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
