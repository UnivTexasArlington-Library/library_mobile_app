import axios from "axios";
import * as SecureStore from "expo-secure-store";
import {locationIDs} from "../constants/locationIDs";
import {
  URL,
  blogURL,
  instagramAccessToken,
  instagramID,
  latestEventsURL,
} from "../constants/urls";
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
export async function retrieveBookings(categoryId, date, spaceId) {
  let bookings = [];
  await axios
    .get(
      `https://uta.libcal.com/1.1/space/bookings?cid=${categoryId}&date=${date}`,
      {
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync(
            "libCal_access_token"
          )}`,
        },
      }
    )
    .then(async (response) => {
      // console.log(
      //   "bookings",
      //   response.data.length
      //   // response.data[0].fromDate,
      //   // response.data[0].toDate
      // );
      for (let i = 0; i < response.data.length; i++) {
        // console.log(response.data[i].eid);
        if (response.data[i].eid == spaceId) {
          console.log(
            `values ${response.data[i].eid} and ${spaceId} are equal`
          );
          let bookingsObj = {};
          // console.log("bookings", response.data[i].fromDate);
          bookingsObj.from = response.data[i].fromDate;
          bookingsObj.to = response.data[i].toDate;
          bookings.push(bookingsObj);
        } else {
          console.log("values are not equal");
        }
        // console.log("eid", response.data[i].eid);
      }
    });
  // console.log("bookings array", bookings);
  return bookings;
}

export async function retrieveAvailabilty(
  locationId,
  categoryId,
  spaceId,
  date
) {
  let availabilityHours = [];
  await axios
    .get(
      `https://uta.libcal.com/1.1/space/items/${locationId}?&categoryId=${categoryId}&availability=${date}`,
      {
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync(
            "libCal_access_token"
          )}`,
        },
      }
    )
    .then(async (response) => {
      // console.log("availabilty", response.data[0]);

      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].id == spaceId) {
          console.log("availabilty", response.data[i].availability);
          console.log(
            `availabilty values ${response.data[i].id} and ${spaceId} are equal`
          );
          for (let j = 0; j < response.data[i].availability.length; j++) {
            let availabilityObj = {};
            availabilityObj.from = response.data[i].availability[j].from;
            availabilityObj.to = response.data[i].availability[j].to;
            availabilityHours.push(availabilityObj);
          }

          // console.log("bookings", response.data[i].fromDate);

          // availabilityHours = response.data[0].availability;
        }
      }
    });
  // console.log("locationsNameAndHours", locationNameAndHours);
  return availabilityHours;
}

export async function fetchInstagramReels() {
  let instagramReels = [];
  await axios
    .get(
      `https://graph.instagram.com/${instagramID}/media?access_token=${instagramAccessToken}&fields=media_url,permalink`,
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
    })
    .then(async (response) => {
      const filteredArray = response.data.data.filter((post) =>
        post.permalink.includes("reel")
      );
      for (let i = 0; i < filteredArray.length; i++) {
        instagramReels.push(filteredArray[i]);
      }
      // console.log(response.data.paging.next);
      await axios
        .get(`${response.data.paging.next}`, {
          headers: {
            "Content-Type": " text/plain",
          },
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
        })
        .then(async (responseTwo) => {
          const filteredArrayTwo = responseTwo.data.data.filter((post) =>
            post.permalink.includes("reel")
          );
          for (let i = 0; i < filteredArrayTwo.length; i++) {
            instagramReels.push(filteredArrayTwo[i]);
          }
          // console.log("responseTwo", responseTwo.data.data);
        });
      // console.log("instagram reels", instagramReels.slice(0, 15).length);
    });
  return instagramReels.slice(0, 15);
}

export async function postBooking(
  startTime,
  finishTime,
  item,
  firstName,
  lastName,
  email
) {
  let responseText = "";
  await axios
    .post(
      `https://uta.libcal.com/1.1/space/reserve`,
      {
        start: startTime,
        fname: firstName,
        lname: lastName,
        email: email,
        bookings: [
          {
            id: item,
            to: finishTime,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync(
            "libCal_access_token"
          )}`,
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
        return (responseText = error.response.data.toString());
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        return (responseText = error.request.toString());
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        return (responseText = error.message.toString());
      }
    })
    .then(async (response) => {
      console.log(response);
      if (response.status === 200) {
        return (responseText = "success");
      }
    });
  return responseText;
}
