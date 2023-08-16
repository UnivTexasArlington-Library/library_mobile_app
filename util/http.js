import axios from "axios";
const URL = "https://libraries-test.libraries.uta.edu";

export async function fetchBlogData() {
  const response = await axios.get(
    `${URL}/jsonapi/node/blog?fields[node--blog]=title,created,field_body_paragraphs,field_blog_author,field_featured_image,field_blog_teaser_summary&filter[field_blog_author.field_first_name][value]=Library%20News&sort=-created&page[limit]=5&include=field_body_paragraphs,field_blog_author,field_featured_image`,
    {
      headers: {
        "Content-Type": " text/plain",
      },
    }
  );
  const blogData = response.data.data;
  const blogIncludedData = response.data.included;
  const blogPosts = [];
  const blogIncludedParagraphs = [];

  for (const key in blogData) {
    const blogPostObj = {
      keyId: key,
      id: blogData[key].id,
      title: blogData[key].attributes.title,
      created: blogData[key].attributes.created,
      bodyTextIds: blogData[key].relationships.field_body_paragraphs.data,
      bodyText: [],
      blogImageLink:
        blogData[key].relationships.field_featured_image.links.related.href,
      blogTeaser: blogData[key].attributes.field_blog_teaser_summary.value,
    };
    blogPosts.push(blogPostObj);
  }
  for (let i = 0; i < blogPosts.length; i++) {
    const bodyParagraphs = [];
    for (let x = 0; x < blogPosts[i].bodyTextIds.length; x++) {
      bodyParagraphs.push(blogPosts[i].bodyTextIds[x].id);
    }
    blogPosts[i].bodyTextIds = bodyParagraphs;
  }

  for (const key in blogIncludedData) {
    const includedDataObj = {
      keyId: key,
      id: blogIncludedData[key].id,
    };
    if (blogIncludedData[key].type === "paragraph--bp_simple") {
      includedDataObj.paragraphText =
        blogIncludedData[key].attributes.bp_text.value;
    } else if (blogIncludedData[key].type === "paragraph--bp_image") {
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
    blogIncludedParagraphs.push(includedDataObj);
  }

  for (let i = 0; i < blogPosts.length; i++) {
    for (let x = 0; x < blogPosts[i].bodyTextIds.length; x++) {
      const intersection = blogIncludedParagraphs.filter(
        (element) => element.id === blogPosts[i].bodyTextIds[x]
      );
      intersection[0].paragraphText !== undefined &&
        blogPosts[i].bodyText.push(intersection[0].paragraphText);
    }
    blogPosts[i].bodyText = blogPosts[i].bodyText.join("");
  }

  for (let i = 0; i < blogPosts.length; i++) {
    const response = await axios.get(blogPosts[i].blogImageLink);
    const imageData = response.data.data;
    const imageLink =
      imageData.relationships.field_media_image.links.related.href;
    blogPosts[i].blogImageLink = imageLink;
  }

  for (let i = 0; i < blogPosts.length; i++) {
    const response = await axios.get(blogPosts[i].blogImageLink);
    const imageData = response.data.data;
    const imageUrl = imageData.attributes.uri.url;
    blogPosts[i].blogImageLink = URL + imageUrl;
  }
  //   console.log(blogPosts[0].bodyText);
  //   console.log("LINK", blogPosts[0].blogImageLink);
  //   console.log("TEXT", blogPosts[0].bodyText);
  //   console.log("CREATED", blogPosts[0].created);
  //   console.log("ID", blogPosts[0].id);
  //   console.log("TITLE", blogPosts[0].title);
  return blogPosts;
}
