import {Text, View, StyleSheet, Pressable} from "react-native";
import {
  FontAwesome5,
  MaterialIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import {GlobalStyles} from "../constants/styles";
import BlogScreen from "../screens/BlogScreen";

function Options({navigation}) {
  function openDrawerHandler(selectionOption) {
    navigation.navigate("Blog");
  }
  return (
    <View style={styles.gridContainer}>
      <View style={styles.gridItem}>
        <Pressable
          android_ripple={{color: "#ccc"}}
          style={({pressed}) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={openDrawerHandler}
        >
          <FontAwesome5
            name="blog"
            size={70}
            color={GlobalStyles.colors.primary800}
          />
        </Pressable>
        <Text style={styles.itemText}>Blog</Text>
      </View>
      <View style={styles.gridItem}>
        <MaterialIcons
          name="event"
          size={70}
          color={GlobalStyles.colors.primary800}
        />
        <Text style={styles.itemText}>News and Events</Text>
      </View>
      <View style={styles.gridItem}>
        <AntDesign
          name="clockcircleo"
          size={70}
          color={GlobalStyles.colors.primary800}
        />
        <Text style={styles.itemText}>Hours</Text>
      </View>
      <View style={styles.gridItem}>
        <FontAwesome5
          name="map-marked-alt"
          size={70}
          color={GlobalStyles.colors.primary800}
        />
        <Text style={styles.itemText}>Department Locations</Text>
      </View>
      <View style={styles.gridItem}>
        <MaterialIcons
          name="person-search"
          size={70}
          color={GlobalStyles.colors.primary800}
        />
        <Text style={styles.itemText}>Directory</Text>
      </View>
      <View style={styles.gridItem}>
        <Ionicons
          name="notifications-outline"
          size={70}
          color={GlobalStyles.colors.primary800}
        />
        <Text style={styles.itemText}>Notifications</Text>
      </View>
    </View>
  );
}

export default Options;

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    rowGap: 40,
  },
  gridItem: {
    width: "33%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  itemText: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 4,
  },
});
