import React, { useState } from "react";
const Blog = ({ blog , updateBlogLike , deletingBlog}) => {
  const [visible , setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  const toggelVisible = () => {
    setVisible(!visible);
  }
  
  return (
    <div className="blog-list">
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggelVisible}>view</button>
      </div>
      <div style={showWhenVisible} className="togglableDiv">
      <p>{blog.title}</p>
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      <button id="like-button" onClick={() => updateBlogLike(blog.id)}>like</button>
      <div className="blog-likes">{blog.likes}</div>
      <button onClick={() => deletingBlog(blog.id)}>delete</button>
      <button onClick={toggelVisible}>hide</button>
      </div>
    </div>
  );
};

export default Blog;
