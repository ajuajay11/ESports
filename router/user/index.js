const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/authMiddleware");
const User = require("../../models/userSchema");
const jwt = require("jsonwebtoken");
const Otp = require("../../models/otpSchema.js");

router.get("/", verifyToken, async (req, res) => {
  try {
    const getAllUser = await User.find({}).select("-password");
    if (!getAllUser || getAllUser.length === 0) {
      return res.status(201).json({ message: "No users found" });
    }
    res.status(200).json({ message: "hei iam here ", getAllUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "hei im here" });
  }
});

router.put("/update-profile", verifyToken, async(req, res)=>{
   try {
    const { firstname, lastname, age, phone, username, email, password } = req.body;
    const userId = req.user.id;

    // 2️⃣ Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ message: "Username already taken" });
      }
      user.username = username;
      // 4️⃣ Update other fields (only if provided)
    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (age) user.age = age;
    if (phone) user.phone = phone;
    if (email) user.email = email;

    // 5️⃣ If password is provided, hash before saving
    if (password) {
      const bcrypt = require("bcryptjs");
      user.password = await bcrypt.hash(password, 10);
    }

    // 6️⃣ Save updated user
    await user.save();
    }
   } catch (error) {
    console.error(error);
    res.status(500).json({message:"invalid error"})
   }
});

router.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, age, phone, username, email, password } = req.body;

    // 1️⃣ Check if email is verified
    // const isEmailVerified = await Otp.findOne({ email });

    // if (!isEmailVerified) {
    //   return res.status(401).json({ message: `${email} is not verified` });
    // }

    // 2️⃣ Check for missing fields
    const requiredFields = { firstname, lastname, age, phone, email, password };
    for (const [key, value] of Object.entries(requiredFields)) {
      if (!value) {
        return res.status(400).json({ message: `${key} not provided` });
      }
    }

    // 3️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already registered" });
    }

    // 4️⃣ Generate username if missing
    let finalUsername =
      username ||
      `${firstname.toLowerCase()}${Math.floor(Math.random() * 1000)}${Date.now()
        .toString()
        .slice(-4)}`;

    // Ensure unique username
    let existingUsername = await User.findOne({ username: finalUsername });
    while (existingUsername) {
      finalUsername = `${firstname.toLowerCase()}${Math.floor(
        Math.random() * 1000
      )}${Date.now().toString().slice(-4)}`;
      existingUsername = await User.findOne({ username: finalUsername });
    }

    // 5️⃣ Save new user
    const user = new User({
      firstname,
      lastname,
      age,
      phone,
      username: finalUsername,
      email,
      password, // ⚠️ Hash password before saving
    });

    await user.save();

    // 6️⃣ Respond
    res.status(200).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const fields = { email, password };
  for (const [key, value] of Object.entries(fields)) {
    if (!value) {
      return res.status(401).json({ message: `${key} not provided` });
    }
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // 1 day expiration
    );

    res.status(200).json({
      message: "User login successful",
      token, // send token to frontend
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
      },
    });
    res.status(200).json({ message: "User login successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "invalid error" });
  }
});
module.exports = router;
