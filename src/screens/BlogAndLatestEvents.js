import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import LatestEventsScreen from "./LatestEventsScreen";
import BlogScreen from "./BlogScreen";
import {MaterialIcons, AntDesign} from "@expo/vector-icons";
import {GlobalStyles} from "../constants/styles";
import {Text} from "react-native";

const BottomTab = createBottomTabNavigator();

//News And Events Screen contain "latest events" and "blog" bottom tabs
export default function BlogAndLatestEvents() {
  return (
    <BottomTab.Navigator
      initialRouteName="Latest Events"
      screenOptions={{
        headerStyle: {backgroundColor: "#3c0a6b"},
        headerTintColor: "white",
        tabBarActiveTintColor: GlobalStyles.colors.primary800,
      }}
    >
      <BottomTab.Screen
        name="Latest Events"
        component={LatestEventsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="event-note" color={color} size={size} />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontSize: 16,
                color: focused ? GlobalStyles.colors.primary800 : "gray",
              }}
            >
              Latest Events
            </Text>
          ),
        }}
      />
      <BottomTab.Screen
        name="Blog"
        component={BlogScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <AntDesign name="message1" color={color} size={size} />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontSize: 16,
                color: focused ? GlobalStyles.colors.primary800 : "gray",
              }}
            >
              Blog
            </Text>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
