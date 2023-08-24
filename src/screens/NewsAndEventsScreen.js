import {useContext, useEffect, useState} from "react";
import {Text, View, useWindowDimensions, Image, StyleSheet} from "react-native";
import RenderHTML from "react-native-render-html";
import {FlashList} from "@shopify/flash-list";
import {BlogContext} from "../store/context/blog-context";

function NewsAndEventsScreen() {
  const {width, height} = useWindowDimensions();
  const blogContext = useContext(BlogContext);
  const blogPosts = blogContext.blogs;
  function renderBlogItem(itemData) {
    const source = {
      html: `${itemData.item.bodyHTML}`,
    };
    return (
      <View testID="newsAndEvents-blogItem">
        <Image
          source={{uri: itemData.item.featuredImageLink}}
          style={styles.image}
        />
        {/* <RenderHTML
          contentWidth={width}
          source={source}
          enableExperimentalMarginCollapsing={true}
        /> */}
        <Text>{itemData.item.title}</Text>
      </View>
    );
  }

  return (
    <View
      testID="NewsAndEventsScreen"
      style={{
        height: height,
        width: width,
      }}
    >
      <FlashList
        data={blogPosts}
        keyExtractor={(item) => item.id}
        renderItem={renderBlogItem}
        estimatedItemSize={200}
        testID="blog-list"
      />
    </View>
  );
}

export default NewsAndEventsScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
});
