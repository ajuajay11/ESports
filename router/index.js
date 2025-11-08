const express = require('express');
const router = express.Router();
const UserRoute = require('./user')
 
router.use("/user", UserRoute);

module.exports = router; 