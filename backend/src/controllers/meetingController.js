const Meeting = require("../models/Meeting");
const generateMeetingId = require("../utils/generateMeetingId");

exports.createMeeting = async (req, res) => {
  try {
    const {
      title,
      description,
      startTime,
      endTime
    } = req.body;

    if (!title || !startTime || !endTime) {
      return res.status(400).json({
        message: "Title, start time and end time are required"
      });
    }

    if (new Date(endTime) <= new Date(startTime)) {
      return res.status(400).json({
        message: "End time must be after start time"
      });
    }

    const meetingId = generateMeetingId();

    const meeting = await Meeting.create({
      title,
      description,
      startTime,
      endTime,
      meetingId,
      meetingLink: `/meet/${meetingId}`,
      organizer: req.user.id
    });

    res.status(201).json({
      message: "Meeting created successfully",
      meeting
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


exports.getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({
      organizer: req.user.id
    })
      .populate("organizer", "name email")
      .populate("participants", "name email")
      .sort({ startTime: 1 });

    res.json(meetings);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


exports.getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findOne({
      _id: req.params.id,
      organizer: req.user.id
    })
      .populate("organizer", "name email")
      .populate("participants", "name email");

    if (!meeting) {
      return res.status(404).json({
        message: "Meeting not found"
      });
    }

    res.json(meeting);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


exports.updateMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findOne({
      _id: req.params.id,
      organizer: req.user.id
    });

    if (!meeting) {
      return res.status(404).json({
        message: "Meeting not found"
      });
    }

    const {
      title,
      description,
      startTime,
      endTime,
      status
    } = req.body;

    if (startTime && endTime) {
      if (new Date(endTime) <= new Date(startTime)) {
        return res.status(400).json({
          message: "End time must be after start time"
        });
      }
    }

    meeting.title = title ?? meeting.title;
    meeting.description = description ?? meeting.description;
    meeting.startTime = startTime ?? meeting.startTime;
    meeting.endTime = endTime ?? meeting.endTime;
    meeting.status = status ?? meeting.status;

    await meeting.save();

    res.json({
      message: "Meeting updated successfully",
      meeting
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


exports.deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findOneAndDelete({
      _id: req.params.id,
      organizer: req.user.id
    });

    if (!meeting) {
      return res.status(404).json({
        message: "Meeting not found"
      });
    }

    res.json({
      message: "Meeting deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


exports.joinMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findOne({
      meetingId: req.params.meetingId
    });

    if (!meeting) {
      return res.status(404).json({
        message: "Meeting not found"
      });
    }

    const alreadyJoined = meeting.participants.some(
      participant =>
        participant.toString() === req.user.id
    );

    if (!alreadyJoined) {
      meeting.participants.push(req.user.id);
    }

    const now = new Date();

    if (
      now >= meeting.startTime &&
      now <= meeting.endTime
    ) {
      meeting.status = "live";
    }

    await meeting.save();

    res.json({
      message: "Joined meeting successfully",
      meeting
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


exports.getHistory = async (req, res) => {
  try {
    const meetings = await Meeting.find({
      organizer: req.user.id,
      $or: [
        { status: "completed" },
        { endTime: { $lt: new Date() } }
      ]
    })
      .populate("participants", "name email")
      .sort({ endTime: -1 });

    res.json(meetings);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};