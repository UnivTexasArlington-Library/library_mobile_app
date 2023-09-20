import ArticlePreview from "../components/ArticlePreview";
import RenderHTML from "react-native-render-html";

//Renders each individual article from the article list with a feature image, article title, and article teaser text
export function renderBlogItem(itemData) {
  const source = {
    html: `${itemData.item.bodyHTML}`,
  };
  return (
    <ArticlePreview
      imageUrl={{uri: itemData.item.featuredImageLink}}
      articleTitle={itemData.item.title}
      articleTeaser={itemData.item.blogTeaser}
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
