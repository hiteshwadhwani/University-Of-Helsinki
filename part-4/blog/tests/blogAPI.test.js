const supertest = require("supertest");
const mongoose = require("mongoose");
const testHelper = require("./testhelper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blogschema");
const User = require("../models/userSchema");
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(testHelper.initialBlogs);
  await User.deleteMany({});
});

jest.setTimeout(1000000);

describe("when inital blogs are saved", () => {
  test("all blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("verifying length of blogs", async () => {
    const blogsLength = testHelper.initialBlogs.length;
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(blogsLength);
  });
  test("verifying id variable is present", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });
});

const newUserSignin = async () => {
  const newUser = {
    username: "unknown",
    name: "name",
    password: "password",
  };

  await api.post("/api/users").send(newUser);
  const token = (await api.post("/api/login").send({ ...newUser })).body.token;
  return token;
};

describe("adding a blog", () => {
  test("adding blog to the list", async () => {
    const token = await newUserSignin();
    const newBlog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", "bearer " + token)
      .send(newBlog)

      .expect(200)
      .expect("Content-Type", /application\/json/);
    const res = await testHelper.blogsInDB();
    const title = res.map((r) => r.title);
    // expect(res).toHaveLength(testHelper.initialBlogs.length + 1);
    expect(title).toContain("Type wars");
  });

  test("adding blog with no like", async () => {
    const token = await newUserSignin();
    const newBlog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    };
    await api
      .post("/api/blogs")
      .set("Authorization", "bearer " + token)
      .send(newBlog)

      .expect(200)
      .expect("Content-Type", /application\/json/);
    const res = await testHelper.blogsInDB();
    const blogWithLike0 = await res.find((n) => n.title === "Type wars");
    expect(blogWithLike0.likes).toBe(0);
  });
  test("if the title and author properties are misssing", async () => {
    const token = await newUserSignin();
    const newBlog = {
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    };
    await api
      .post("/api/blogs")
      .set("Authorization", "bearer " + token)
      .send(newBlog)

      .expect(400);
    const res = await testHelper.blogsInDB();
    expect(res).toHaveLength(testHelper.initialBlogs.length);
  });
});
describe("deleting a blog", () => {
  test("deleting a blog and getting status 200", async () => {
    const token = await newUserSignin();
    const newBlog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
    };

    const newBlogCreated = await api
      .post("/api/blogs")
      .set("Authorization", "bearer " + token)
      .send(newBlog)

      .expect(200)
      .expect("Content-Type", /application\/json/);

    const id = newBlogCreated.body.id;
    await api
      .delete(`/api/blogs/${id}`)
      .set("Authorization", "bearer " + token)
      .expect(200);
    const blogAtEnd = await testHelper.blogsInDB();
    expect(blogAtEnd).toHaveLength(testHelper.initialBlogs.length);
    const contents = blogAtEnd.map((i) => i.title);
    expect(contents).not.toContain("Type wars");
  });
});
describe("updating a blog", () => {
  test("updating a blog and getting status 200", async () => {
    const blogAtStart = await testHelper.blogsInDB();

    const blogToUpdate = blogAtStart[0];
    const newBlog = {
      ...blogToUpdate,
      likes: 10,
    };
    console.log(newBlog);
    await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(200);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
