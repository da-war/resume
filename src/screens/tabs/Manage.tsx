import { Image, Pressable, Share, StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeView from "@/src/components/global/SafeView";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "@/src/constants/theme";
import SettingCard from "@/src/components/manage/SettingCard";
import { useNavigation } from "@react-navigation/native";
import { useResumeStore } from "@/src/store/resumeStore";

const Manage = () => {
  const navigaiton = useNavigation();

  const personalInfo = useResumeStore((state) => state.personalInfo);

  const shareApp = async () => {
    try {
      await Share.share({
        message:
          "Check out this amazing Resume App! Download it now: https://resumeapp.com",
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <SafeView style={styles.container}>
      <Text style={styles.title}>Setting</Text>

      <Pressable
        onPress={() => navigaiton.navigate("personalProfile")}
        style={styles.profile}
      >
        <View style={styles.innerProfile}>
          <Image
            source={
              !personalInfo.photo
                ? require("@/assets/images/resume1.png")
                : { uri: personalInfo.photo }
            }
            style={styles.image}
            resizeMode="cover"
          />
          <View>
            <Text style={styles.name}>
              {personalInfo.name ? personalInfo.name : "Profile Yet to setup"}
            </Text>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={styles.subTitle}
            >
              {personalInfo.email ? personalInfo.email : "Profile Yet to setup"}
            </Text>
          </View>
        </View>
        <View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={32}
            color={COLORS.gray}
          />
        </View>
      </Pressable>

      <View style={styles.listContainer}>
        <SettingCard
          title="Rate Us"
          icon="star"
          onPress={() => navigaiton.navigate("rate")}
        />
        <View
          style={{ height: 1, backgroundColor: COLORS.gray, opacity: 0.3 }}
        />
        <SettingCard
          title="Share with Friends"
          icon="share"
          onPress={() => shareApp()}
        />
        <View
          style={{ height: 1, backgroundColor: COLORS.gray, opacity: 0.3 }}
        />
        <SettingCard
          title="Privacy Policy"
          icon="security"
          onPress={() => navigaiton.navigate("privacy")}
        />
        <View
          style={{ height: 1, backgroundColor: COLORS.gray, opacity: 0.3 }}
        />
        <SettingCard
          title="Help"
          icon="help"
          onPress={() => navigaiton.navigate("help")}
        />
        <View
          style={{ height: 1, backgroundColor: COLORS.gray, opacity: 0.3 }}
        />
        <SettingCard
          title="Terms of Use"
          icon="book"
          onPress={() => navigaiton.navigate("terms")}
        />
      </View>

      <View style={styles.logout}>
        <SettingCard
          title="Log Out"
          icon="logout"
          onPress={() => console.log("Hello")}
          logout={true}
        />
      </View>
    </SafeView>
  );
};

export default Manage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: FONTS.medium,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    marginVertical: 10,
    marginTop: 20,
  },
  innerProfile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  name: {
    fontFamily: FONTS.semiBold,
    fontSize: 18,
  },
  subTitle: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.black,
  },
  listContainer: {
    backgroundColor: COLORS.background,
    padding: 10,
    borderRadius: 10,
  },
  logout: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 10,
    marginTop: 30,
  },
});
