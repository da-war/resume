import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "@/src/constants/theme";
import { useNavigation } from "@react-navigation/native";

const Rate: React.FC = () => {
  const [rating, setRating] = useState(0);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable style={styles.absolute} onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={28}
          color={COLORS.black}
        />
      </Pressable>
      <View style={styles.card}>
        <Text style={styles.header}>Rate Us</Text>
        <AirbnbRating
          count={5}
          defaultRating={rating}
          size={30}
          onFinishRating={setRating}
        />
        <Text style={styles.text}>You rated: {rating} stars</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <LinearGradient colors={["#ff7e5f", "#feb47b"]} style={styles.gradient}>
          <Text style={styles.buttonText}>Submit Rating</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F3F4F6",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E3A8A",
    marginBottom: 10,
  },
  text: { color: "#374151", fontSize: 16, marginTop: 10 },
  button: { marginTop: 20, width: "100%" },
  gradient: { padding: 12, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  absolute: {
    position: "absolute",
    left: 20,
    top: 70,
  },
});

export default Rate;
