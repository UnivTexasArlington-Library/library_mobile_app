import {Pressable, StyleSheet, Text} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {GlobalStyles} from "../constants/styles";

function FormButton({onPress, icon, children}) {
  return (
    <Pressable
      style={({pressed}) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons
        style={styles.icon}
        name={icon}
        size={18}
        color={GlobalStyles.colors.primary800}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default FormButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 8,
    width: 150,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});
