import {View, StyleSheet, useWindowDimensions, ScrollView} from "react-native";
import HeaderImage from "../components/HeaderImage";
import Options from "../components/Options";
import {useContext, useState, useEffect} from "react";
import {BlogContext} from "../store/context/blog-context";
import {fetchBlogData} from "../util/http";

function Home({route, navigation}) {
  const {width, height} = useWindowDimensions();
  const blogContext = useContext(BlogContext);
  useEffect(() => {
    async function getBlogData() {
      const blogs = await fetchBlogData();
      blogContext.setInitialBlogs(blogs);
    }
    getBlogData();
  }, []);

  return (
    <ScrollView>
      <View style={styles.rootContainer}>
        <HeaderImage />
        <Options navigation={navigation} />
      </View>
    </ScrollView>
  );
}

export default Home;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
