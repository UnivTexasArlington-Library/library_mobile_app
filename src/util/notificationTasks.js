import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

//Presents the notification to the user
export function scheduleNotificationHandler() {
  Notifications.scheduleNotificationAsync({
    content: {
      title: "Look at that notification",
      body: "I'm so proud of myself!",
      data: {userName: "Max"},
    },
    trigger: {
      seconds: 1,
    },
  });
}

//Registers the push notification token that will be used at a later time to present the push notification to the user.
export async function configurePushNotifications() {
  let token;
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
  if (Device.isDevice) {
    const {status: existingStatus} = await Notifications.getPermissionsAsync();
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

export function localNotifications() {
  //Listeners registered by this method will be called whenever a notification is received while the app is running.
  const subscriptionOne = Notifications.addNotificationReceivedListener(
    (notification) => {
      console.log("NOTIFICATION RECIEVED");
      console.log(notification);
      const username = notification.request.content.data.userName;
      console.log(username);
    }
  );
  //Listeners registered by this method will be called whenever a user interacts with a notification (for example, taps on it).
  const subscriptionTwo = Notifications.addNotificationResponseReceivedListener(
    (response) => {
      console.log("NOTIFICATION Response RECIEVED");
      console.log(response);
      const username = response.notification.request.content.data.userName;
      console.log(username);
    }
  );
  return () => {
    //A Subscription object represents the subscription of the provided listener. The following statements removes the subscription from an internal list
    subscriptionOne.remove();
    subscriptionTwo.remove();
  };
}
