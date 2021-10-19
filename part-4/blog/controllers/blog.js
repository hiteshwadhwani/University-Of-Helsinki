const blogRouter = require("express").Router();
const Blog = require("../models/blogschema");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;
  if (!body.likes) {
    body.likes = 0;
  }
  if (!body.title || !body.author) {
    return response.status(400).end();
  }
  // const token = request.token;

  // const decodedToken = await jwt.verify(token, process.env.SECRET);
  const decodedToken = await request.userlogged;
  // console.log(decodedToken.id);
  const user = await User.findById(decodedToken.id);
  // console.log(user);
  // console.log(user._id.toString());
  // console.log(user);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });
  try {
    const savedBlog = await blog.save();
    // console.log(savedBlog);
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.json(savedBlog);
  } catch (e) {
    console.log(e);
  }
});
blogRouter.delete("/:id", async (req, res, next) => {
  const id = await req.params.id;
  // const token = req.token;

  // const decodedToken = await jwt.verify(token, process.env.SECRET);
  const decodedToken = await req.userlogged;
  const user = await User.findById(decodedToken.id);

  const blog = await Blog.findById(id);
  if (blog.user._id.toString() === user._id.toString()) {
    try {
      await Blog.findByIdAndDelete(id);
      res.status(200).end();
    } catch (err) {
      next(err);
    }
  } else {
    res.status(401).json({ error: "invalid user" });
  }
});
blogRouter.put("/:id", async (req, res) => {
  const id = await req.params.id;
  const newBlog = await req.body;
  await Blog.findByIdAndUpdate(id, newBlog);
  res.status(200).json(newBlog);
});

module.exports = blogRouter;
