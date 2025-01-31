import { useResumeStore } from "@/src/store/resumeStore";
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";

const ComputerSkills = () => {
  const { computerSkills, addComputerSkill, removeComputerSkill } =
    useResumeStore();
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      addComputerSkill(newSkill);
      setNewSkill("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a computer skill"
        value={newSkill}
        onChangeText={setNewSkill}
      />
      <Button title="Add Skill" onPress={handleAddSkill} />

      <FlatList
        data={computerSkills}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item}</Text>
            <Button
              title="Delete"
              onPress={() => removeComputerSkill(item)}
              color="red"
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default ComputerSkills;
