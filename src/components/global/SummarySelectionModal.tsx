import { COLORS } from "@/src/constants/theme";
import React from "react";
import {
  Modal,
  FlatList,
  Pressable,
  Text,
  View,
  StyleSheet,
  ListRenderItem,
} from "react-native";

// Define the type for a summary object
type Summary = {
  id: string;
  title: string;
  summary: string;
};

// Define the props for the SummarySelectionModal component
type SummarySelectionModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelectSummary: (summary: Summary) => void;
};

// Mock data for summaries
const summaries: Summary[] = [
  { id: "1", title: "Summary 1", summary: "This is the first summary." },
  { id: "2", title: "Summary 2", summary: "This is the second summary." },
  { id: "3", title: "Summary 3", summary: "This is the third summary." },
];

const SummarySelectionModal: React.FC<SummarySelectionModalProps> = ({
  visible,
  onClose,
  onSelectSummary,
}) => {
  // Render each summary item
  const renderSummaryItem: ListRenderItem<Summary> = ({ item }) => (
    <Pressable style={styles.summaryItem} onPress={() => onSelectSummary(item)}>
      <Text style={styles.summaryTitle}>{item.title}</Text>
      <Text style={styles.summaryText}>{item.summary}</Text>
    </Pressable>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.modalContainer}>
        <FlatList
          data={summaries}
          keyExtractor={(item) => item.id}
          renderItem={renderSummaryItem}
        />
        <Pressable style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 80,
  },
  summaryItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  summaryText: {
    fontSize: 14,
    color: "#666",
  },
  closeButton: {
    marginTop: 16,
    padding: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default SummarySelectionModal;
