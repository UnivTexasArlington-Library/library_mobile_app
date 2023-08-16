import axios from "axios";
import {URL, newsAndEventsURL} from "../constants/urls";
import {
  createBodyHtml,
  createInitialPosts,
  extractParagraphandImageIds,
  extractParagraphandImageValues,
  getBlogFeaturedImageUrl,
} from "./blog_newAndEvents_dataFormatter";

export async function fetchBlogData() {
  const response = await axios.get(`${URL}${newsAndEventsURL}`, {
    headers: {
      "Content-Type": " text/plain",
    },
  });
  const blogData = response.data.data;
  const blogIncludedData = response.data.included;
  let blogPosts = [];
  let blogIncludedParagraphsAndImages = [];

  blogPosts = await createInitialPosts(blogData);
  blogPosts = await extractParagraphandImageIds(blogPosts);
  blogIncludedParagraphsAndImages = await extractParagraphandImageValues(
    blogIncludedData
  );
  blogPosts = await createBodyHtml(blogPosts, blogIncludedParagraphsAndImages);
  blogPosts = await getBlogFeaturedImageUrl(blogPosts);
  return blogPosts;
}
