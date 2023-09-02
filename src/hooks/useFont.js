import * as Font from "expo-font";

const customFonts = {
  "open-sans": require("../assets/fonts/OpenSans-Regular.ttf"),
  "open-sans-bold": require("../assets/fonts/OpenSans-Bold.ttf"),
};

const useFonts = async () => {
  await Font.loadAsync(customFonts);
};

export default useFonts;
