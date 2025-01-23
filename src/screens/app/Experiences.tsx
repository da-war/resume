import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import SafeView from "@/src/components/global/SafeView";
import { COLORS, FONTS } from "@/src/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import GradientBackground from "@/src/components/global/GradientBackground";

const Experiences: React.FC = () => {
  const navigation = useNavigation();
  const experiences = [
    {
      id: 1,
      organizationName: "Samp Solution",
      designationName: "Senior Software Engineer",
      roleInOrganization: "React Native Developer",
      dateFrom: "April 2022",
      dateTo: "Jan 2023",
    },
    {
      id: 2,
      organizationName: "Samp Solution",
      designationName: "Senior Software Engineer",
      roleInOrganization: "React Native Developer",
      dateFrom: "April 2022",
      dateTo: "Jan 2023",
    },
  ];

  return (
    <SafeView style={styles.mainContainer}>
      <Text style={styles.title}>Work Experiences</Text>
      <Pressable onPress={() => navigation.goBack()} style={styles.absolute}>
        <MaterialCommunityIcons
          name="arrow-left"
          color={COLORS.black}
          size={28}
        />
      </Pressable>

      <View style={styles.dataContainer}>
        <FlatList
          data={experiences}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.experienceBox}>
              <View style={styles.section}>
                <View style={styles.iconContainer}>
                  <GradientBackground />
                  <Image
                    source={require("@/assets/icons/company.png")}
                    style={styles.icon}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.organizationName}>
                  {item.organizationName}
                </Text>
              </View>
              <View style={styles.spacer} />
              <View style={styles.section}>
                <Text style={styles.heading}>Designation Name:</Text>
                <Text style={styles.text}>{item.designationName}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.heading}>Role In Organization:</Text>
                <Text style={styles.text}>{item.roleInOrganization}</Text>
              </View>
              <View style={styles.spacer} />
              <View style={styles.section}>
                <Text style={styles.heading}>Time:</Text>
                <View style={styles.row}>
                  <Text style={styles.text}>{item.dateFrom}</Text>
                  <Text style={styles.text}>-</Text>
                  <Text style={styles.text}>{item.dateTo}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </SafeView>
  );
};

export default Experiences;

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 60,
    left: 20,
  },
  dataContainer: {
    marginTop: 30,
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
  experienceBox: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    marginBottom: 10,
    borderRadius: 15,
  },
  icon: {
    width: 30,
    height: 30,
  },
  heading: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.black,
  },
  text: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 7,
  },
  organizationName: {
    color: COLORS.secondary,
    fontFamily: FONTS.bold,
    marginTop: 7,
  },
  iconContainer: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    overflow: "hidden",
  },
  sectionContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  spacer: {
    height: 10,
    backgroundColor: COLORS.black,
  },
});
