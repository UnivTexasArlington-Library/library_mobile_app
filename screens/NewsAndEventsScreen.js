import {useEffect, useState} from "react";
import {
  FlatList,
  Text,
  View,
  useWindowDimensions,
  Image,
  StyleSheet,
} from "react-native";
import {fetchBlogData} from "../util/http";
import RenderHTML from "react-native-render-html";

function NewsAndEventsScreen() {
  const {width} = useWindowDimensions();
  const [fetchedBlogPost, setFetchedBlogPost] = useState([]);
  function renderBlogItem(itemData) {
    const source = {
      html: `${itemData.item.bodyHTML}`,
    };
    return (
      <View>
        {/* <Image
          source={{uri: itemData.item.blogImageLink}}
          style={styles.image}
        /> */}
        <RenderHTML
          contentWidth={width}
          source={source}
          enableExperimentalMarginCollapsing={true}
        />
        {/* <Text>{itemData.item.blogTeaser}</Text> */}
      </View>
    );
  }
  useEffect(() => {
    async function getBlogData() {
      const blogs = await fetchBlogData();
      setFetchedBlogPost(blogs);
    }
    getBlogData();
  }, []);

  return (
    <View>
      <FlatList
        data={fetchedBlogPost}
        keyExtractor={(item) => item.id}
        renderItem={renderBlogItem}
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
