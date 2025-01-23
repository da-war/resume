import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeView from "@/src/components/global/SafeView";
import { COLORS, FONTS } from "@/src/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AppTextInput from "@/src/components/global/AppTextInput";
import AppButton from "@/src/components/global/AppButton";

import Checkbox from "expo-checkbox";

const WorkExperience: React.FC = () => {
  const navigation = useNavigation();
  const [organizationName, setOrganizationName] = React.useState<string>("");
  const [designation, setDesignation] = React.useState<string>("");
  const [dateFrom, setDateFrom] = React.useState<string>("");
  const [dateTo, setDateTo] = React.useState<string>("");
  const [roleInDesignation, setRoleInDesignation] = React.useState<string>("");
  const [isEmployed, setIsEmployed] = React.useState<boolean>(false);

  return (
    <SafeView style={styles.mainContainer}>
      <Text style={styles.title}>Work Experience</Text>
      <Pressable onPress={() => navigation.goBack()} style={styles.absolute}>
        <MaterialCommunityIcons
          name="arrow-left"
          color={COLORS.black}
          size={28}
        />
      </Pressable>

      <View style={styles.formContainer}>
        <AppTextInput
          placeholder="Enter Organization Name"
          value={organizationName}
          onChangeText={(text) => setOrganizationName(text)}
        />
        <AppTextInput
          placeholder="Enter Designation Name"
          value={designation}
          onChangeText={(text) => setOrganizationName(text)}
        />
        <View style={styles.rowContainer}>
          <View style={{ flex: 1 }}>
            <AppTextInput
              placeholder="From Time"
              value={dateFrom}
              onChangeText={(text) => setOrganizationName(text)}
              icon="calendar"
            />
          </View>
          <View style={{ flex: 1 }}>
            <AppTextInput
              icon="calendar"
              placeholder="To Time"
              value={organizationName}
              onChangeText={(text) => setOrganizationName(text)}
            />
          </View>
        </View>
        <AppTextInput
          placeholder="Enter Role In Designation"
          value={organizationName}
          onChangeText={(text) => setOrganizationName(text)}
        />

        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={isEmployed}
            onValueChange={() => setIsEmployed(!isEmployed)}
            color={COLORS.secondary}
          />
          <Text style={styles.paragraph}>Currently Employed</Text>
        </View>

        <View style={styles.btnContainer}>
          <AppButton
            title="Save"
            onPress={() => navigation.navigate("experiences")}
          />
        </View>
      </View>
    </SafeView>
  );
};

export default WorkExperience;

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 60,
    left: 20,
  },
  mainContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: FONTS.semiBold,
    fontSize: 18,
    textAlign: "center",
    marginTop: 5,
  },
  formContainer: {
    marginTop: 30,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  btnContainer: {
    marginTop: "30%",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 11,
    fontFamily: FONTS.medium,
  },
  checkbox: {
    margin: 5,
    width: 15,
    height: 15,
  },
});
