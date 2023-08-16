//Main UTA Library URL
export const URL = "https://libraries-test.libraries.uta.edu";
//The following Drupal JSON:API URL is used for gathering data related to news events.
export const newsAndEventsURL =
  "/jsonapi/node/blog?fields[node--blog]=title,created,field_body_paragraphs,field_blog_author,field_featured_image,field_blog_teaser_summary&filter[field_blog_author.field_first_name][value]=Library%20News&sort=-created&page[limit]=5&include=field_body_paragraphs,field_blog_author,field_featured_image";
