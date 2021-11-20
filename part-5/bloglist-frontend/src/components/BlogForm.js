import React from "react";

const BlogForm = ({blog ,  handleBlog , handleBlogChange}) => {
  // const [blog, setBlog] = useState({
  //   title: "",
  //   author: "",
  //   url: "",
  //   likes: "",
  // });
  // const handleBlogChange = (e) => {
  //   const { name, value } = e.target;
  //   setBlog((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };
  return (
    <>
      <form onSubmit={handleBlog}>
        <div>
          title :
          <input
            id="title"
            type="text"
            value={blog.title}
            name="title"
            onChange={handleBlogChange}
          />
        </div>
        <div>
          author :
          <input
            id="author"
            type="text"
            value={blog.author}
            name="author"
            onChange={handleBlogChange}
          />
        </div>

        <div>
          url :
          <input
            id="url"
            type="text"
            value={blog.url}
            name="url"
            onChange={handleBlogChange}
          />
        </div>
        <div>
          likes :
          <input
            id="likes"
            type="text"
            value={blog.likes}
            name="likes"
            onChange={handleBlogChange}
          />
        </div>
        <button id="submit-button" type="submit">send</button>
      </form>
    </>
  );
};

export default BlogForm;
