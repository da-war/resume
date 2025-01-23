import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Manage from "@/src/screens/tabs/Manage";
import PersonalProfile from "@/src/screens/app/PersonalProfile";

const Stack = createNativeStackNavigator();

const ManageNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Manage" component={Manage} />
      <Stack.Screen name="personalProfile" component={PersonalProfile} />
    </Stack.Navigator>
  );
};

export default ManageNavigator;

const styles = StyleSheet.create({});
