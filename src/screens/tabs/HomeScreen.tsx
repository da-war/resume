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
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
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

const HomeScreen = () => {
  const [searchText, setSearchText] = React.useState("");
  const navigation = useNavigation();
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
              onChangeText={(text) => setSearchText(text)}
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
              <Image
                source={item.image}
                style={{ width: 100, height: 140, marginRight: 10 }}
                resizeMode="contain"
              />
            )}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitleTwo}>Recently Created</Text>
          <FlatList
            data={resumes}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 10 }}
            columnWrapperStyle={{ justifyContent: "space-around" }}
            numColumns={2}
            renderItem={({ item }) => (
              <Pressable onPress={() => navigation.navigate("preview")}>
                <Image
                  source={item.image}
                  style={{
                    width: screenWidth / 2.4,
                    height: screenHeight / 4,
                    marginRight: 10,
                    marginBottom: 10,
                    ...SHADOWS.medium,
                  }}
                  resizeMode="contain"
                />
              </Pressable>
            )}
          />
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  absoluteIcon: {
    position: "absolute",
    right: 10,
    top: "25%",
    bottom: 0,
  },
  container: {
    paddingHorizontal: 20,
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
    marginHorizontal: -20,
    marginVertical: 20,
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
});
