import SafeView from "@/src/components/global/SafeView";
import { COLORS } from "@/src/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";

const PrivacyPolicy: React.FC = ({}) => {
  const navigation = useNavigation();

  return (
    <SafeView style={styles.container}>
      <Pressable
        style={{ marginBottom: 20 }}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          size={30}
          color={COLORS.black}
        />
      </Pressable>
      <View style={styles.card}>
        <Text style={styles.header}>Privacy Policy</Text>
        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.text}>
            We take your privacy seriously. Your data is never shared with third
            parties. This app does not collect personal data beyond what is
            necessary for its functionality.
          </Text>
        </ScrollView>
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6", padding: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.secondary,
    marginBottom: 10,
  },
  scrollContainer: { maxHeight: 400 },
  text: { color: "#374151", fontSize: 16 },
});

export default PrivacyPolicy;
