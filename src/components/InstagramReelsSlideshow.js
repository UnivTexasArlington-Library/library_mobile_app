import React from "react";
import {ResizeMode, Video} from "expo-av";
import OutlinedButton from "./OutlinedButton";
import {Octicons} from "@expo/vector-icons";
import {Dimensions, Pressable, StyleSheet, View} from "react-native";
import {useRef} from "react";
import {useState} from "react";
import {useContext} from "react";
import {InstagramContext} from "../store/context/instagram-context";
import Carousel from "react-native-reanimated-carousel";
import {GlobalStyles} from "../constants/styles";
import LottieView from "lottie-react-native";

const InstagramReelsSlideshow = () => {
  const instagramContext = useContext(InstagramContext);
  const instagramReels = instagramContext.instagramReels.slice(0, 10);
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [isMute, setIsMute] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  onCarouselItemChange = (index) => {
    setFocusedIndex(index);
  };
  const renderCarouselItem = ({item, index}) => (
    <View>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: `${item.media_url}`,
        }}
        useNativeControls
        onReadyForDisplay={(e) => setIsLoaded(e.status.isLoaded)}
        resizeMode={ResizeMode.COVER}
        shouldPlay={focusedIndex === index}
        isMuted={isMute}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <Pressable
        style={({pressed}) => [styles.button, pressed && styles.pressed]}
        onPress={() => setIsMute(!isMute)}
      >
        {isMute ? (
          <Octicons
            style={styles.icon}
            name="mute"
            size={30}
            color={GlobalStyles.colors.primary50}
          />
        ) : (
          <Octicons
            style={styles.icon}
            name="unmute"
            size={30}
            color={GlobalStyles.colors.primary50}
          />
        )}
      </Pressable>
      {!isLoaded && (
        <LottieView
          source={require("../../assets/loader.json")}
          style={styles.loader}
          autoPlay
        />
      )}
    </View>
  );
  return (
    <Carousel
      ref={(c) => {
        this.carousel = c;
      }}
      width={deviceWidth * 0.87}
      height={500}
      data={instagramReels}
      panGestureHandlerProps={{
        activeOffsetX: [-10, 10],
      }}
      scrollAnimationDuration={1000}
      onSnapToItem={(index) => this.onCarouselItemChange(index)}
      renderItem={(item, index) => renderCarouselItem(item, index)}
      mode="parallax"
      pagingEnabled={true}
      snapEnabled={true}
      // autoPlay={true}
      // defaultIndex={9}
      // autoPlayInterval={500}
    />
  );
};

export default React.memo(InstagramReelsSlideshow);

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  video: {
    height: 500,
    width: 300,
    borderRadius: 24,
    marginHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  button: {
    position: "absolute",
    top: 20,
    left: 30,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: "black",
    fontSize: 22,
  },
});
