const express = require("express");

const router = express.Router();

const taskController =
    require("../controllers/taskController");

const authenticateUser =
    require("../middleware/authMiddleware");

const authorizeRole =
    require("../middleware/roleMiddleware");

/* CREATE TASK */

router.post(
    "/tasks",
    authenticateUser,
    authorizeRole("Admin"),
    taskController.createTask
);

router.put(
    "/tasks/:taskId/status",
    authenticateUser,
    taskController.updateTaskStatus
);

router.get(
    "/dashboard",
    authenticateUser,
    taskController.getDashboardStats
);

router.get(
    "/projects/:projectId/tasks",
    authenticateUser,
    taskController.getTasksByProject
);

module.exports = router;