import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "@/src/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Help: React.FC = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.secondary]}
      style={styles.container}
    >
      <Pressable style={styles.absolute} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={30}
          color={COLORS.white}
        />
      </Pressable>
      <View style={styles.card}>
        <Text style={styles.header}>Help Us Improve</Text>
        <Text style={styles.text}>
          If you encounter any issues or have suggestions, contact us:
        </Text>
        <TouchableOpacity
          onPress={() => Linking.openURL("mailto:support@example.com")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Email Support</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
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
    color: "#1E3A8A",
    marginBottom: 10,
    textAlign: "center",
  },
  text: {
    color: "#374151",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.secondary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  absolute: {
    position: "absolute",
    top: 70,
    left: 20,
  },
});

export default Help;
