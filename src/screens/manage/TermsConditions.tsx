import SafeView from "@/src/components/global/SafeView";
import { COLORS } from "@/src/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";

const TermsConditions: React.FC = () => {
  const navigation = useNavigation();
  return (
    <SafeView style={styles.container}>
      <Pressable style={styles.absolute} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={30}
          color={COLORS.black}
        />
      </Pressable>
      <View style={styles.card}>
        <Text style={styles.header}>Terms & Conditions</Text>
        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.text}>
            By using this app, you agree to abide by the terms and conditions
            outlined herein...
          </Text>
        </ScrollView>
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E5E7EB", padding: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 7,
    marginTop: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 10,
  },
  scrollContainer: { maxHeight: 400 },
  text: { color: "#6B7280", fontSize: 16 },
  absolute: {
    position: "absolute",
    top: 70,
    left: 20,
  },
});

export default TermsConditions;
