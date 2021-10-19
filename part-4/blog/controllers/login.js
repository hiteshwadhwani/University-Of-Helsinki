const loginRouter = require("express").Router();
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

loginRouter.post("/", async (req, res) => {
  const body = req.body;
//   console.log(body);
  const user = await User.findOne({ username: body.username });
//   console.log(user);
  const correctPassword =
    user === null ? false : await bcrypt.compare(body.password, user.password);
//   console.log(correctPassword);
  if (!(user && correctPassword)) {
    return res.status(400).json({ errors: "Invalid username or password" });
  }
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);
  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
