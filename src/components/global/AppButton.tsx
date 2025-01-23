import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import GradientBackground from "./GradientBackground";
import { COLORS, FONTS } from "@/src/constants/theme";

interface AppButtonProps {
  title: string;
  onPress: () => void;
  style?: any;
  textStyle?: any;
  disabled?: boolean;
  loading?: boolean;
  bgColor?: string;
  textColor?: string;
}

const AppButton = ({
  title,
  onPress,
  style,
  textStyle,
  disabled,
  loading,
  bgColor,
  textColor,
}: AppButtonProps) => {
  return (
    <Pressable
      style={[styles.btnContainer, style, { backgroundColor: bgColor }]}
      onPress={onPress}
    >
      <Text style={[styles.title, textStyle, { color: "white" }]}>{title}</Text>

      <GradientBackground />
    </Pressable>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  btnContainer: {
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  title: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
});
