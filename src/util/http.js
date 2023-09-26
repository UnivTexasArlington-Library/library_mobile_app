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
import * as SecureStore from "expo-secure-store";
import {locationIDs} from "../constants/locationIDs";
import {useContext} from "react";
import {LibCalContext} from "../store/context/libCal-context";

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

export async function fetchTodaysLibraryHours() {
  let locationNameAndHours = [];
  await axios
    .request({
      url: "https://uta.libcal.com/1.1/oauth/token",
      method: "post",
      auth: {
        username: "1339",
        password: "156f3541d8688c50092b4db3a3ef2cdb",
      },
      data: {
        grant_type: "client_credentials",
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then(async (response) => {
      console.log("libCal_access_token", response.data.access_token);
      await SecureStore.setItemAsync(
        "libCal_access_token",
        response.data.access_token
      );
    })
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

  async function getLocationAndHours() {
    for (let i = 0; i < locationIDs.length; i++) {
      await axios
        .get(`https://uta.libcal.com/1.1/hours/${locationIDs[i]}`, {
          headers: {
            Authorization: `Bearer ${await SecureStore.getItemAsync(
              "libCal_access_token"
            )}`,
          },
        })
        .then(async (response) => {
          try {
            const status = await Object.values(response.data[0].dates)[0]
              .status;
            let hours;
            if (status === "24hours") {
              hours = "24 Hours";
            } else if (status === "closed") {
              hours = "Closed";
            } else {
              hours = await Object.values(response.data[0].dates)[0].hours[0];
            }
            const name = await response.data[0].name;
            let locationNameAndHoursItem = {
              name: "",
              hours: null,
            };
            locationNameAndHoursItem.hours = hours;
            locationNameAndHoursItem.name = name;
            locationNameAndHours.push(locationNameAndHoursItem);
          } catch (error) {
            console.log(error);
          }
        });
    }
    console.log("locationNameAndHours", locationNameAndHours);
    return locationNameAndHours;
  }
  return getLocationAndHours();
}

export async function getAllLocationHoursForSpecificDate(day) {
  let locationNameAndHours = [];
  const locations = locationIDs.toString();
  await axios
    .get(
      `https://uta.libcal.com/1.1/hours/${locations}?&from=${day}&to=${day}`,
      {
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync(
            "libCal_access_token"
          )}`,
        },
      }
    )
    .then(async (response) => {
      for (let i = 0; i < response.data.length; i++) {
        try {
          const status = await Object.values(response.data[i].dates)[0].status;
          let hours;
          if (status === "24hours") {
            hours = "24 Hours";
          } else if (status === "closed") {
            hours = "Closed";
          } else {
            hours = await Object.values(response.data[i].dates)[0].hours[0];
          }
          const name = await response.data[i].name;
          let locationNameAndHoursItem = {
            name: "",
            hours: null,
          };
          locationNameAndHoursItem.hours = hours;
          locationNameAndHoursItem.name = name;
          locationNameAndHours.push(locationNameAndHoursItem);
        } catch (error) {
          console.log(error);
        }
      }
    });
  console.log("locationsNameAndHours", locationNameAndHours);
  return locationNameAndHours;
}
