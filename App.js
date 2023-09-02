import {StatusBar} from "expo-status-bar";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import {
  createDrawerNavigator,
  DrawerToggleButton,
} from "@react-navigation/drawer";
import Home from "./src/screens/HomeScreen";
import {GlobalStyles} from "./src/constants/styles";
import BlogScreen from "./src/screens/LatestEventsScreen";
import BackButton from "./src/components/BackButton";
import BlogContextProvider from "./src/store/context/blog-context";
import {useEffect, useCallback} from "react";
import {
  configureFcmInAppMessaging,
  configureFcmNotifications,
} from "./src/util/fcmTasks";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {StyleSheet, SafeAreaView} from "react-native";
import BlogAndLatestEvents from "./src/screens/BlogAndLatestEvents";
import LatestEventsContextProvider from "./src/store/context/latestEvents-context";
import ArticleScreen from "./src/screens/ArticleScreen";

SplashScreen.preventAutoHideAsync().catch((err) => console.log(err));

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigation({navigation}) {
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.rootScreen} onLayout={onLayoutRootView}>
      <Drawer.Navigator
        screenOptions={{
          headerLeft: () => <BackButton navigation={navigation} />,
          drawerPosition: "right",
          headerRight: () => <DrawerToggleButton tintColor="white" />,
          headerTitleAlign: "center",
          drawerActiveTintColor: "white",
          drawerInactiveTintColor: "black",
          drawerActiveBackgroundColor: GlobalStyles.colors.primary800,
        }}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="BlogAndLatestEvents"
          component={BlogAndLatestEvents}
          options={{
            title: "News and Events",
            headerStyle: {
              backgroundColor: GlobalStyles.colors.primary800,
            },
            headerTintColor: "white",
          }}
        />
      </Drawer.Navigator>
    </SafeAreaView>
  );
}

export default function App() {
  useEffect(() => {
    configureFcmNotifications();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <LatestEventsContextProvider>
        <BlogContextProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
                headerTintColor: "white",
                tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
                tabBarActiveTintColor: GlobalStyles.colors.accent500,
              }}
            >
              <Stack.Screen
                name="Drawer"
                component={DrawerNavigation}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Article"
                component={ArticleScreen}
                options={
                  {
                    // title: "Blog and Latest Events",
                  }
                }
              />
            </Stack.Navigator>
          </NavigationContainer>
        </BlogContextProvider>
      </LatestEventsContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
});
