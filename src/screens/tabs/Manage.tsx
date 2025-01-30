import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeView from "@/src/components/global/SafeView";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "@/src/constants/theme";
import SettingCard from "@/src/components/manage/SettingCard";
import { useNavigation } from "@react-navigation/native";

const Manage = () => {
  const navigaiton = useNavigation();
  return (
    <SafeView style={styles.container}>
      <Text style={styles.title}>Setting</Text>

      <Pressable
        onPress={() => navigaiton.navigate("personalProfile")}
        style={styles.profile}
      >
        <View style={styles.innerProfile}>
          <Image
            source={require("@/assets/images/resume1.png")}
            style={styles.image}
            resizeMode="cover"
          />
          <View>
            <Text style={styles.name}>Dawar</Text>
            <Text style={styles.subTitle}>id,media,shopping</Text>
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
          onPress={() => console.log("Hello")}
        />
        <View
          style={{ height: 1, backgroundColor: COLORS.gray, opacity: 0.3 }}
        />
        <SettingCard
          title="Share with Friends"
          icon="share"
          onPress={() => console.log("Hello")}
        />
        <View
          style={{ height: 1, backgroundColor: COLORS.gray, opacity: 0.3 }}
        />
        <SettingCard
          title="Privacy Policy"
          icon="security"
          onPress={() => console.log("Hello")}
        />
        <View
          style={{ height: 1, backgroundColor: COLORS.gray, opacity: 0.3 }}
        />
        <SettingCard
          title="Help"
          icon="help"
          onPress={() => console.log("Hello")}
        />
        <View
          style={{ height: 1, backgroundColor: COLORS.gray, opacity: 0.3 }}
        />
        <SettingCard
          title="Terms of Use"
          icon="book"
          onPress={() => console.log("Hello")}
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
