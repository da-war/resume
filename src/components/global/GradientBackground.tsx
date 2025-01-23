import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "@/src/constants/theme";

interface GradientBackgroundProps {
  colors?: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  colors = [COLORS.secondary, COLORS.primary],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
}) => {
  return (
    <LinearGradient
      colors={colors}
      style={styles.absolute}
      start={start}
      end={end}
    />
  );
};

export default GradientBackground;

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    zIndex: -1,
  },
});
