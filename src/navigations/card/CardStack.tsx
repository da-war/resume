import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CardScreen from "@/src/screens/tabs/CardScreen";
import PersonalProfile from "@/src/screens/app/PersonalProfile";
import WorkExperience from "@/src/screens/app/WorkExperience";
import Experiences from "@/src/screens/app/Experiences";
import Hobbies from "@/src/screens/app/Hobbies";
import Skills from "@/src/screens/app/Skills";
import LanguagesScreen from "@/src/screens/app/Languages";
import Achievements from "@/src/screens/app/Achievements";
import Education from "@/src/screens/app/Education";
import Courses from "@/src/screens/app/Courses";
import SummaryScreen from "@/src/screens/app/SummaryScreen";
import ComputerSkills from "@/src/screens/app/ComputerSkills";

const Stack = createNativeStackNavigator();

const CardStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="card" component={CardScreen} />
      <Stack.Screen name="personalProfile" component={PersonalProfile} />
      <Stack.Screen name="workExperience" component={WorkExperience} />
      <Stack.Screen name="experiences" component={Experiences} />
      <Stack.Screen name="hobbies" component={Hobbies} />
      <Stack.Screen name="skills" component={Skills} />
      <Stack.Screen name="languages" component={LanguagesScreen} />
      <Stack.Screen name="achievements" component={Achievements} />
      <Stack.Screen name="education" component={Education} />
      <Stack.Screen name="courses" component={Courses} />
      <Stack.Screen name="summary" component={SummaryScreen} />
      <Stack.Screen name="computerSkills" component={ComputerSkills} />
    </Stack.Navigator>
  );
};

export default CardStack;

const styles = StyleSheet.create({});
