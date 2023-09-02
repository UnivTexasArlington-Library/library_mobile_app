import {useContext} from "react";
import {View, useWindowDimensions} from "react-native";
import RenderHTML from "react-native-render-html";
import {FlashList} from "@shopify/flash-list";
import {BlogContext} from "../store/context/blog-context";
import ArticlePreview from "../components/ArticlePreview";
import {ScrollView, StyleSheet, Image} from "react-native";
import {Text} from "react-native";

function ArticleScreen({route}) {
  const {width, height} = useWindowDimensions();

  return (
    <ScrollView>
      <View>
        <Image source={route.params.imageUrl} style={styles.image} />
      </View>
    </ScrollView>
  );
}

export default ArticleScreen;

const styles = StyleSheet.create({
  articleContainer: {
    width: "90%",
    marginVertical: 12,
    backgroundColor: "#FFFFFF",
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
  articleTextContainer: {
    marginVertical: 24,
    paddingHorizontal: 8,
  },
  image: {
    height: 300,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    marginBottom: 4,
    fontFamily: "open-sans-bold",
  },
  teaser: {
    fontFamily: "open-sans",
  },
});
