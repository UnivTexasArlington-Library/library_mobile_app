import {View, StyleSheet, useWindowDimensions, ScrollView} from "react-native";
import HeaderImage from "../components/HeaderImage";
import Options from "../components/Options";
import {useContext, useState, useEffect} from "react";
import {BlogContext} from "../store/context/blog-context";
import {fetchBlogData} from "../util/http";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Device from "expo-device";

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
  useEffect(() => {
    async function getBlogData() {
      const blogs = await fetchBlogData();
      blogContext.setInitialBlogs(blogs);
    }
    getBlogData();
  }, []);

  useEffect(() => {
    async function configurePushNotifications() {
      let token;
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
      if (Device.isDevice) {
        const {status: existingStatus} =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const {status} = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
        }
        token = await Notifications.getExpoPushTokenAsync({
          projectId: "6f20fa30-9859-40f9-ae27-a33e8f556ef6",
        });
        console.log("token", token);
        const token2 = await Notifications.getDevicePushTokenAsync();
        console.log(token2);
      } else {
        alert("Must use physical device for Push Notifications");
      }
    }
    configurePushNotifications();
  }, []);

  useEffect(() => {
    const subscriptionOne = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("NOTIFICATION RECIEVED");
        console.log(notification);
        const username = notification.request.content.data.userName;
        console.log(username);
      }
    );
    const subscriptionTwo =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("NOTIFICATION Response RECIEVED");
        console.log(response);
        const username = response.notification.request.content.data.userName;
        console.log(username);
      });
    return () => {
      subscriptionOne.remove();
      subscriptionTwo.remove();
    };
  }, []);

  Notifications.setNotificationHandler({
    handleNotification: async () => {
      return {
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowAlert: true,
      };
    },
  });

  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Look at that notification",
        body: "I'm so proud of myself!",
        data: {userName: "Max"},
      },
      trigger: {
        seconds: 5,
      },
    });
  }

  return (
    <ScrollView>
      <View style={styles.rootContainer}>
        <HeaderImage />
        <Options
          navigation={navigation}
          onScheduleNotificationHandler={scheduleNotificationHandler}
        />
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
