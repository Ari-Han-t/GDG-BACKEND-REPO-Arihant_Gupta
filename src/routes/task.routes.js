const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");

const {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
  } = require("../controllers/task.controller");

router.post("/", auth, createTask);
router.get("/", auth, getTasks);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);
  
module.exports = router;

const allowRoles = require("../middleware/role.middleware");
const { getAllTasksAdmin } = require("../controllers/task.controller");

router.get(
  "/admin/all",
  auth,
  allowRoles(["ADMIN"]),
  getAllTasksAdmin
);
