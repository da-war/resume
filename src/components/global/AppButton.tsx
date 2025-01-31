import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  isGradient?: boolean;
}

const AppButton = ({
  title,
  onPress,
  style,
  textStyle,
  disabled,
  loading,
  bgColor,
  textColor = "white",
  isGradient = true,
}: AppButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.btnContainer, style, { backgroundColor: bgColor }]}
      onPress={onPress}
    >
      <Text style={[styles.title, textStyle, { color: textColor }]}>
        {title}
      </Text>

      {isGradient && <GradientBackground />}
    </TouchableOpacity>
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
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
});
