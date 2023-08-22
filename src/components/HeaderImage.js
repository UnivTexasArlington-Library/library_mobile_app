import {View, StyleSheet, Dimensions, Image} from "react-native";

function HeaderImage() {
  return (
    <View style={styles.imageContainer}>
      <Image
        style={styles.backgroundImage}
        source={require("../../assets/images/central-library-and-fountain.png")}
      />
      <Image
        style={styles.logoImage}
        source={require("../../assets/images/uta-logo.png")}
      />
    </View>
  );
}

export default HeaderImage;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  imageContainer: {
    overflow: "hidden",
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    width: deviceWidth,
  },
  logoImage: {
    position: "absolute",
    margin: "auto",
  },
});
