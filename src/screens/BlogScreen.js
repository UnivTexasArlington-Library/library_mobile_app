import {useCallback, useContext, useState, memo} from "react";
import {View, useWindowDimensions, Dimensions} from "react-native";
import {FlashList} from "@shopify/flash-list";
import {BlogContext} from "../store/context/blog-context";
import ArticlePreview from "../components/ArticlePreview";
import {ScrollView} from "react-native";
import {StyleSheet} from "react-native";
import {GlobalStyles} from "../constants/styles";
import {Pressable} from "react-native";
import {MaterialIcons, Foundation} from "@expo/vector-icons";
import {fetchArticleData} from "../util/http";
import LottieView from "lottie-react-native";

function BlogScreen({navigation}) {
  const {width, height} = useWindowDimensions();
  const blogContext = useContext(BlogContext);
  const blogPosts = blogContext.blogs;
  const [isLoading, setIsLoading] = useState(false);

  const BlogList = memo(() => {
    return (
      <>
        <>
          <FlashList
            data={blogPosts}
            keyExtractor={(item) => item.id}
            renderItem={renderBlogItem}
            estimatedItemSize={25}
            testID="blog-list"
          />
        </>
      </>
    );
  });

  //fetches new articles using the first, previous, or next url
  async function getNewArticles(url) {
    setIsLoading(true);
    const blogs = await fetchArticleData("newArticles", url);
    blogContext.setInitialBlogs(blogs);
    setIsLoading(false);
  }

  //individual article data passed down to ArticlePreview component
  const renderBlogItem = useCallback((itemData) => {
    return (
      <ArticlePreview
        imageUrl={{uri: itemData.item.featuredImageLink}}
        articleTitle={itemData.item.title}
        articleTeaser={itemData.item.blogTeaser}
        author={itemData.item.author}
        created={itemData.item.created}
        bodyHTML={itemData.item.bodyHTML}
        navigation={navigation}
      />
    );
  }, []);

  return (
    <ScrollView>
      <View testID="BlogScreen" style={{justifyContent: "center"}}>
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <LottieView
              source={require("../../assets/loader.json")}
              style={styles.loader}
              autoPlay
            />
          </View>
        ) : (
          <>
            <BlogList />
          </>
        )}
        <View style={styles.buttonsContainer}>
          {blogPosts.first && (
            <View>
              <Pressable
                android_ripple={{color: "#ccc"}}
                style={({pressed}) => [
                  styles.button,
                  pressed ? styles.buttonPressed : null,
                ]}
                onPress={() => getNewArticles(blogPosts.first)}
                testID="event-pressable"
              >
                <View>
                  <Foundation
                    name="previous"
                    size={24}
                    color="white"
                    style={{textAlign: "center"}}
                  />
                </View>
              </Pressable>
            </View>
          )}
          {blogPosts.prev && (
            <View>
              <Pressable
                android_ripple={{color: "#ccc"}}
                style={({pressed}) => [
                  styles.button,
                  pressed ? styles.buttonPressed : null,
                ]}
                onPress={() => getNewArticles(blogPosts.prev)}
                testID="event-pressable"
              >
                <View>
                  <MaterialIcons
                    name="skip-previous"
                    size={24}
                    color="white"
                    style={{textAlign: "center"}}
                  />
                </View>
              </Pressable>
            </View>
          )}
          {blogPosts.next && (
            <View>
              <Pressable
                android_ripple={{color: "#ccc"}}
                style={({pressed}) => [
                  styles.button,
                  pressed ? styles.buttonPressed : null,
                ]}
                onPress={() => getNewArticles(blogPosts.next)}
                testID="event-pressable"
              >
                <View>
                  <MaterialIcons
                    name="skip-next"
                    size={24}
                    color="white"
                    style={{textAlign: "center"}}
                  />
                </View>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

export default BlogScreen;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  buttonsContainer: {
    width: deviceWidth,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 12,
    marginTop: 24,
  },
  button: {
    marginHorizontal: 4,
    width: 60,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary800,
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
  loaderContainer: {
    flex: 1,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    height: deviceHeight,
  },
  loader: {
    width: deviceWidth,
    height: 200,
  },
});
