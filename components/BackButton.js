import {Pressable, StyleSheet, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

function BackButton({navigation}) {
  return (
    <Pressable onPress={() => navigation.goBack()}>
      <View style={styles.rootContainer}>
        <View>
          <Ionicons name="chevron-back" size={30} />
        </View>
        <View>
          <Text style={styles.iconText}>Back</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default BackButton;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 20,
    // textAlign: "center",
    // marginTop: 4,
  },
});
