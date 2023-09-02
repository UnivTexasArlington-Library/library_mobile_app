import {Pressable, StyleSheet, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

function BackButton({navigation}) {
  return (
    <Pressable onPress={() => navigation.goBack()}>
      <View style={styles.rootContainer}>
        <View>
          <Ionicons name="arrow-back-circle-sharp" size={30} color="white" />
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
    marginLeft: 8,
  },
});
