import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import React from "react";
import {
  COLORS,
  FONTS,
  screenHeight,
  screenWidth,
  SHADOWS,
} from "@/src/constants/theme";
import GradientBackground from "../global/GradientBackground";

interface CardProps {
  icon?: any;
  title: string;
  onPress: () => void;
}

const Card: React.FC<CardProps> = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Image source={icon} style={styles.icon} resizeMode="contain" />
        <GradientBackground />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    width: screenWidth / 2.7,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
    ...SHADOWS.medium,
  },
  icon: {
    width: 20,
    height: 20,
  },
  title: {
    fontFamily: FONTS.medium,
    fontSize: 12,
  },
  iconContainer: {
    padding: 10,
    borderRadius: "50%",
    overflow: "hidden",
  },
});
