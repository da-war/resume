import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "@/src/constants/theme";

interface SettingCardProps {
  icon: any;
  title: string;
  onPress: () => void;
  logout?: boolean;
}

const SettingCard: React.FC<SettingCardProps> = ({
  icon = "email",
  title,
  onPress,
  logout,
}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.innerContainer}>
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={COLORS.iconColor}
        />
        <Text style={styles.title}>{title}</Text>
      </View>

      {!logout && (
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={COLORS.gray}
        />
      )}
    </Pressable>
  );
};

export default SettingCard;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginLeft: 10,
    color: COLORS.iconColor,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
