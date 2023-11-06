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
import BackButton from "./src/components/BackButton";
import BlogContextProvider from "./src/store/context/blog-context";
import {useEffect, useCallback} from "react";
import {configureFcmNotifications} from "./src/util/fcmTasks";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {StyleSheet, SafeAreaView, Dimensions, Image} from "react-native";
import BlogAndLatestEvents from "./src/screens/BlogAndLatestEvents";
import LatestEventsContextProvider from "./src/store/context/latestEvents-context";
import ArticleScreen from "./src/screens/ArticleScreen";
import LocationsScreen from "./src/screens/LocationsScreen";
import MapScreen from "./src/screens/MapScreen";
import * as Sentry from "sentry-expo";
import {decode, encode} from "base-64";
import LibCalContextProvider from "./src/store/context/libCal-context";
import HoursScreen from "./src/screens/HoursScreen";
import InstagramContextProvider from "./src/store/context/instagram-context";
import ReserveScreen from "./src/screens/ReserveScreen";
import ReserveHoursContextProvider from "./src/store/context/reserveHours-context";
import BookingScreen from "./src/screens/BookingScreen";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

// Keep the splash screen visible while we fetch resources, This prevents SplashScreen from auto hiding while the fonts are loaded.
SplashScreen.preventAutoHideAsync().catch((err) => console.log(err));

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
                    {/* <Stack.Screen
                name="Map"
                component={MapScreen}
                options={({navigation}) => ({
                  headerLeft: () => <BackButton navigation={navigation} />,
                  headerTitleAlign: "center",
                })}
              /> */}
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
