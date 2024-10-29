require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = 8081;
const app = express();
const bcrypt = require("bcryptjs");
const User = require("./models/user");
const Comment = require("./models/comment");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./middleware/authenticateToken");
const { where } = require("sequelize");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("top of create");
    await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      image: "https://randomuser.me/api/portraits/men/80.jpg",
      role: "user",
    });
    console.log("buttom of create");
    res
      .status(201)
      .json({ message: "user registered successfully", status: 201 });
  } catch (error) {
    res.status(500).json({
      message: `Email already exists`,
      error: error.errors[0].message,
      status: 500,
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(process.env.SECRET_KEY);
  const user = await User.findOne({ where: { email } });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    res
      .cookie("TOKEN", token, { maxAge: 60 * 60 * 24 * 5, httpOnly: true })
      .status(201)
      .json({ message: "login success", token: token, status: 201 });
  } else {
    res.status(401).json({ message: "Invalid credentials", status: 401 });
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie;
  res.status(200).json({ message: "logout success", status: 200 });
});

app.post("/comment", authenticateToken, async (req, res) => {
  const { comment } = req.body;
  const userId = req.user.userId;

  console.log(userId);

  try {
    await Comment.create({
      userId: userId,
      comment: comment,
    });
    res.status(201).json({ message: "comment has been create", status: 201 });
  } catch (error) {
    res.status(500).json({ message: "error", error: error, status: 500 });
  }
});

app.get("/comment", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findOne({ where: { id: userId } });
    const comments = await Comment.findAll({ where: { userId: userId } });
    res.status(200).json({
      message: "getting comment",
      comments: comments,
      user: user,
      status: 200,
    });
  } catch (error) {
    res.status(500).json({ message: "error", error: error, status: 500 });
  }
});

app.get("/admin/comment", authenticateToken, async (req, res) => {
  try {
    const role = req.user.role;

    const comments = await Comment.findAll();
    const users = await User.findAll({ where: { role: "user" } });

    if (role === "admin") {
      res.status(200).json({
        message: "getting comment",
        comments: comments,
        users: users,
        status: 200,
      });
    } else {
      res.status(401).json({ message: "Unauthorized", status: 401 });
    }
  } catch (error) {
    res.status(500).json({ message: "error", error: error, status: 500 });
  }
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
