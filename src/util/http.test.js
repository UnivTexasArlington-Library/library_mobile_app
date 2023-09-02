import {fetchBlogData} from "../util/http";

describe("Recieve 5 blog post", () => {
  it("should add two numbers correctly", async () => {
    const blogs = await fetchBlogData();
    expect(blogs.length).toBe(5);
  });
});
