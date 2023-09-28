import {View, StyleSheet, ScrollView, Image, Dimensions} from "react-native";
import HeaderImage from "../components/HeaderImage";
import Options from "../components/Options";
import {useContext, useEffect, useState, useRef} from "react";
import {BlogContext} from "../store/context/blog-context";
import {
  fetchArticleData,
  fetchInstagramReels,
  fetchTodaysLibraryHours,
} from "../util/http";
import * as Notifications from "expo-notifications";
import {
  configurePushNotifications,
  localNotifications,
} from "../util/notificationTasks";
import {configureFcmInAppMessaging} from "../util/fcmTasks";
import {LatestEventsContext} from "../store/context/latestEvents-context";
import LottieView from "lottie-react-native";
import {GlobalStyles} from "../constants/styles";
import {LibCalContext} from "../store/context/libCal-context";
import {Video, ResizeMode} from "expo-av";
import OutlinedButton from "../components/OutlinedButton";
import InstagramReelsSlideshow from "../components/InstagramReelsSlideshow";
import {InstagramContext} from "../store/context/instagram-context";
import SocialMediaLinks from "../components/SocialMediaLinks";

// export async function requestPermissionsAsync() {
//   return await Notifications.requestPermissionsAsync({
//     ios: {
//       allowAlert: true,
//       allowBadge: true,
//       allowSound: true,
//       allowAnnouncements: true,
//     },
//   });
// }

function Home({navigation}) {
  const blogContext = useContext(BlogContext);
  const latestEventsContext = useContext(LatestEventsContext);
  const libCalContext = useContext(LibCalContext);
  const instagramContext = useContext(InstagramContext);

  useEffect(() => {
    async function getArticleData() {
      const blogs = await fetchArticleData("blogs");
      const latestEvents = await fetchArticleData("latestEvents");
      blogContext.setInitialBlogs(blogs);
      latestEventsContext.setInitialLatestEvents(latestEvents);
    }
    getArticleData();
  }, []);

  useEffect(() => {
    async function TodaysLibraryHours() {
      const todaysLibHours = await fetchTodaysLibraryHours();
      libCalContext.setInitialLibHours(todaysLibHours);
    }
    TodaysLibraryHours();
  }, []);

  useEffect(() => {
    async function InstagramReels() {
      const instagramReels = await fetchInstagramReels();
      instagramContext.setInitialInstagramReels(instagramReels);
      // console.log(instagramReels);
    }
    InstagramReels();
  }, []);

  useEffect(() => {
    configurePushNotifications();
  }, []);

  useEffect(() => {
    configureFcmInAppMessaging();
  }, []);

  useEffect(() => {
    localNotifications();
  }, []);
  // Handles the behavior when notifications are received when your app is foregrounded. Sets the handler that will cause the notification to show the alert
  Notifications.setNotificationHandler({
    handleNotification: async () => {
      return {
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowAlert: true,
      };
    },
  });

  return (
    <>
      {blogContext.blogs.length > 0 &&
      latestEventsContext.latestEvents.length > 0 &&
      libCalContext.todaysLibHours.length > 0 &&
      instagramContext.instagramReels.length > 0 ? (
        <>
          <ScrollView>
            <View style={styles.rootContainer}>
              <HeaderImage />
              <Options navigation={navigation} />
              <SocialMediaLinks />
              <InstagramReelsSlideshow />
            </View>
          </ScrollView>
        </>
      ) : (
        <>
          <View style={styles.imageContainer}>
            <Image
              style={styles.backgroundImage}
              source={require("../../assets/uta-splashscreen.png")}
            />
            <LottieView
              source={require("../../assets/loader.json")}
              style={styles.loader}
              autoPlay
            />
          </View>
        </>
      )}
    </>
  );
}

export default Home;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalStyles.colors.primary800,
  },
  backgroundImage: {
    width: deviceWidth,
    height: deviceHeight,
  },
  loader: {
    width: deviceWidth,
    height: 200,
    position: "absolute",
    bottom: 40,
  },
});
