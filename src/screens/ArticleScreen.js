import {View, useWindowDimensions} from "react-native";
import RenderHTML, {defaultSystemFonts} from "react-native-render-html";
import {ScrollView, StyleSheet, Image, Dimensions} from "react-native";
import {Text} from "react-native";
import {GlobalStyles} from "../constants/styles";

function ArticleScreen({route}) {
  const systemFonts = [...defaultSystemFonts, "open-sans"];
  const {width, height} = useWindowDimensions();
  const source = {
    html: `<div style="font-size: 16px; fontFamily: 'open-sans'">${route.params.bodyHTML}</div>`,
  };
  const customCSS = {
    img: {
      width: width * 0.9,
    },
  };
  return (
    <ScrollView>
      <View style={styles.rootContainer}>
        <View style={styles.articleContent}>
          <Text style={styles.title}>{route.params.articleTitle}</Text>
          <View style={styles.subheading}>
            {route.params.author && (
              <>
                <Text style={styles.subheadingText}>{route.params.author}</Text>
                <Text
                  style={{
                    fontSize: 8,
                    marginHorizontal: 8,
                    color: GlobalStyles.colors.primary800,
                  }}
                >
                  {"\u2B24"}
                </Text>
              </>
            )}
            <Text style={styles.subheadingText}>{route.params.created}</Text>
          </View>
          <Image source={route.params.imageUrl} style={styles.image} />
          <Text style={styles.teaser}>{route.params.articleTeaser}</Text>
          <RenderHTML
            contentWidth={width}
            source={source}
            enableExperimentalMarginCollapsing={true}
            systemFonts={systemFonts}
            tagsStyles={customCSS}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default ArticleScreen;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  rootContainer: {
    width: deviceWidth,
    justifyContent: "center",
    flexDirection: "row",
  },
  articleContent: {
    width: "90%",
  },
  image: {
    height: 300,
    borderRadius: 8,
  },
  title: {
    fontSize: 25,
    marginTop: 20,
    fontFamily: "open-sans-bold",
  },
  subheading: {
    fontSize: 16,
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  subheadingText: {
    fontFamily: "open-sans-bold",
    color: GlobalStyles.colors.primary100,
  },
  teaser: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
    paddingVertical: 12,
    marginVertical: 14,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: GlobalStyles.colors.primary800,
  },
});
