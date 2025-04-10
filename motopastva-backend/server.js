const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/motopastva");

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

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();

  res.status(201).json({ message: "Реєстрація успішна" });
});

app.post("/login", async (req, res) => {
  const { emailOrUsername, password } = req.body;

  const user = await User.findOne({
    $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
  });

  if (!user) {
    return res.status(401).json({ message: "Невірні дані" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Невірні дані" });
  }

  res.json({
    username: user.username,
    email: user.email,
  });
});

app.get("/", (req, res) => {
  res.send("Сервер успішно працює ");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
app.get("/register", (req, res) => {
  res.send("Цей маршрут підтримує тільки POST-запити");
});