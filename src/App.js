import {StatusBar} from "expo-status-bar";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import {
  createDrawerNavigator,
  DrawerToggleButton,
} from "@react-navigation/drawer";
import Home from "./screens/HomeScreen";
import {GlobalStyles} from "./constants/styles";
import BlogScreen from "./screens/NewsAndEventsScreen";
import BackButton from "./components/BackButton";
import BlogContextProvider from "./store/context/blog-context";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigation({navigation}) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerLeft: () => <BackButton navigation={navigation} />,
        drawerPosition: "right",
        headerRight: () => <DrawerToggleButton />,
        headerTitleAlign: "center",
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
        name="NewsAndEvents"
        component={BlogScreen}
        options={{
          title: "News and Events",
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
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
          </Stack.Navigator>
        </NavigationContainer>
      </BlogContextProvider>
    </>
  );
}
