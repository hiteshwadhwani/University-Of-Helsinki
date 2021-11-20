/* eslint-disable */

import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/toggle";
import BlogForm from "./components/BlogForm";
import Notification from "./components/notification";

const LoginForm = ({
  handleLogin,
  userName,
  password,
  setUserName,
  setPassword,
}) => {
  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            name="username"
            id="username"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <div>
          password
          <input
            type="text"
            name="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </>
  );
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: "",
    likes: "",
  });

  const [Users, setUsers] = useState(null);
  const [notification, setNotification] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      console.log(blogs);
      setBlogs(blogs.sort((a, b) => b.likes - a.likes));
    });
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUsers(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginObj = {
        username: userName,
        password: password,
      };

      const user = await loginService.login(loginObj);
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      setNotification("user successfully logged in");
      setUsers(user);
      setUserName("");
      setPassword("");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (err) {
      setNotification("invalid username or password");
      setTimeout(() => {
        setNotification(null);
      }, 5000);

      console.log("invalid info");
    }
  };

  const handleBlog = async (e) => {
    e.preventDefault();
    try {
      const createBlog = await blogService.create(blog);

      setBlogs(blogs.concat(createBlog));
      setNotification("new blog added");
      setBlog({
        title: "",
        author: "",
        url: "",
        likes: "",
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      blogFormRef.current.toggleVisiblity();
    } catch (err) {
      setNotification("some error happened");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      console.error(err);
    }
  };
  const handleLogout = (e) => {
    setNotification("logging out in 2 second");
    setTimeout(() => {
      setNotification(null);
      window.localStorage.clear();
      window.location.reload();
    }, 2000);
  };
  const updateBlogLike = async (id) => {
    const blog = blogs.find((b) => b.id === id);
    const newBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    };
    console.log(newBlog);
    const updateBlog = await blogService.update(newBlog);
    setBlogs(blogs.map((b) => (b.id !== id ? b : updateBlog)));
    window.location.reload();
  };
  const deletingBlog = async (id) => {
    const blog = await blogs.find((b) => b.id === id);
    if (window.confirm(`do you want to delete blog ${blog.title}`)) {
      await blogService.deleteBlog(id);
      setBlogs(blogs.filter((b) => b.id !== id));
    }
  };

  if (Users === null) {
    return (
      <>
        <h1>{notification}</h1>
        <h2>log in to the application</h2>
        <LoginForm
          handleLogin={handleLogin}
          userName={userName}
          password={password}
          setUserName={setUserName}
          setPassword={setPassword}
        />
      </>
    );
  }
  const handleBlogChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      
      <Notification message={notification} />

      <h2>blogs</h2>
      <p>{Users.name} is logged in </p>
      <button onClick={handleLogout}>Log out</button>
      <Togglable buttonTitle="create new blog" ref={blogFormRef}>
        <BlogForm
          handleBlogChange={handleBlogChange}
          blog={blog}
          handleBlog={handleBlog}
        />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          updateBlogLike={updateBlogLike}
          deletingBlog={deletingBlog}
          blog={blog}
        />
      ))}
    </div>
  );
};

export default App;
