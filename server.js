const express = require('express');
const connectToDatabase = require("./lib/connectMongo");
const cors = require('cors');
const app = express();
const port = 3000;
const dotenv =require("dotenv");
dotenv.config();
const UserData = require('./router')


// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
connectToDatabase();

// Sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/user', UserData);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});