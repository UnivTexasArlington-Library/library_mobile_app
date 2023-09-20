import {View, StyleSheet, ScrollView, Image, Dimensions} from "react-native";
import HeaderImage from "../components/HeaderImage";
import Options from "../components/Options";
import {useContext, useEffect} from "react";
import {BlogContext} from "../store/context/blog-context";
import {fetchArticleData} from "../util/http";
import * as Notifications from "expo-notifications";
import {
  configurePushNotifications,
  localNotifications,
} from "../util/notificationTasks";
import {configureFcmInAppMessaging} from "../util/fcmTasks";
import {LatestEventsContext} from "../store/context/latestEvents-context";
import LottieView from "lottie-react-native";
import {GlobalStyles} from "../constants/styles";

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
      latestEventsContext.latestEvents.length > 0 ? (
        <>
          <ScrollView>
            <View style={styles.rootContainer}>
              <HeaderImage />
              <Options navigation={navigation} />
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
