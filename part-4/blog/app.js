const { mongoUrl, PORT } = require("./utils/config");

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blog");
const userRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");
const testingRouter = require("./controllers/blogTest");
const { errorHandler, getToken, userExtractor } = require("./utils/middelware");

//mongoose connection

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((connection) => {
    console.log("connection established to DB");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(cors());
app.use(express.json());
app.use(getToken);
app.use(userExtractor);

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
if(process.env.NODE_ENV === 'test'){
  app.use("/api/testing",testingRouter);
}
app.use(errorHandler);

module.exports = app;
