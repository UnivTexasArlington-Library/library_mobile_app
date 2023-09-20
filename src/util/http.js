import axios from "axios";
import {URL, latestEventsURL, URL_TEST, blogURL} from "../constants/urls";
import {
  convertDate,
  createBodyHtml,
  createInitialPosts,
  extractAuthor,
  extractParagraphandImageIds,
  extractParagraphandImageValues,
  getBlogFeaturedImageUrl,
} from "./blog_latestEvents_dataFormatter";

export async function fetchArticleData(articleType, newURL) {
  let blogOrLatestEventsUrl;
  articleType === "blogs" && (blogOrLatestEventsUrl = blogURL);
  articleType === "latestEvents" && (blogOrLatestEventsUrl = latestEventsURL);
  const response = await axios
    .get(
      `${
        articleType === "newArticles"
          ? newURL
          : `${URL}${blogOrLatestEventsUrl}`
      }`,
      {
        headers: {
          "Content-Type": " text/plain",
        },
      }
    )
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  const blogData = response.data.data;
  const blogIncludedData = response.data.included;
  let blogPosts = [];
  let blogIncludedParagraphsAndImages = [];

  blogPosts = await createInitialPosts(blogData);
  blogPosts = await extractAuthor(blogPosts);
  blogPosts = await convertDate(blogPosts);
  blogPosts = await extractParagraphandImageIds(blogPosts);
  blogIncludedParagraphsAndImages = await extractParagraphandImageValues(
    blogIncludedData
  );
  blogPosts = await createBodyHtml(blogPosts, blogIncludedParagraphsAndImages);
  blogPosts = await getBlogFeaturedImageUrl(blogPosts);
  if (response.data.links.next !== undefined) {
    blogPosts.next = response.data.links.next.href;
  }
  if (response.data.links.prev !== undefined) {
    blogPosts.prev = response.data.links.prev.href;
  }
  if (response.data.links.first !== undefined) {
    blogPosts.first = response.data.links.first.href;
  }
  console.log(blogPosts.length);
  return blogPosts;
}
