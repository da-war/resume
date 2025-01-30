// screens/PreviewScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import { WebView } from "react-native-webview";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { templates } from "@/src/constants/data";

// Dummy data for demonstration
const dummyData = {
  personalInfo: {
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    phone: "+1 (555) 123-4567",
    photo: "https://i.pravatar.cc/300",
    about:
      "Passionate and creative full-stack developer with 5+ years of experience building scalable web and mobile applications. Specialized in React Native and Node.js ecosystem. Committed to writing clean, maintainable code and mentoring junior developers.",
  },
  experiences: [
    {
      company: "Tech Innovators Inc.",
      position: "Senior Mobile Developer",
      date: "2021 - Present",
      description:
        "Led the development of multiple high-profile mobile applications, improving team productivity by 40% through implementation of modern development practices. Mentored junior developers and established code review processes.",
    },
    {
      company: "Digital Solutions Ltd.",
      position: "Full Stack Developer",
      date: "2019 - 2021",
      description:
        "Developed and maintained multiple client projects using React Native, Node.js, and AWS infrastructure. Implemented CI/CD pipelines reducing deployment time by 50%.",
    },
    {
      company: "StartUp Vision",
      position: "Junior Developer",
      date: "2018 - 2019",
      description:
        "Worked on front-end development using React and React Native. Contributed to the development of 3 successful mobile applications.",
    },
  ],
  skills: [
    "React Native",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Redux",
    "AWS",
    "GraphQL",
    "MongoDB",
    "Docker",
    "CI/CD",
    "Git",
    "REST APIs",
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "Spanish", level: "Professional" },
    { name: "Mandarin", level: "Conversational" },
  ],
  hobbies: [
    "Open Source Contributing",
    "Technical Writing",
    "Music Production",
    "Rock Climbing",
    "Photography",
  ],
  achievements: [
    "Led development of an app with 1M+ downloads on App Store and Play Store",
    "Reduced app load time by 60% through optimization and lazy loading",
    "Featured speaker at React Native Conference 2023",
    "Published 3 npm packages with 10k+ combined downloads",
    "Awarded 'Developer of the Year 2022' at Tech Innovators Inc.",
    "Contributed to major open source React Native libraries",
  ],
};

export default function PreviewScreen({ navigation }) {
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [loading, setLoading] = useState(false);
  const [html, setHtml] = useState("");

  useEffect(() => {
    setHtml(templates[selectedTemplate](dummyData));
  }, [selectedTemplate]);

  const exportPDF = async () => {
    try {
      setLoading(true);
      const { uri } = await Print.printToFileAsync({
        html,
        base64: false,
      });

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
    <View
      style={{ height: 100, justifyContent: "center", alignItems: "center" }}
    >
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

      {/* Header */}
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

      {/* Template Selector */}
      <TemplateSelector />

      {/* Preview */}
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
});
