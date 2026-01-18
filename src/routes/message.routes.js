const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");

const {
  sendMessage,
  getConversation,
  editMessage,
  deleteMessage,
} = require("../controllers/message.controller");

router.post("/", auth, sendMessage);
router.get("/:userId", auth, getConversation);
router.put("/:id", auth, editMessage);
router.delete("/:id", auth, deleteMessage);

module.exports = router;
