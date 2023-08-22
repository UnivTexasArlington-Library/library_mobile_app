import {createContext, useState} from "react";

export const BlogContext = createContext({
  blogs: [],
  setInitialBlogs: (blogs) => [],
  addBlogs: (id) => {},
});

function BlogContextProvider({children}) {
  const [blogs, setBlogs] = useState([]);

  function setInitialBlogs(blogsList) {
    setBlogs(blogsList);
  }

  function addBlogs(id) {
    setBlogs((currentBlogs) => [...currentBlogs, id]);
  }

  const value = {
    blogs: blogs,
    setInitialBlogs: setInitialBlogs,
    addBlogs: addBlogs,
  };
  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}

export default BlogContextProvider;
