const Blog = require("../models/blogschema");
const User = require("../models/userSchema");


const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
];
const initialUsers = [
  {
    name: "hitesh",
    username: "hitesh1403",
    password: "hello123",
  },
];
const blogsInDB = async () => {
  const blog = await Blog.find({});
  return blog.map((i) => i.toJSON());
};
const usersinDB = async () => {
  const user = await User.find({});
  return user.map(i => i.toJSON());
}

module.exports = { initialBlogs, blogsInDB , initialUsers , usersinDB};
