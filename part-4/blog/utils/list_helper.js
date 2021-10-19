const _ = require("lodash");
const dummy = (blogs) => {
  return 1;
};
const totalLikes = (blogs) => {
  const reducer = (prev, curr) => prev + curr;
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const maxLikes = (prev, curr) => {
    return prev.likes < curr.likes ? curr : prev;
  };
  const fav = blogs.reduce(maxLikes, blogs[0]);
  return {
    title: fav.title,
    author: fav.author,
    likes: fav.likes,
  };
};
const mostBlog = (blogs) => {
  const blogNumber = _.countBy(blogs, "author");
  const maxValue = Math.max(...Object.values(blogNumber));

  const maxIndex = Object.keys(blogNumber).find(
    (key) => blogNumber[key] === maxValue
  );
  return {
    author: maxIndex,
    blogs: maxValue,
  };
};
const mostLikes = (blogs) => {
  let authorLikes = {};
  blogs.forEach((blog) => {
    if (blog.author in authorLikes) {
      authorLikes[blog.author] += blog.likes;
    } else {
      authorLikes[blog.author] = blog.likes;
    }
  });
  const maxValue = Math.max(...Object.values(authorLikes));
  const maxIndex = Object.keys(authorLikes).find(
    (key) => authorLikes[key] === maxValue
  );
  return {
    author: maxIndex,
    likes: maxValue,
  };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlog , mostLikes };
