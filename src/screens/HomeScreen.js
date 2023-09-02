import {View, StyleSheet, useWindowDimensions, ScrollView} from "react-native";
import HeaderImage from "../components/HeaderImage";
import Options from "../components/Options";
import {useContext, useState, useEffect} from "react";
import {BlogContext} from "../store/context/blog-context";
import {fetchArticleData} from "../util/http";
import * as Notifications from "expo-notifications";
import {
  configurePushNotifications,
  localNotifications,
} from "../util/notificationTasks";
import {configureFcmInAppMessaging} from "../util/fcmTasks";
import {LatestEventsContext} from "../store/context/latestEvents-context";

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

function Home({route, navigation}) {
  const {width, height} = useWindowDimensions();
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
    <ScrollView>
      <View style={styles.rootContainer}>
        <HeaderImage />
        <Options navigation={navigation} />
      </View>
    </ScrollView>
  );
}

export default Home;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
