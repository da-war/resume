import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/tabs/HomeScreen";
import CardScreen from "../screens/tabs/CardScreen";
import Manage from "../screens/tabs/Manage";
import Recipients from "../screens/tabs/Recipients";
import { Image } from "react-native";
import { COLORS } from "../constants/theme";
import ManageNavigator from "./manage/ManageNavigator";
import CardStack from "./card/CardStack";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.black,
        tabBarStyle: {
          borderTopColor: "transparent",
          backgroundColor: COLORS.white,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("@/assets/icons/tab/homec.png")
                  : require("@/assets/icons/tab/home.png")
              }
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Card"
        component={CardStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("@/assets/icons/tab/cardc.png")
                  : require("@/assets/icons/tab/card.png")
              }
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Recipients"
        component={Recipients}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("@/assets/icons/tab/profilec.png")
                  : require("@/assets/icons/tab/profile.png")
              }
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Manage"
        component={ManageNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("@/assets/icons/tab/managec.png")
                  : require("@/assets/icons/tab/manage.png")
              }
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
