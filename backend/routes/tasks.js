const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { getTasks, createTask, updateTask, deleteTask } = require("../controllers/taskController");

// All task routes require a valid JWT token
router.use(authMiddleware);

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
