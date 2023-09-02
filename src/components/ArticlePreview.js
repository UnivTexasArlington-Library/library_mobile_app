import {
  Text,
  View,
  useWindowDimensions,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";

function ArticlePreview({imageUrl, articleTitle, articleTeaser, navigation}) {
  const {width} = useWindowDimensions();

  return (
    <Pressable
      android_ripple={{color: "#ccc"}}
      style={({pressed}) => [
        styles.button,
        pressed ? styles.buttonPressed : null,
      ]}
      onPress={() => navigation.navigate("Article", {imageUrl: imageUrl})}
      testID="event-pressable"
    >
      <View
        testID="newsAndEvents-blogItem"
        style={{
          width: width,
          marginHorizontal: "auto",
          alignItems: "center",
          backgroundColor: "#F5F5F5",
        }}
      >
        <View style={styles.articleContainer}>
          <Image source={imageUrl} style={styles.image} />
          <View style={styles.articleTextContainer}>
            <Text style={styles.title}>{articleTitle}</Text>
            <Text style={styles.teaser}>{articleTeaser}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default ArticlePreview;

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
    minHeight: 150,
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
