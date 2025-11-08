const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/authMiddleware");
const User = require("../../models/userSchema");
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

router.post("/register", async (req, res) => {
  const { firstname, lastname, age, phone, username, email,password } = req.body;
  const fields = { firstname, lastname, age, phone, username, email, password };
  for (const [key, value] of Object.entries(fields)) {
      if(!value){
        return res.status(401).json({message:`${key} not provided`})
      }
  }
  try {
    const user = new User(fields);
    await user.save()
    res.status(200).json({ message: "User login successfully", user });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "invalid error" });
  }
});


router.post("/login", async (req, res) => {
  const { email,password } = req.body;
  const fields = { email, password };
  for (const [key, value] of Object.entries(fields)) {
      if(!value){
        return res.status(401).json({message:`${key} not provided`})
      }
  }
  try {
     const user = await User.findOne({ email });
if (user && await user.matchPassword(req.body.password)) {
console.log(user);
 
}
      
    res.status(200).json({ message: "User login successfully"  });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "invalid error" });
  }
});
module.exports = router;