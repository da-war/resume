import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/tabs/HomeScreen";
import CardScreen from "../screens/tabs/CardScreen";
import Manage from "../screens/tabs/Manage";
import Recipients from "../screens/tabs/Recipients";

const Stack = createNativeStackNavigator();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      
    </Stack.Navigator>
  );
};

export default AppStackNavigator;

const styles = StyleSheet.create({});
