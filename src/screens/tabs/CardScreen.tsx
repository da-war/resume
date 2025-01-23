import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeView from "@/src/components/global/SafeView";
import GradientBackground from "@/src/components/global/GradientBackground";
import { useNavigation } from "@react-navigation/native";
import { FONTS } from "@/src/constants/theme";
import Card from "@/src/components/card/Card";

interface CardItem {
  id: number;
  title: string;
  icon: string;
  onPress: () => void;
}

const CardScreen = () => {
  const navigation = useNavigation();

  const cards: CardItem[] = [
    {
      id: 1,
      title: "Personal Info",
      icon: require("@/assets/icons/personal.png"),
      onPress: () => navigation.navigate("personalProfile"),
    },
    {
      id: 2,
      title: "Summary",
      icon: require("@/assets/icons/summary.png"),
      onPress: () => navigation.navigate("Summary"),
    },
    {
      id: 3,
      title: "Work Experience",
      icon: require("@/assets/icons/work.png"),
      onPress: () => navigation.navigate("workExperience"),
    },
    {
      id: 4,
      title: "Skills",
      icon: require("@/assets/icons/expertise.png"),
      onPress: () => navigation.navigate("Skills"),
    },
    {
      id: 5,
      title: "Languages",
      icon: require("@/assets/icons/language.png"),
      onPress: () => navigation.navigate("Languages"),
    },
    {
      id: 6,
      title: "Hobbies",
      icon: require("@/assets/icons/hobbies.png"),
      onPress: () => navigation.navigate("hobbies"),
    },
  ];

  return (
    <SafeView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/icons/crown.png")}
          resizeMode="contain"
          style={styles.crownIcon}
        />
        <Text style={styles.headerTitle}>Resume Maker</Text>
        <Text></Text>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={cards}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{
            padding: 20,
          }}
          columnWrapperStyle={{
            justifyContent: "space-around",
          }}
          renderItem={({ item }) => (
            <Card title={item.title} icon={item.icon} onPress={item.onPress} />
          )}
        />
      </View>
    </SafeView>
  );
};

export default CardScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  crownIcon: {
    width: 30,
    height: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    marginLeft: -10,
  },
  rightIcon: {
    width: 32,
    height: 32,
    overflow: "hidden",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    display: "none",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  appIcon: {
    width: 15,
    height: 15,
  },
});
