const express = require("express");
const http = require("http");

const connectToDatabase = require("./lib/connectMongo");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const routeData = require("./router");
const server = http.createServer(app);
 
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
connectToDatabase();
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// 👉 Load your socket handlers here
require("./socket")(io);
 
// Sample route
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api", routeData);

const PORT = process.env.PORT || 3000;

// ONLY listen on 'server', NOT 'app'
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});