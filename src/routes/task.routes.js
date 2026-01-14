const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");

router.post("/", auth, (req, res) => {
  res.json({ message: "Create task" });
});

router.get("/", auth, (req, res) => {
  res.json({ message: "Get tasks" });
});

router.put("/:id", auth, (req, res) => {
  res.json({ message: "Update task" });
});

router.delete("/:id", auth, (req, res) => {
  res.json({ message: "Delete task" });
});

module.exports = router;
