import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Manage from "@/src/screens/tabs/Manage";
import PersonalProfile from "@/src/screens/app/PersonalProfile";
import Summaries from "@/src/screens/app/SummaryScreen";
import PrivacyPolicy from "@/src/screens/manage/PrivacyPolicy";
import Help from "@/src/screens/manage/Help";
import Rate from "@/src/screens/manage/Rate";
import TermsConditions from "@/src/screens/manage/TermsConditions";

const Stack = createNativeStackNavigator();

const ManageNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Manages" component={Manage} />
      <Stack.Screen name="personalProfile" component={PersonalProfile} />
      <Stack.Screen name="mSummary" component={Summaries} />
      <Stack.Screen name="privacy" component={PrivacyPolicy} />
      <Stack.Screen name="help" component={Help} />
      <Stack.Screen name="rate" component={Rate} />
      <Stack.Screen name="terms" component={TermsConditions} />
    </Stack.Navigator>
  );
};

export default ManageNavigator;

const styles = StyleSheet.create({});
