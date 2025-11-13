const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization token missing or malformed" });
    }

    const token = authHeader.split(" ")[1];
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified; // decoded user info (_id, email, etc.)
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "fuck offf" });
  }
};

module.exports = verifyToken;
