import {useContext} from "react";
import {View, useWindowDimensions, Dimensions} from "react-native";
import RenderHTML from "react-native-render-html";
import {FlashList} from "@shopify/flash-list";
import {BlogContext} from "../store/context/blog-context";
import ArticlePreview from "../components/ArticlePreview";
import {ScrollView} from "react-native";
import {StyleSheet} from "react-native";
import {GlobalStyles} from "../constants/styles";
import {Pressable} from "react-native";
import {MaterialIcons, Foundation} from "@expo/vector-icons";
import {fetchArticleData} from "../util/http";

function BlogScreen({navigation}) {
  const {width, height} = useWindowDimensions();
  const blogContext = useContext(BlogContext);
  const blogPosts = blogContext.blogs;

  async function getNewArticles(url) {
    const blogs = await fetchArticleData("newArticles", url);
    blogContext.setInitialBlogs(blogs);
  }

  function renderBlogItem(itemData) {
    const source = {
      html: `${itemData.item.bodyHTML}`,
    };
    return (
      <ArticlePreview
        imageUrl={{uri: itemData.item.featuredImageLink}}
        articleTitle={itemData.item.title}
        articleTeaser={itemData.item.blogTeaser}
        navigation={navigation}
      />
      // <View testID="newsAndEvents-blogItem">
      //   <Image
      //     source={{uri: itemData.item.featuredImageLink}}
      //     style={styles.image}
      //   />
      //   {/* <RenderHTML
      //     contentWidth={width}
      //     source={source}
      //     enableExperimentalMarginCollapsing={true}
      //   /> */}
      //   <Text>{itemData.item.title}</Text>
      // </View>
    );
  }

  return (
    <ScrollView>
      <View testID="BlogScreen" style={{justifyContent: "center"}}>
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
        <FlashList
          data={blogPosts}
          keyExtractor={(item) => item.id}
          renderItem={renderBlogItem}
          estimatedItemSize={200}
          testID="blog-list"
        />
      </View>
    </ScrollView>
  );
}

export default BlogScreen;

const deviceWidth = Dimensions.get("window").width;

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
});
