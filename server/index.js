const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./models/userModel");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");

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

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
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
