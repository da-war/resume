import { useResumeStore } from "@/src/store/resumeStore";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const SummaryScreen = () => {
  const { summary, updateSummary } = useResumeStore();
  const [title, setTitle] = useState(summary.title);
  const [summaryText, setSummaryText] = useState(summary.summary);

  const handleSave = () => {
    updateSummary({ title, summary: summaryText });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Summary"
        multiline
        value={summaryText}
        onChangeText={setSummaryText}
      />
      <Button title="Save" onPress={handleSave} />
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
});

export default SummaryScreen;
