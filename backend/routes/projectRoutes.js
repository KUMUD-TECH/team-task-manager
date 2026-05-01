const express = require("express");

const router = express.Router();

const projectController =
    require("../controllers/projectController");

const authenticateUser =
    require("../middleware/authMiddleware");

const authorizeRole =
    require("../middleware/roleMiddleware");

router.post(
    "/projects",
    authenticateUser,
    authorizeRole("Admin"),
    projectController.createProject
);

router.get(
    "/projects",
    authenticateUser,
    projectController.getProjects
);

router.post(
    "/projects/:projectId/members",
    authenticateUser,
    authorizeRole("Admin"),
    projectController.addMemberToProject
);

module.exports = router;