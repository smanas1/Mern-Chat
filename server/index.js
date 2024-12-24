const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Middlewares
const app = express();

app.get("/test", (req, res) => {
  res.json("hello world");
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
