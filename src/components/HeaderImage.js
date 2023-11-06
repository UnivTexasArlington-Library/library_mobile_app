import {View, StyleSheet, Dimensions, Image} from "react-native";

function HeaderImage() {
  return (
    <View style={styles.imageContainer}>
      <Image
        style={styles.backgroundImage}
        source={require("../../assets/images/central-library-and-fountain-edited.png")}
      />
    </View>
  );
}

export default HeaderImage;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  imageContainer: {
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    height: 120,
  },
  backgroundImage: {
    width: deviceWidth,
  },
  logoImage: {
    position: "absolute",
    margin: "auto",
  },
});
