const supertest = require("supertest");
const mongoose = require("mongoose");
const testHelper = require("./testhelper");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcryptjs");

const User = require("../models/userSchema");

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("password", 10);
  const user = new User({
    username: "unknown",
    name: "name",
    password: passwordHash,
  });
  await user.save();
});
describe("adding users", () => {
  test("adding users with status 400", async () => {
    const user = {
      name: "lol",
      username: "l",
      password: "l",
    };
    const userAtStart = await testHelper.usersinDB();
    await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    const userAtEnd = await testHelper.usersinDB();
    expect(userAtEnd).toHaveLength(userAtStart.length);
  });
});
afterAll(() => {
  mongoose.connection.close();
});
