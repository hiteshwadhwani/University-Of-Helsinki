import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

describe("testing blog component", () => {
  // let component;
  // beforeEach(() => {
  //     const blog = {
  //         title: "React patterns",
  //         author: "Michael Chan",
  //         url: "https://reactpatterns.com/",
  //         likes: 9
  //       };

  //     const component = render(
  //         <Blog blog={blog} />
  //       )
  // })
  test("blog component displaying author and title by default", () => {
    const blog = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 9,
    };
    const component = render(<Blog blog={blog} />);

    expect(component.container.querySelector(".togglableDiv")).toHaveStyle(
      "display: none"
    );
  });

  test("after clicking show button likes and url are shown", () => {
    const blog = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 9,
    };
    const component = render(<Blog blog={blog} />);
    const button = component.getByText("view");
    fireEvent.click(button);

    expect(component.container.querySelector(".togglableDiv")).not.toHaveStyle(
      "display: none"
    );
  });
  test("clicking like button" , () => {
    const blog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 9,
      };
      const mockHandler = jest.fn();
      const component = render(<Blog blog={blog} updateBlogLike={mockHandler}/>);
      const viewButton = component.getByText("view");
      fireEvent.click(viewButton);

      const likeButton = component.getByText("like");
      fireEvent.click(likeButton);
      fireEvent.click(likeButton);

      expect(mockHandler.mock.calls).toHaveLength(2);


  });
  test("to check form calls the event handler it received as props with the right details when a new blog is created" , () => {
    const blog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 9,
      };
      const handleBlog = jest.fn();
      
      const component = render(<BlogForm handleBlog={handleBlog}/>);
      const form = component.container.querySelector('form');
      const titleInput = component.container.querySelector("#title");
      fireEvent.change(titleInput , { 
        target: { value: "React patterns" } 
      })
      fireEvent.submit(form);
      
      expect(handleBlog.mock.calls).toHaveLength(1);
     
      expect(handleBlog.mock.calls[0][0].content).toBe("React patterns");
  })
});
