const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  createMeeting,
  getMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
  joinMeeting,
  getHistory
} = require("../controllers/meetingController");

const router = express.Router();

router.use(protect);

router.post("/", createMeeting);

router.get("/", getMeetings);

router.get("/history", getHistory);

router.get("/:id", getMeetingById);

router.put("/:id", updateMeeting);

router.delete("/:id", deleteMeeting);

router.post("/join/:meetingId", joinMeeting);

module.exports = router;