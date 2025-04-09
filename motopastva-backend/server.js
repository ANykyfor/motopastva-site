const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

mongoose.connect("mongodb://localhost:27017/motopastva");

const User = mongoose.model("User", {
  username: String,
  email: String,
  password: String,
});

app.use(cors());
app.use(bodyParser.json());

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(409).json({ message: "Користувач уже існує" });
  }

  const newUser = new User({ username, email, password });
  await newUser.save();

  res.status(201).json({ message: "Реєстрація успішна" });
});

app.post("/login", async (req, res) => {
  const { emailOrUsername, password } = req.body;

  const user = await User.findOne({
    $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
  });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Невірні дані" });
  }

  res.json({
    username: user.username,
    email: user.email,
  });
});

app.listen(PORT, () => {
  console.log(` Сервер запущено на http://localhost:${PORT}`);
});
