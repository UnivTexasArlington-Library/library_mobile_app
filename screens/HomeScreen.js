import {View, StyleSheet, useWindowDimensions, ScrollView} from "react-native";
import HeaderImage from "../components/HeaderImage";
import Options from "../components/Options";
function Home({route, navigation}) {
  const {width, height} = useWindowDimensions();

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
