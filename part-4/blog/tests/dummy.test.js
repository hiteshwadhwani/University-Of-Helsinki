const listHelper = require("../utils/list_helper");

test("dummy return 1", () => {
  const blogs = [];
  expect(listHelper.dummy(blogs)).toBe(1);
});
