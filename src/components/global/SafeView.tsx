import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface SafeViewProps {
  children: React.ReactNode;
  style: ViewStyle;
}

const SafeView: React.FC<SafeViewProps> = ({ children, style }) => {
  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: "white" }, style]}>
      {children}
    </SafeAreaView>
  );
};

export default SafeView;

const styles = StyleSheet.create({});
