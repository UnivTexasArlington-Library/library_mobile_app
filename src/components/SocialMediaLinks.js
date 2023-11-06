import React from "react";
import {ResizeMode, Video} from "expo-av";
import OutlinedButton from "./OutlinedButton";
import {Octicons} from "@expo/vector-icons";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {useRef} from "react";
import {useState} from "react";
import {useContext} from "react";
import {InstagramContext} from "../store/context/instagram-context";
import Carousel from "react-native-reanimated-carousel";
import {GlobalStyles} from "../constants/styles";
import * as Linking from "expo-linking";

const SocialMediaLinks = () => {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.headerText}>Social Media</Text>
      <View style={styles.gridContainer}>
        <Pressable
          android_ripple={{color: "#ccc"}}
          style={({pressed}) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
            ,
            styles.gridItem,
          ]}
          onPress={() =>
            Linking.openURL("https://www.instagram.com/utalibraries")
          }
          testID="event-pressable"
        >
          <Image
            source={require("../../assets/images/instagram.png")}
            style={{width: 40, height: 40}}
          />
        </Pressable>
        <Pressable
          android_ripple={{color: "#ccc"}}
          style={({pressed}) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
            ,
            styles.gridItem,
          ]}
          onPress={() =>
            Linking.openURL("https://www.facebook.com/utalibraries")
          }
          testID="event-pressable"
        >
          <Image
            source={require("../../assets/images/facebook.png")}
            style={{width: 40, height: 40}}
          />
        </Pressable>
        <Pressable
          android_ripple={{color: "#ccc"}}
          style={({pressed}) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
            ,
            styles.gridItem,
          ]}
          onPress={() => Linking.openURL("https://twitter.com/utalibraries")}
          testID="event-pressable"
        >
          <Image
            source={require("../../assets/images/twitter.png")}
            style={{width: 40, height: 40}}
          />
        </Pressable>
        <Pressable
          android_ripple={{color: "#ccc"}}
          style={({pressed}) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
            ,
            styles.gridItem,
          ]}
          onPress={() =>
            Linking.openURL(
              "https://www.flickr.com/photos/184381275@N04/albums"
            )
          }
          testID="event-pressable"
        >
          <Image
            source={require("../../assets/images/flickr.png")}
            style={{width: 40, height: 40}}
          />
        </Pressable>
        <Pressable
          android_ripple={{color: "#ccc"}}
          style={({pressed}) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
            ,
            styles.gridItem,
          ]}
          onPress={() =>
            Linking.openURL("https://www.youtube.com/@UTALibraries")
          }
          testID="event-pressable"
        >
          <Image
            source={require("../../assets/images/youtube.png")}
            style={{width: 40, height: 40}}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default React.memo(SocialMediaLinks);

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  rootContainer: {
    width: deviceWidth,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  headerText: {
    textAlign: "left",
    color: GlobalStyles.colors.primary500,
    fontSize: 24,
    fontFamily: "open-sans-bold",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingTop: 10,
  },
  gridItem: {
    width: "18%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    backgroundColor: "white",
    margin: 3,
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
});
