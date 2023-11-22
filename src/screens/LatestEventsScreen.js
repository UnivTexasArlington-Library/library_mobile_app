import {Foundation, MaterialIcons} from "@expo/vector-icons";
import {FlashList} from "@shopify/flash-list";
import LottieView from "lottie-react-native";
import {memo, useCallback, useContext, useState} from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import ArticlePreview from "../components/ArticlePreview";
import {GlobalStyles} from "../constants/styles";
import {LatestEventsContext} from "../store/context/latestEvents-context";
import {fetchArticleData} from "../util/http";

function LatestEventsScreen({navigation}) {
  const latestEventsContext = useContext(LatestEventsContext);
  const latestEventsPosts = latestEventsContext.latestEvents;
  const [isLoading, setIsLoading] = useState(false);

  const LatestEventsList = memo(() => {
    return (
      <>
        <>
          <FlashList
            data={latestEventsPosts}
            keyExtractor={(item) => item.id}
            renderItem={renderBlogItem}
            estimatedItemSize={25}
            testID="events-list"
          />
        </>
      </>
    );
  });

  //fetches new articles using the first, previous, or next url
  async function getNewArticles(url) {
    setIsLoading(true);
    const latestEvents = await fetchArticleData("newArticles", url);
    latestEventsContext.setInitialLatestEvents(latestEvents);
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
      <View testID="LatestEventsScreen" style={{justifyContent: "center"}}>
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
            <LatestEventsList />
          </>
        )}
        <View style={styles.buttonsContainer}>
          {latestEventsPosts.first && (
            <View>
              <Pressable
                android_ripple={{color: "#ccc"}}
                style={({pressed}) => [
                  styles.button,
                  pressed ? styles.buttonPressed : null,
                ]}
                onPress={() => getNewArticles(latestEventsPosts.first)}
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
          {latestEventsPosts.prev && (
            <View>
              <Pressable
                android_ripple={{color: "#ccc"}}
                style={({pressed}) => [
                  styles.button,
                  pressed ? styles.buttonPressed : null,
                ]}
                onPress={() => getNewArticles(latestEventsPosts.prev)}
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
          {latestEventsPosts.next && (
            <View>
              <Pressable
                android_ripple={{color: "#ccc"}}
                style={({pressed}) => [
                  styles.button,
                  pressed ? styles.buttonPressed : null,
                ]}
                onPress={() => getNewArticles(latestEventsPosts.next)}
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

export default LatestEventsScreen;

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
