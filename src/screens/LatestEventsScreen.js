import {useContext, useEffect, useState} from "react";
import {
  Button,
  View,
  useWindowDimensions,
  StyleSheet,
  Dimensions,
} from "react-native";
import RenderHTML from "react-native-render-html";
import {FlashList} from "@shopify/flash-list";
import ArticlePreview from "../components/ArticlePreview";
import {ScrollView} from "react-native";
import {LatestEventsContext} from "../store/context/latestEvents-context";
import {MaterialIcons, Foundation} from "@expo/vector-icons";
import {GlobalStyles} from "../constants/styles";
import {Pressable} from "react-native";
import {fetchArticleData} from "../util/http";

function LatestEventsScreen({navigation}) {
  const {width, height} = useWindowDimensions();
  const latestEventsContext = useContext(LatestEventsContext);
  const latestEventsPosts = latestEventsContext.latestEvents;

  async function getNewArticles(url) {
    const latestEvents = await fetchArticleData("newArticles", url);
    latestEventsContext.setInitialLatestEvents(latestEvents);
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
      <View testID="LatestEventsScreen" style={{justifyContent: "center"}}>
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

        <FlashList
          data={latestEventsPosts}
          keyExtractor={(item) => item.id}
          renderItem={renderBlogItem}
          estimatedItemSize={200}
          testID="events-list"
        />
      </View>
    </ScrollView>
  );
}

export default LatestEventsScreen;

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
