import axios from "axios";
import {URL} from "../constants/urls";
import {format} from "date-fns";

// Retrieves blog data from the Drupal JSON:API and creates and array of blog post objects constaining the following properties:{keyId,id, title, created, bodyTextIds, bodyText, blogImageLink,blogTeaser}
export async function createInitialPosts(blogData) {
  const posts = [];

  for (const key in blogData) {
    const blogPostObj = {
      keyId: key,
      id: blogData[key].id,
      title: blogData[key].attributes.title,
      created: format(
        new Date(blogData[key].attributes.created),
        "LLLL dd yyyy"
      ),
      paragraphandImageIds:
        blogData[key].relationships.field_body_paragraphs.data,
      bodyHTML: [],
      featuredImageLink:
        blogData[key].relationships.field_featured_image.links.related.href,
      blogTeaser: blogData[key].attributes.field_blog_teaser_summary.value,
      author: blogData[key].relationships.field_blog_author.links.related.href,
    };
    posts.push(blogPostObj);
  }
  return posts;
}
//Extracts the paragraph and image ids from the field_body_paragraphs array and reassigns the paragraphandImageIds property to a new array containing only Ids
export async function extractAuthor(blogPosts) {
  for (let i = 0; i < blogPosts.length; i++) {
    const response = await axios.get(blogPosts[i].author);
    const authorData = response.data.data?.attributes.title;
    blogPosts[i].author = authorData;
  }
  return blogPosts;
}
export async function convertDate(blogPosts) {
  for (let i = 0; i < blogPosts.length; i++) {
    if (blogPosts[i].created === null) {
      blogPosts[i].created = "";
    }
  }
  return blogPosts;
}

// format(
//   new Date(blogData[key].attributes.created),
//   "LLLL dd yyyy"
// )
//Extracts the paragraph and image ids from the field_body_paragraphs array and reassigns the paragraphandImageIds property to a new array containing only Ids
export async function extractParagraphandImageIds(blogPosts) {
  for (let i = 0; i < blogPosts.length; i++) {
    const bodyParagraphs = [];
    for (let x = 0; x < blogPosts[i].paragraphandImageIds.length; x++) {
      bodyParagraphs.push(blogPosts[i].paragraphandImageIds[x].id);
    }
    blogPosts[i].paragraphandImageIds = bodyParagraphs;
  }
  return blogPosts;
}
//The paragraph and image values are extracted from the provided array and then appended to a new array named "blogIncludedParagraphsAndImages," which will be utilized in the future.
export async function extractParagraphandImageValues(blogIncludedData) {
  const blogIncludedParagraphsAndImages = [];

  for (const key in blogIncludedData) {
    const includedDataObj = {
      keyId: key,
      id: blogIncludedData[key].id,
    };
    if (
      blogIncludedData[key].type === "paragraph--bp_simple" &&
      blogIncludedData[key].attributes.bp_text !== null
    ) {
      includedDataObj.paragraphText =
        blogIncludedData[key].attributes.bp_text.value;
    } else if (
      blogIncludedData[key].type === "paragraph--bp_image" &&
      blogIncludedData[key].attributes.field_image_caption !== null
    ) {
      const imageCaption =
        blogIncludedData[key].attributes.field_image_caption.value;
      const response = await axios.get(
        blogIncludedData[key].relationships.field_image.links.related.href
      );
      const imageData = response.data.data;
      const imageLink =
        imageData.relationships.field_media_image.links.related.href;
      const responseTwo = await axios.get(imageLink);
      const imageDataTwo = responseTwo.data.data;
      const imageUrl = imageDataTwo.attributes.uri.url;

      includedDataObj.paragraphText = `<img src="${URL}${imageUrl}"><p>${imageCaption}<p>`;
    }
    blogIncludedParagraphsAndImages.push(includedDataObj);
  }
  return blogIncludedParagraphsAndImages;
}
//Creates the blog post body html by combining the paragraph and text fields through the filter method then combining all fields using join("")
export async function createBodyHtml(
  blogPosts,
  blogIncludedParagraphsAndImages
) {
  for (let i = 0; i < blogPosts.length; i++) {
    for (let x = 0; x < blogPosts[i].paragraphandImageIds.length; x++) {
      const ParagraphOrImageValue = blogIncludedParagraphsAndImages.filter(
        (element) => element.id === blogPosts[i].paragraphandImageIds[x]
      );

      ParagraphOrImageValue[0].paragraphText !== undefined &&
        blogPosts[i].bodyHTML.push(ParagraphOrImageValue[0].paragraphText);
    }
    blogPosts[i].bodyHTML = blogPosts[i].bodyHTML.join("");
  }
  return blogPosts;
}
//Uses the featured image link to retrieve the field_featured_image url.
export async function getBlogFeaturedImageUrl(blogPosts) {
  for (let i = 0; i < blogPosts.length; i++) {
    const response = await axios.get(blogPosts[i].featuredImageLink);
    const imageData = response.data.data;
    const imageLink =
      imageData.relationships.field_media_image.links.related.href;
    blogPosts[i].featuredImageLink = imageLink;
  }
  for (let i = 0; i < blogPosts.length; i++) {
    const response = await axios.get(blogPosts[i].featuredImageLink);
    const imageData = response.data.data;
    const imageUrl = imageData.attributes.uri.url;
    blogPosts[i].featuredImageLink = URL + imageUrl;
  }
  return blogPosts;
}
