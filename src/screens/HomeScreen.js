import * as Notifications from "expo-notifications";
import LottieView from "lottie-react-native";
import {useContext, useEffect} from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import HeaderImage from "../components/HeaderImage";
import InstagramReelsSlideshow from "../components/InstagramReelsSlideshow";
import Options from "../components/Options";
import Resources from "../components/Resources";
import SocialMediaLinks from "../components/SocialMediaLinks";
import {GlobalStyles} from "../constants/styles";
import {BlogContext} from "../store/context/blog-context";
import {InstagramContext} from "../store/context/instagram-context";
import {LatestEventsContext} from "../store/context/latestEvents-context";
import {LibCalContext} from "../store/context/libCal-context";
import {configureFcmInAppMessaging} from "../util/fcmTasks";
import {
  fetchArticleData,
  fetchInstagramReels,
  fetchTodaysLibraryHours,
} from "../util/http";
import {
  configurePushNotifications,
  localNotifications,
} from "../util/notificationTasks";

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
  //stores blogs in Context
  const blogContext = useContext(BlogContext);
  //stores news articles in Context
  const latestEventsContext = useContext(LatestEventsContext);
  //stores library hours in Context
  const libCalContext = useContext(LibCalContext);
  //stores instagram reels in Context
  const instagramContext = useContext(InstagramContext);

  useEffect(() => {
    //fetching blogs and news articles from Drupal Headless CMS
    async function getArticleData() {
      const blogs = await fetchArticleData("blogs");
      const latestEvents = await fetchArticleData("latestEvents");
      blogContext.setInitialBlogs(blogs);
      latestEventsContext.setInitialLatestEvents(latestEvents);
    }
    getArticleData();
  }, []);

  useEffect(() => {
    //fetching library hours from libcal api
    async function TodaysLibraryHours() {
      const todaysLibHours = await fetchTodaysLibraryHours();
      libCalContext.setInitialLibHours(todaysLibHours);
    }
    TodaysLibraryHours();
  }, []);

  useEffect(() => {
    //fetching Instagram reels from Instagram Graph API
    async function InstagramReels() {
      const instagramReels = await fetchInstagramReels();
      instagramContext.setInitialInstagramReels(instagramReels);
      // console.log(instagramReels);
    }
    InstagramReels();
  }, []);

  useEffect(() => {
    //Initialize expo push notifications needed for standalone android application
    configurePushNotifications();
  }, []);

  useEffect(() => {
    //Initialize Firebase In-App Messaging
    configureFcmInAppMessaging();
  }, []);

  useEffect(() => {
    //Initialize local notifications (prompts notification when user performs action,
    //such as clicking a notification button)
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
    //Once blogs, news articles, library hours, and instagram reels are loaded display the home screen
    //otherwise display the loading bar
    <>
      {blogContext.blogs.length > 0 &&
      latestEventsContext.latestEvents.length > 0 &&
      libCalContext.todaysLibHours.length > 0 &&
      instagramContext.instagramReels.length > 0 ? (
        <>
          <ScrollView>
            <View style={styles.rootContainer}>
              <HeaderImage />
              <Text style={styles.sectionText}>Popular Categories</Text>
              <Options navigation={navigation} />
              <SocialMediaLinks />
              <InstagramReelsSlideshow />
              <Resources navigation={navigation} />
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
  sectionText: {
    textAlign: "left",
    color: GlobalStyles.colors.primary500,
    fontSize: 24,
    fontFamily: "open-sans-bold",
    width: deviceWidth,
    padding: 10,
  },
});
