const express = require('express');
const router = express.Router();

router.get("/", async (req, res)=>{
    try {
        console.log("hei iam here ")     
        res.status(200).json({message:"hei iam here "})   
    } catch (error) {
        res.status(500).json({message:"hei im here"})
    }
})

module.exports = router; // ✅ must export this
