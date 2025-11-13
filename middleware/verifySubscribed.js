const User = require("../models/userSchema");

module.exports = async function verifySubscribed(req, res, next) {
  try {
    const userId = req.user._id;

    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check subscription
    if (!user.isSubscribed || !user.isSubscribed.isActive) {
      return res.status(403).json({
        message: "You must be subscribed to create a match.",
      });
    }

    next(); // user is subscribed, continue
  } catch (error) {
    console.error("verifySubscribed Error:", error);
    res.status(500).json({
      message: "Server error checking subscription",
    });
  }
};
