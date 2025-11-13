const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  joinedAt: { type: Date, default: Date.now },
  isConnected: { type: Boolean, default: true } // for socket tracking only
});

const matchSchema = new mongoose.Schema({
  matchId: { type: String, required: true, unique: true, index: true }, // fast lookup
  password: { type: String, required: true },
  participants: [participantSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true } // optional but good
}); 

const Match = mongoose.model("Match", matchSchema);
module.exports = Match;