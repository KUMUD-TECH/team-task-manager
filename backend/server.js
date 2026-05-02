require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./config/db");

const userRoutes = require("./routes/userRoutes");

const authRoutes =
    require("./routes/authRoutes");

const projectRoutes =
    require("./routes/projectRoutes");

const taskRoutes =
    require("./routes/taskRoutes");
    
const authenticateUser =
    require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
//     res.send("Server is running");
// });

/* ROUTES */

app.use("/api", userRoutes);

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api",
    projectRoutes
);

app.use("/api", taskRoutes);

/* PROTECTED PROFILE */

app.get(
    "/api/profile",
    authenticateUser,
    (req, res) => {

        res.json({
            message: "Protected route",
            user: req.user
        });

    }
);

const path = require("path");

const buildPath = path.join(
  __dirname,
  "..",
  "frontend",
  "build"
);

app.use(express.static(buildPath));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(buildPath, "index.html")
  );
});

/* SERVER START */

const PORT =
    process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});