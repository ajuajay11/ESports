const express = require("express");
const router = express.Router();
const Match = require("../../models/matchSchema");
const User = require("../../models/userSchema");
const { Resend } = require("resend");
const verifyToken = require("../../middleware/authMiddleware");
const verifySubscribed = require("../../middleware/verifySubscribed");
const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/create-match", verifyToken,verifySubscribed, async (req, res) => {
  try {
    
    const { matchId, password } = req.body;
    // Validation
    if (!matchId || !password) {
      return res.status(400).json({ message: "matchId and password required" });
    }

    // Check if match already exists
    const existing = await Match.findOne({ matchId });
    if (existing) {
      return res.status(409).json({ message: "Match ID already exists" });
    }

    // Create match
    const newMatch = new Match({
      matchId,
      password,
      participants: [], // empty at start
      createdBy: req.user._id, // ✔ save admin who created match
    });

    await newMatch.save();

    res.status(201).json({
      message: "Match created successfully",
      match: newMatch,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error creating match" });
  }
});
router.get("/", verifyToken, async (req, res) => {
  try {
    const {role } = req.query
    const userId = req.user._id;
 
    // Return matches created by the authenticated user (admin)
    if (role === "admin") {
      const matches = await Match.find({ createdBy: userId }).select("-password").sort({ _id: -1 });
      return res.status(200).json({ matches });
    }

    // Return matches where the authenticated user is a participant
    if (role === "participant" || role === "player" || role === "user") {
      const matches = await Match.find({ "participants.userId": userId }).select("-password username");
      return res.status(200).json({ matches });
    }

    // Return recent/open matches (public listing)
    if (role === "all" || role === "") {
      const matches = await Match.find({}).select("-password").sort({ _id: -1 }).limit(50);
      return res.status(200).json({ matches });
    }

    return res.status(400).json({ message: "Invalid role parameter" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error creating match" });
  }
});
router.get("/participants", verifyToken, async (req, res) => {
  try {
    const { matchId } = req.query;

    if (!matchId) {
      return res.status(400).json({ message: "matchId is required" });
    }

    const match = await Match.findOne({ matchId });

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    return res.status(200).json({
      participants: match.participants
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching participants" });
  }
});

router.post("/join-match", verifyToken, async (req, res) => {
  try {
    const { matchId, password } = req.body;
    console.log(req.user);

    const userId = req.user._id;
    const username = req.user.email;

    const match = await Match.findOne({ matchId });
    if (!match) {
      return res.status(401).json({
        message: `This match ID (${matchId}) is not available at the moment.`,
      });
    }
    if (match.password !== password) {
      return res.status(400).json({ message: "Incorrect password." });
    }
    const alreadyJoined = await Match.findOne({
      matchId,
      "participants.userId": userId,
    });
    if (alreadyJoined) {
      return res
        .status(409)
        .json({ message: `${username} already joined in this match` });
    }
    console.log(userId, match.createdBy, "match.createdBymatch.createdBy");

    if (match.createdBy && match.createdBy.toString() === userId) {
      return res.status(409).json({
        message: `Created Admin can't join this match`,
      });
    }
    match.participants.push({
      userId,
      username,
      joinedAt: new Date(),
      isConnected: true,
    });
    await match.save();
    res
      .status(200)
      .json({ message: `user joined successfully on this ${matchId}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error creating match" });
  }
});

module.exports = router;
