const jwt = require("jsonwebtoken");
const { request, response } = require("express");

const errorHandler = (error, req, res, next) => {
  // console.log(err);
  if (error.name === "CastError") {
    res.status(400).send({ error: "malformated id" });
  }
  if (error.name === "ValidationError") {
    res.status(400).send({ error: error.message });
  }
  
  if(error.name === "JsonWebTokenError"){
    res.status(400).send({ error: "invalid token "});
  }

  next(error);
};

const getToken = (req, res, next) => {
  const auth = req.get("authorization");
  if (auth && auth.toLowerCase().startsWith("bearer")) {
    req["token"] = auth.substring(7);
  }
  next();
};
const userExtractor = (req, res, next) => {
  const auth = req.get("authorization");
  if (auth && auth.toLowerCase().startsWith("bearer")) {
    const token = auth.substring(7);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken) {
      return res.status(401).json({ error: "Invalid token" });
    } else {
      req["userlogged"] = decodedToken;
    }
  }

  next();
};

module.exports = { errorHandler, getToken , userExtractor};
