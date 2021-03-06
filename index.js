require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./handlers/error");

const authRoutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");
const followingRoutes = require("./routes/following");
const followerRoutes = require("./routes/follower");
const userRoutes = require("./routes/user");

const { loginRequired, ensureCorrectUser } = require("./middleware/auth");

const db = require("./models");

const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use(
  "/api/users/:id/messages",
  loginRequired,
  ensureCorrectUser,
  messagesRoutes
);

app.use("/api/users/", loginRequired, userRoutes);
app.use("/api/users/:currentUserId/following", loginRequired, followingRoutes);
app.use("/api/users/:foundUserId/follower", loginRequired, followerRoutes);

app.get("/api/messages", loginRequired, async function(req, res, next) {
  try {
    let messages = await db.Message.find()
      .sort({ createdAt: "desc" })
      .populate("user", { username: true, profileImageUrl: true });
    return res.status(200).json(messages);
  } catch (error) {
    return next(error);
  }
});

//all routes

//error handling when route is not reached
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function() {
  console.log(`Server is starting in PORT ${PORT}`);
});
