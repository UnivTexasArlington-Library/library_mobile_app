import {
  createDrawerNavigator,
  DrawerToggleButton,
} from "@react-navigation/drawer";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {decode, encode} from "base-64";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {StatusBar} from "expo-status-bar";
import {useCallback, useEffect} from "react";
import {SafeAreaView, StyleSheet} from "react-native";
import "react-native-gesture-handler";
import * as Sentry from "sentry-expo";
import BackButton from "./src/components/BackButton";
import {GlobalStyles} from "./src/constants/styles";
import ArticleScreen from "./src/screens/ArticleScreen";
import BlogAndLatestEvents from "./src/screens/BlogAndLatestEvents";
import BookingScreen from "./src/screens/BookingScreen";
import Home from "./src/screens/HomeScreen";
import HoursScreen from "./src/screens/HoursScreen";
import MapScreen from "./src/screens/MapScreen";
import ReserveScreen from "./src/screens/ReserveScreen";
import BlogContextProvider from "./src/store/context/blog-context";
import InstagramContextProvider from "./src/store/context/instagram-context";
import LatestEventsContextProvider from "./src/store/context/latestEvents-context";
import LibCalContextProvider from "./src/store/context/libCal-context";
import ReserveHoursContextProvider from "./src/store/context/reserveHours-context";
import {configureFcmNotifications} from "./src/util/fcmTasks";

//The two following if statements removes the errors
//Can't find variable: btoa &&  Can't find variable: atob
//Sets the btoa variable to base64 format
if (!global.btoa) {
  global.btoa = encode;
}
//Sets the atob variable to base64 format
if (!global.atob) {
  global.atob = decode;
}

// Keep the splash screen visible while we fetch resources, This prevents SplashScreen from auto hiding while the fonts are loaded.
SplashScreen.preventAutoHideAsync().catch((err) => console.log(err));
//Initializes Sentry: Application Performance Monitoring and Error Tracking
Sentry.init({
  dsn: "https://318ff9e98066266d1a30afbffb05b767@o4505909001191424.ingest.sentry.io/4505909010038784",
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigation({navigation}) {
  // Pre-load fonts at runtime
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
  //After the custom fonts have loaded, we can hide the splash screen and display the app screen.
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
        <Drawer.Screen
          name="Hours"
          component={HoursScreen}
          options={{
            title: "Library Hours",
            headerStyle: {
              backgroundColor: GlobalStyles.colors.primary800,
            },
            headerTintColor: "white",
          }}
        />
        <Drawer.Screen
          name="Locations"
          component={MapScreen}
          options={{
            title: "Department Locations",
            headerStyle: {
              backgroundColor: GlobalStyles.colors.primary800,
            },
            headerTintColor: "white",
          }}
        />
        <Drawer.Screen
          name="Reserve"
          component={ReserveScreen}
          options={{
            title: "Reserve Room",
            headerStyle: {
              backgroundColor: GlobalStyles.colors.primary800,
            },
            headerTintColor: "white",
          }}
        />
        <Drawer.Screen
          name="Booking"
          component={BookingScreen}
          options={{
            title: "Booking Details",
            headerStyle: {
              backgroundColor: GlobalStyles.colors.primary800,
            },
            headerTintColor: "white",
            drawerItemStyle: {
              display: "none",
            },
          }}
        />
      </Drawer.Navigator>
    </SafeAreaView>
  );
}

export default function App() {
  //Initialize push notifications sent through the Firebase Cloud Messaging Platform
  useEffect(() => {
    configureFcmNotifications();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <ReserveHoursContextProvider>
        <InstagramContextProvider>
          <LibCalContextProvider>
            <LatestEventsContextProvider>
              <BlogContextProvider>
                <NavigationContainer>
                  <Stack.Navigator
                    screenOptions={{
                      headerStyle: {
                        backgroundColor: GlobalStyles.colors.primary800,
                      },
                      headerTintColor: "white",
                      tabBarStyle: {
                        backgroundColor: GlobalStyles.colors.primary800,
                      },
                      tabBarActiveTintColor: GlobalStyles.colors.primary800,
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
                      options={({navigation}) => ({
                        headerLeft: () => (
                          <BackButton navigation={navigation} />
                        ),
                        headerTitleAlign: "center",
                      })}
                    />
                  </Stack.Navigator>
                </NavigationContainer>
              </BlogContextProvider>
            </LatestEventsContextProvider>
          </LibCalContextProvider>
        </InstagramContextProvider>
      </ReserveHoursContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
});
