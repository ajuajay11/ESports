const jwt = require('jsonwebtoken');


const verifyToken= (req, res, next)=>{
    try {
        const token = req.header("Authorization")?.split(" ")[1];
        if(!token) return res.status(401).json({message:"token not found"});
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next(); //countinue to next midddleware or route
    } catch (error) {
        console.error(error);
        res.status(500).json({message :"fuck offf"})
    }
}

module.exports = verifyToken;