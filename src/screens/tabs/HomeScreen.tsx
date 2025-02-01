import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SafeView from "@/src/components/global/SafeView";
import {
  COLORS,
  FONTS,
  screenHeight,
  screenWidth,
  SHADOWS,
} from "@/src/constants/theme";
import GradientBackground from "@/src/components/global/GradientBackground";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { resumes } from "@/src/constants/data";
import { useNavigation } from "@react-navigation/native";

const TEMPLATE_HISTORY_KEY = "template_history";

// Define template mapping
const TEMPLATE_TYPES = {
  1: "modern",
  2: "minimal",
  3: "creative",
};

const TEMPLATE_IDS = {
  modern: 1,
  minimal: 2,
  creative: 3,
};

const HomeScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [recentTemplates, setRecentTemplates] = useState([]);
  const navigation = useNavigation();

  // useEffect(() => {
  //   loadRecentTemplates();
  // }, []);

  // useEffect(() => {
  //   deleteAsync();
  // }, []);

  const deleteAsync = async () => {
    await AsyncStorage.removeItem("resume-storage");
  };

  const loadRecentTemplates = async () => {
    try {
      const history = await AsyncStorage.getItem(TEMPLATE_HISTORY_KEY);
      if (history) {
        const templates = JSON.parse(history);
        setRecentTemplates(templates);
      }
    } catch (error) {
      console.error("Error loading recent templates:", error);
    }
  };

  const navigateToPreview = (templateIdOrName) => {
    // If it's already a template name (string)
    if (typeof templateIdOrName === "string") {
      navigation.navigate("preview", {
        initialTemplate: templateIdOrName.toLowerCase(),
      });
    }
    // If it's a template ID (number)
    else {
      const templateType = TEMPLATE_TYPES[templateIdOrName];
      if (templateType) {
        navigation.navigate("preview", {
          initialTemplate: templateType,
        });
      }
    }
  };

  const RecentTemplateItem = ({ item }) => (
    <Pressable
      onPress={() => navigateToPreview(item.template)}
      style={styles.recentTemplateItem}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.recentTemplateImage}
        resizeMode="contain"
      />
      <View style={styles.recentTemplateInfo}>
        <Text style={styles.templateName}>
          {item.template.charAt(0).toUpperCase() + item.template.slice(1)}
        </Text>
        <Text style={styles.templateDate}>
          {new Date(item.timestamp).toLocaleDateString()}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <SafeView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image
            source={require("@/assets/icons/crown.png")}
            resizeMode="contain"
            style={styles.crownIcon}
          />
          <Text style={styles.headerTitle}>Resume Maker</Text>
          <View style={styles.rightIcon}>
            <View style={styles.iconContainer}>
              <Image
                source={require("@/assets/icons/app.png")}
                resizeMode="contain"
                style={styles.appIcon}
              />
            </View>
            <GradientBackground />
          </View>
        </View>

        <View style={styles.textInputContainer}>
          <GradientBackground />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search for resume templates"
            />
            <TouchableOpacity style={styles.absoluteIcon}>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={COLORS.black}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.recommendedContainer}>
          <View style={styles.recommendedHeader}>
            <Text style={styles.headerTitleTwo}>Recommended</Text>
            <Text style={styles.viewAllText}>view All</Text>
          </View>
          <FlatList
            data={resumes}
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingVertical: 10 }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => navigateToPreview(item.id)}
                style={styles.recommendedItemContainer}
              >
                <Image
                  source={item.image}
                  style={styles.recommendedImage}
                  resizeMode="contain"
                />
                <Text style={styles.recommendedTemplateName}>
                  {TEMPLATE_TYPES[item.id].charAt(0).toUpperCase() +
                    TEMPLATE_TYPES[item.id].slice(1)}
                </Text>
              </Pressable>
            )}
          />
        </View>

        <View style={styles.recentContainer}>
          <Text style={styles.headerTitleTwo}>Recently Created</Text>
          {recentTemplates.length > 0 ? (
            <FlatList
              data={recentTemplates}
              keyExtractor={(item) => item.timestamp}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 10 }}
              columnWrapperStyle={{ justifyContent: "space-around" }}
              numColumns={2}
              renderItem={({ item }) => <RecentTemplateItem item={item} />}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No recent resumes</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  recommendedItemContainer: {
    alignItems: "center",
    marginRight: 20,
  },
  recommendedImage: {
    width: 100,
    height: 140,
    borderRadius: 10,
    marginBottom: 8,
  },
  recommendedTemplateName: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.black,
    textAlign: "center",
  },
  container: {
    paddingHorizontal: 20,
  },
  absoluteIcon: {
    position: "absolute",
    right: 10,
    top: "25%",
    bottom: 0,
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    borderRadius: 10,
    justifyContent: "center",
  },
  input: {
    padding: 10,
    color: COLORS.black,
    fontFamily: FONTS.regular,
  },
  crownIcon: {
    width: 30,
    height: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: FONTS.bold,
  },
  rightIcon: {
    width: 32,
    height: 32,
    overflow: "hidden",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  appIcon: {
    width: 15,
    height: 15,
  },
  textInputContainer: {
    marginTop: 20,
    height: 50,
    borderRadius: 10,
    overflow: "hidden",
    padding: 1,
  },
  recommendedContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.background,
    marginVertical: 20,
    borderRadius: 10,
  },
  recommendedHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  viewAllText: {
    fontFamily: FONTS.medium,
    color: COLORS.secondary,
  },
  headerTitleTwo: {
    fontSize: 18,
    fontFamily: FONTS.semiBold,
  },
  recentContainer: {
    flex: 1,
    marginBottom: 20,
  },
  recentTemplateItem: {
    width: screenWidth / 2.4,
    marginBottom: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    ...SHADOWS.medium,
  },
  recentTemplateImage: {
    width: "100%",
    height: screenHeight / 4,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  recentTemplateInfo: {
    padding: 10,
  },
  templateName: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.black,
  },
  templateDate: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 4,
  },
  emptyContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontFamily: FONTS.medium,
    color: COLORS.gray,
    fontSize: 16,
  },
});
