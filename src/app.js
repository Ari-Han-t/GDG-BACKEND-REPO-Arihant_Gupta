require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const messageRoutes = require("./routes/message.routes");
const userRoutes = require("./routes/user.routes");
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);

module.exports = app;
const errorHandler = require("./middleware/error.middleware");
app.use(errorHandler);
