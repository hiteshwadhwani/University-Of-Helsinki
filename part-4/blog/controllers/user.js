const userRouter = require("express").Router();
const User = require("../models/userSchema");
var bcrypt = require("bcryptjs");

userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs");
  res.json(users);
});

userRouter.post("/", async (req, res) => {
  const body = await req.body;
  if (body.password.length < 3 || body.username.length < 3) {
    return res.status(400).json({ error: "Invalid user" });
  }

  var salt = bcrypt.genSaltSync(10);
  var hashPassword = bcrypt.hashSync(body.password, salt);

  const user = new User({
    username: body.username,
    name: body.name,
    password: hashPassword,
  });
  const savedUser = await user.save();
  res.json(savedUser);
});

module.exports = userRouter;
