import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
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

const Resources = ({navigation}) => {
  function openDrawerHandler(selectionOption) {
    navigation.navigate(selectionOption);
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.headerText}>Resources</Text>
      <View style={styles.itemsContainer}>
        <Pressable
          android_ripple={{color: "#ccc"}}
          style={({pressed}) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
            ,
            styles.gridItem,
          ]}
          onPress={() => openDrawerHandler("Reserve")}
          testID="event-pressable"
        >
          <ImageBackground
            source={require("../../assets/images/reserve-a-room.png")}
            style={styles.image}
          />
        </Pressable>
        {/* <Pressable
          android_ripple={{color: "#ccc"}}
          style={({pressed}) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
            ,
            styles.gridItem,
          ]}
          onPress={() => openDrawerHandler("Hours")}
          testID="event-pressable"
        >
          <AntDesign
            name="clockcircleo"
            size={70}
            color={GlobalStyles.colors.primary50}
            testID="hours-icon"
          />
          <Text style={styles.itemText} testID="hours-text">
            Hours
          </Text>
        </Pressable>
        <Pressable
          android_ripple={{color: "#ccc"}}
          style={({pressed}) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
            ,
            styles.gridItem,
          ]}
          onPress={() => openDrawerHandler("Locations")}
          testID="event-pressable"
        >
          <FontAwesome5
            name="map-marked-alt"
            size={70}
            color={GlobalStyles.colors.primary50}
            testID="locations-icon"
          />
          <Text style={styles.itemText} testID="locations-text">
            Department Locations
          </Text>
        </Pressable> */}
      </View>
    </View>
  );
};

export default React.memo(Resources);

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  rootContainer: {
    width: deviceWidth,
    paddingHorizontal: 10,
  },
  headerText: {
    textAlign: "left",
    color: GlobalStyles.colors.primary500,
    fontSize: 24,
    fontFamily: "open-sans-bold",
  },
  itemsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  gridItem: {
    width: 350,
    height: 130,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: GlobalStyles.colors.primary800,
    borderRadius: 8,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  image: {
    flex: 1,
    borderRadius: 8,
    width: "100%",
  },
  itemText: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 4,
    color: "#FFFFFF",
    fontFamily: "open-sans-bold",
  },
});
