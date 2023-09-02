import {Text, View, StyleSheet, Pressable} from "react-native";
import {
  FontAwesome5,
  MaterialIcons,
  AntDesign,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import {GlobalStyles} from "../constants/styles";
import React from "react";
import {scheduleNotificationHandler} from "../util/notificationTasks";

const Options = ({navigation}) => {
  function openDrawerHandler(selectionOption) {
    navigation.navigate(selectionOption);
  }

  return (
    <View style={styles.gridContainer}>
      {/* <View style={styles.gridItem}>
        <FontAwesome5
          name="blog"
          size={70}
          color={GlobalStyles.colors.primary800}
          testID="blog-icon"
        />
        <Text style={styles.itemText} testID="blog-text">
          Blog
        </Text>
      </View> */}
      <Pressable
        android_ripple={{color: "#ccc"}}
        style={({pressed}) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
          ,
          styles.gridItem,
        ]}
        onPress={() => openDrawerHandler("BlogAndLatestEvents")}
        testID="event-pressable"
      >
        <Entypo
          name="news"
          size={70}
          color={GlobalStyles.colors.primary50}
          testID="event-icon"
        />
        <Text style={styles.itemText} testID="events-text">
          News and Events
        </Text>
      </Pressable>
      {/* <View style={styles.gridItem}>
        <AntDesign
          name="clockcircleo"
          size={70}
          color={GlobalStyles.colors.primary800}
          testID="hours-icon"
        />
        <Text style={styles.itemText} testID="hours-text">
          Hours
        </Text>
      </View>
      <View style={styles.gridItem}>
        <FontAwesome5
          name="map-marked-alt"
          size={70}
          color={GlobalStyles.colors.primary800}
          testID="locations-icon"
        />
        <Text style={styles.itemText} testID="locations-text">
          Department Locations
        </Text>
      </View>
      <View style={styles.gridItem}>
        <MaterialIcons
          name="person-search"
          size={70}
          color={GlobalStyles.colors.primary800}
          testID="directory-icon"
        />
        <Text style={styles.itemText} testID="directory-text">
          Directory
        </Text>
      </View>
      <View style={styles.gridItem}>
        <Pressable
          android_ripple={{color: "#ccc"}}
          style={({pressed}) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={scheduleNotificationHandler}
          testID="event-pressable"
        >
          <Ionicons
            name="notifications-outline"
            size={70}
            color={GlobalStyles.colors.primary800}
            testID="notifications-icon"
          />
        </Pressable>
        <Text style={styles.itemText} testID="notifications-text">
          Notifications
        </Text>
      </View> */}
    </View>
  );
};

export default React.memo(Options);

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    rowGap: 40,
  },
  gridItem: {
    width: "33%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: GlobalStyles.colors.primary800,
    margin: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },

  itemText: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 4,
    color: "#FFFFFF",
    fontFamily: "open-sans-bold",
  },
});
