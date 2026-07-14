const db = require("../config/db");

const VALID_STATUSES = ["To Do", "In Progress", "Completed"];

// GET /api/tasks?status=To Do  (status query param is optional)
function getTasks(req, res) {
  const userId = req.user.id;
  const { status } = req.query;

  let query = "SELECT * FROM tasks WHERE user_id = ?";
  const params = [userId];

  if (status) {
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ message: "Invalid status filter." });
    }
    query += " AND status = ?";
    params.push(status);
  }

  query += " ORDER BY created_at DESC";

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ message: "Server error", error: err.message });
    return res.status(200).json(rows);
  });
}

// POST /api/tasks
function createTask(req, res) {
  const userId = req.user.id;
  const { title, description, status } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required." });
  }

  const taskStatus = status && VALID_STATUSES.includes(status) ? status : "To Do";

  db.run(
    "INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)",
    [userId, title, description || "", taskStatus],
    function (err) {
      if (err) return res.status(500).json({ message: "Server error", error: err.message });

      db.get("SELECT * FROM tasks WHERE id = ?", [this.lastID], (err, task) => {
        if (err) return res.status(500).json({ message: "Server error", error: err.message });
        return res.status(201).json(task);
      });
    }
  );
}

// PUT /api/tasks/:id
function updateTask(req, res) {
  const userId = req.user.id;
  const taskId = req.params.id;
  const { title, description, status } = req.body;

  if (status && !VALID_STATUSES.includes(status)) {
    return res.status(400).json({ message: "Invalid status value." });
  }

  // Ensure the task belongs to the logged-in user
  db.get("SELECT * FROM tasks WHERE id = ? AND user_id = ?", [taskId, userId], (err, task) => {
    if (err) return res.status(500).json({ message: "Server error", error: err.message });
    if (!task) return res.status(404).json({ message: "Task not found." });

    const newTitle = title !== undefined ? title : task.title;
    const newDescription = description !== undefined ? description : task.description;
    const newStatus = status !== undefined ? status : task.status;

    db.run(
      "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?",
      [newTitle, newDescription, newStatus, taskId, userId],
      function (err) {
        if (err) return res.status(500).json({ message: "Server error", error: err.message });

        db.get("SELECT * FROM tasks WHERE id = ?", [taskId], (err, updatedTask) => {
          if (err) return res.status(500).json({ message: "Server error", error: err.message });
          return res.status(200).json(updatedTask);
        });
      }
    );
  });
}

// DELETE /api/tasks/:id
function deleteTask(req, res) {
  const userId = req.user.id;
  const taskId = req.params.id;

  db.get("SELECT * FROM tasks WHERE id = ? AND user_id = ?", [taskId, userId], (err, task) => {
    if (err) return res.status(500).json({ message: "Server error", error: err.message });
    if (!task) return res.status(404).json({ message: "Task not found." });

    db.run("DELETE FROM tasks WHERE id = ? AND user_id = ?", [taskId, userId], function (err) {
      if (err) return res.status(500).json({ message: "Server error", error: err.message });
      return res.status(200).json({ message: "Task deleted successfully." });
    });
  });
}

module.exports = { getTasks, createTask, updateTask, deleteTask };
