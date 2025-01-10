const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./models/userModel");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const ws = require("ws");
const cors = require("cors");
const MessageModel = require("./models/MessageModel");

// Middlewares
const app = express();
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: process.env.CLIENT_URL, // Replace with your frontend URL
  credentials: true, // Allow credentials
};

app.use(cors(corsOptions));

app.get("/test", (req, res) => {
  res.json("hello world");
});
app.get("/messages/:from/:to", async (req, res) => {
  const { from, to } = req.params;
  const messages = await MessageModel.find({
    sender: { $in: [from, to] },
    to: { $in: [from, to] },
  }).sort({ createdAt: 1 });
  res.json(messages);
});
app.get("/profile", (req, res) => {
  const token = req.cookies?.token;
  try {
    jwt.verify(token, process.env.JWT_SECRET, function (err, userData) {
      if (err) throw err.message;
      res.json(userData);
    });
  } catch (error) {
    res.status(401).json("Cookie Not Found");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) return res.status(401).json("User not found");
    if (user.password !== password)
      return res.status(401).json("Wrong Password");
    jwt.sign(
      { userId: user._id, username },
      process.env.JWT_SECRET,
      {},
      function (err, token) {
        if (err) throw err.message;
        res
          .cookie("token", token, { sameSite: "none", secure: true })
          .status(201)
          .json("Login Successful");
      }
    );
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await userModel.findOne({ username });
    if (existingUser) return res.status(401).json("User Already Exists");
    createdUser = await userModel.create({ username, password });
    jwt.sign(
      { userId: createdUser._id, username },
      process.env.JWT_SECRET,
      {},
      function (err, token) {
        if (err) throw err.message;
        res
          .cookie("token", token, { sameSite: "none", secure: true })
          .status(201)
          .json({ id: createdUser._id });
      }
    );
  } catch (error) {
    console.log(error.message);
  }
});

// DB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Connect Successfuly");
  })
  .catch((err) => {
    console.log(err.message);
  });

// Websocket
const server = app.listen(process.env.PORT);

const wss = new ws.WebSocketServer({ server });

wss.on("connection", (connection, req) => {
  const cookie = req.headers.cookie;

  const token = cookie.split("=")[1];

  jwt.verify(token, process.env.JWT_SECRET, function (err, userData) {
    const { userId, username } = userData;
    connection.userId = userId;
    connection.username = username;
  });

  [...wss.clients].forEach((client) => {
    client.send(
      JSON.stringify({
        online: [...wss.clients].map((client) => ({
          userId: client.userId,
          username: client.username,
        })),
      })
    );
  });

  connection.on("message", async (message) => {
    const messageData = JSON.parse(message.toString());
    const { to, text } = messageData.message;

    if (to && text) {
      const messageDoc = await MessageModel.create({
        sender: connection.userId,
        to,
        text,
      });
      [...wss.clients]
        .filter((c) => c.userId === to)
        .forEach((client) =>
          client.send(
            JSON.stringify({
              text,
              sender: connection.userId,
              _id: messageDoc._id,
            })
          )
        );
    }
  });
});
