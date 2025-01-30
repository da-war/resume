import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import { WebView } from "react-native-webview";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { templates } from "@/src/constants/data";
import { useResumeStore } from "@/src/store/resumeStore";

const TEMPLATE_HISTORY_KEY = "template_history";

export default function PreviewScreen({ navigation, route }) {
  const initialTemplate = route.params?.initialTemplate || "modern";
  const [selectedTemplate, setSelectedTemplate] = useState(initialTemplate);
  const [loading, setLoading] = useState(false);
  const [html, setHtml] = useState("");
  const [base64Image, setBase64Image] = useState("");

  const personalInfo = useResumeStore((state) => state.personalInfo);
  const experiences = useResumeStore((state) => state.experiences);
  const skills = useResumeStore((state) => state.skills);
  const languages = useResumeStore((state) => state.languages);
  const hobbies = useResumeStore((state) => state.hobbies);
  const achievements = useResumeStore((state) => state.achievements);

  // Convert image URI to base64
  useEffect(() => {
    const convertImageToBase64 = async () => {
      if (personalInfo.photo) {
        try {
          const base64 = await FileSystem.readAsStringAsync(
            personalInfo.photo,
            {
              encoding: FileSystem.EncodingType.Base64,
            }
          );
          setBase64Image(`data:image/jpeg;base64,${base64}`);
        } catch (error) {
          console.error("Error converting image to base64:", error);
        }
      }
    };

    convertImageToBase64();
  }, [personalInfo.photo]);

  // Memoize the resume data object with base64 image
  const resumeData = useMemo(
    () => ({
      personalInfo: {
        ...personalInfo,
        photo: base64Image || personalInfo.photo, // Use base64 if available
      },
      experiences,
      skills,
      languages,
      hobbies,
      achievements,
    }),
    [
      personalInfo,
      base64Image,
      experiences,
      skills,
      languages,
      hobbies,
      achievements,
    ]
  );

  useEffect(() => {
    if (selectedTemplate && resumeData) {
      const generatedHtml = templates[selectedTemplate](resumeData);
      setHtml(generatedHtml);
    }
  }, [selectedTemplate, resumeData]);

  const saveToTemplateHistory = async (templateName, pdfUri) => {
    try {
      const existingHistory = await AsyncStorage.getItem(TEMPLATE_HISTORY_KEY);
      const history = existingHistory ? JSON.parse(existingHistory) : [];

      const newEntry = {
        template: templateName,
        image: pdfUri,
        timestamp: new Date().toISOString(),
      };

      const filteredHistory = history.filter(
        (item) => item.template !== templateName
      );

      const updatedHistory = [newEntry, ...filteredHistory];
      const trimmedHistory = updatedHistory.slice(0, 10);

      await AsyncStorage.setItem(
        TEMPLATE_HISTORY_KEY,
        JSON.stringify(trimmedHistory)
      );
    } catch (error) {
      console.error("Error saving template history:", error);
    }
  };

  const exportPDF = async () => {
    try {
      setLoading(true);
      const { uri } = await Print.printToFileAsync({
        html,
        base64: false,
      });

      await saveToTemplateHistory(selectedTemplate, uri);

      await Sharing.shareAsync(uri, {
        UTI: ".pdf",
        mimeType: "application/pdf",
      });
    } catch (error) {
      Alert.alert("Error", "Failed to export PDF");
    } finally {
      setLoading(false);
    }
  };

  const TemplateSelector = () => (
    <View style={styles.templateSelectorContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.templateSelector}
      >
        {Object.keys(templates).map((template) => (
          <TouchableOpacity
            key={template}
            style={[
              styles.templateOption,
              selectedTemplate === template && styles.selectedTemplate,
            ]}
            onPress={() => setSelectedTemplate(template)}
          >
            <Text
              style={[
                styles.templateText,
                selectedTemplate === template && styles.selectedTemplateText,
              ]}
            >
              {template.charAt(0).toUpperCase() + template.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preview Resume</Text>
        <TouchableOpacity
          onPress={exportPDF}
          style={styles.exportButton}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#2C3E50" size="small" />
          ) : (
            <Text style={styles.exportButtonText}>Export</Text>
          )}
        </TouchableOpacity>
      </View>

      <TemplateSelector />

      <View style={styles.previewContainer}>
        <WebView
          source={{ html }}
          style={styles.webview}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          originWhitelist={["*"]}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#2C3E50",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  exportButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 80,
    alignItems: "center",
  },
  exportButtonText: {
    color: "#2C3E50",
    fontWeight: "600",
  },
  templateSelector: {
    padding: 20,
    gap: 10,
  },
  templateOption: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginRight: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedTemplate: {
    borderColor: "#2C3E50",
    backgroundColor: "#2C3E50",
  },
  templateText: {
    color: "#2C3E50",
    fontWeight: "500",
  },
  selectedTemplateText: {
    color: "#fff",
  },
  previewContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    padding: 10,
  },
  webview: {
    flex: 1,
    borderRadius: 20,
  },
  templateSelectorContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
