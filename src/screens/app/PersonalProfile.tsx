import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  View,
  Modal,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  FlatList,
} from "react-native";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { useResumeStore } from "@/src/store/resumeStore";
import SafeView from "@/src/components/global/SafeView";
import { COLORS, FONTS } from "@/src/constants/theme";
import AppButton from "@/src/components/global/AppButton";
import GradientBackground from "@/src/components/global/GradientBackground";
import AppTextInput from "@/src/components/global/AppTextInput";

// Validation Schema
const PersonalInfoSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
      "Invalid phone number"
    ),
  about: Yup.string().max(500, "About section must be at most 500 characters"),
});

type PersonalInfoFormData = {
  name: string;
  email: string;
  phone: string;
  about: string;
};

const PersonalProfile: React.FC = () => {
  const navigation = useNavigation();
  const { personalInfo, updatePersonalInfo, summaries } = useResumeStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [tempPhoto, setTempPhoto] = useState<string | null>(
    personalInfo.photo || null
  );
  const [showSummarySelection, setShowSummarySelection] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<PersonalInfoFormData>({
    resolver: yupResolver(PersonalInfoSchema),
    defaultValues: {
      name: personalInfo.name || "",
      email: personalInfo.email || "",
      phone: personalInfo.phone || "",
      about: personalInfo.about || "",
    },
  });

  const aboutValue = watch("about"); // Get the current value of the "about" field

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Camera roll permissions are required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setTempPhoto(result.assets[0].uri);
    }
  };

  const onSubmit = (data: PersonalInfoFormData) => {
    console.log("Form submitted:", data); // Debugging log
    updatePersonalInfo({ ...data, photo: tempPhoto });
    setModalVisible(false);
  };

  const openEditForm = () => {
    setTempPhoto(personalInfo.photo);
    setModalVisible(true);
  };

  const closeModal = () => {
    reset();
    setTempPhoto(personalInfo.photo);
    setModalVisible(false);
    setShowSummarySelection(false); // Reset summary selection view
  };

  const handleSummarySelect = (summary: {
    id: string;
    title: string;
    summary: string;
  }) => {
    setValue("about", summary.summary); // Update the "about" field with the selected summary
    setShowSummarySelection(false); // Close the summary selection view
  };

  const hasPersonalInfo =
    personalInfo.name ||
    personalInfo.email ||
    personalInfo.phone ||
    personalInfo.about;

  const profileImage =
    typeof personalInfo.photo === "string" && personalInfo.photo
      ? { uri: personalInfo.photo }
      : require("@/assets/images/hobby.png");

  return (
    <SafeView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={COLORS.primary}
            />
          </Pressable>
          <Text style={styles.headerTitle}>Personal Profile</Text>
          {hasPersonalInfo && (
            <Pressable onPress={openEditForm}>
              <MaterialCommunityIcons
                name="pencil"
                size={24}
                color={COLORS.primary}
              />
            </Pressable>
          )}
        </View>

        {/* Profile Content */}
        {hasPersonalInfo ? (
          <View style={styles.profileCard}>
            <View style={styles.profileImageContainer}>
              <Image source={profileImage} style={styles.profileCardImage} />
            </View>

            <View style={styles.profileInfoContainer}>
              <View style={styles.profileInfoRow}>
                <MaterialCommunityIcons
                  name="account"
                  size={20}
                  color={COLORS.primary}
                />
                <Text style={styles.profileInfoText}>{personalInfo.name}</Text>
              </View>

              <View style={styles.profileInfoRow}>
                <MaterialCommunityIcons
                  name="email"
                  size={20}
                  color={COLORS.primary}
                />
                <Text style={styles.profileInfoText}>{personalInfo.email}</Text>
              </View>

              <View style={styles.profileInfoRow}>
                <MaterialCommunityIcons
                  name="phone"
                  size={20}
                  color={COLORS.primary}
                />
                <Text style={styles.profileInfoText}>{personalInfo.phone}</Text>
              </View>

              <View style={styles.profileAboutContainer}>
                <MaterialCommunityIcons
                  name="information"
                  size={20}
                  color={COLORS.primary}
                />
                <Pressable onPress={() => setShowSummarySelection(true)}>
                  <Text style={styles.profileAboutText} numberOfLines={3}>
                    {aboutValue || "Write about yourself..."}
                  </Text>
                </Pressable>
              </View>
            </View>

            <AppButton
              title="Edit Profile"
              onPress={openEditForm}
              style={styles.editProfileButton}
            />
          </View>
        ) : (
          <View style={styles.emptyProfile}>
            <Image
              source={require("@/assets/images/hobby.png")}
              style={styles.emptyImage}
              resizeMode="contain"
            />
            <Text style={styles.emptyText}>Profile Not Set Up</Text>
            <AppButton
              title="Create Profile"
              onPress={openEditForm}
              style={styles.createButton}
            />
          </View>
        )}

        {/* Edit Profile Modal */}
        <Modal visible={modalVisible} animationType="slide" transparent={false}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalContainer}
          >
            <ScrollView contentContainerStyle={styles.modalScrollContent}>
              {/* Form Fields */}
              {!showSummarySelection ? (
                <>
                  {/* Image Upload Section */}
                  <View style={styles.modalImageContainer}>
                    <Image
                      source={
                        tempPhoto
                          ? { uri: tempPhoto }
                          : require("@/assets/images/hobby.png")
                      }
                      style={styles.modalImage}
                    />
                    <Pressable
                      style={styles.editPhotoButton}
                      onPress={pickImage}
                    >
                      <GradientBackground />
                      <Entypo name="edit" size={14} color="white" />
                    </Pressable>
                  </View>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                      <AppTextInput
                        title="Your Name"
                        placeholder="Kami Williams"
                        icon="account"
                        defaultValue={value}
                        onChangeText={onChange}
                        error={errors.name?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                      <AppTextInput
                        title="Your Email"
                        placeholder="kami@gmail.com"
                        icon="email"
                        defaultValue={value}
                        onChangeText={onChange}
                        error={errors.email?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="phone"
                    render={({ field: { onChange, value } }) => (
                      <AppTextInput
                        title="Phone Number"
                        placeholder="+923036861918"
                        icon="phone"
                        defaultValue={value}
                        onChangeText={onChange}
                        error={errors.phone?.message}
                      />
                    )}
                  />
                  <Pressable onPress={() => setShowSummarySelection(true)}>
                    <View style={styles.aboutInputContainer}>
                      <Text style={styles.aboutInputLabel}>About You</Text>
                      <Text style={styles.aboutInputText}>
                        {aboutValue || "Tap to add a summary..."}
                      </Text>

                      <Text style={styles.select}>Select</Text>
                    </View>
                  </Pressable>

                  {/* Buttons */}
                  <View style={styles.modalButtonContainer}>
                    <AppButton
                      title="Save"
                      onPress={handleSubmit(onSubmit)}
                      style={styles.saveButton}
                    />
                  </View>
                </>
              ) : (
                // Summary Selection View
                <View style={styles.summarySelectionContainer}>
                  <Pressable onPress={() => setShowSummarySelection(false)}>
                    <Entypo name="circle-with-cross" size={24} color="black" />
                  </Pressable>

                  <Text style={styles.titleAboutMe}>Select About Me</Text>
                  {summaries.length > 0 ? (
                    <>
                      <FlatList
                        data={summaries}
                        keyExtractor={(item) => item.summary}
                        renderItem={({ item }) => (
                          <Pressable
                            style={styles.summaryItem}
                            onPress={() => handleSummarySelect(item)}
                          >
                            <Text style={styles.summaryTitle}>
                              {item.title}
                            </Text>
                            <Text style={styles.summaryText}>
                              {item.summary}
                            </Text>
                          </Pressable>
                        )}
                      />
                      <AppButton
                        title="Back"
                        onPress={() => setShowSummarySelection(false)}
                        style={styles.backButton}
                      />
                    </>
                  ) : (
                    <View style={styles.nothingSummary}>
                      <Image
                        source={require("@/assets/images/hobby.png")}
                        resizeMode="contain"
                        style={{ width: 220, height: 220, alignSelf: "center" }}
                      />
                      <Text style={styles.nothingText}>No Summaries Yet</Text>
                      <AppButton
                        title="Add One First"
                        onPress={() => {
                          setModalVisible(false);
                          navigation.navigate("mSummary");
                        }}
                        style={{
                          paddingVertical: Platform.OS === "android" ? 10 : 10,
                          marginTop: 15,
                        }}
                      />
                    </View>
                  )}
                </View>
              )}
            </ScrollView>
            {!showSummarySelection && (
              <Pressable
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Entypo name="circle-with-cross" size={24} color="white" />
                <GradientBackground />
              </Pressable>
            )}
          </KeyboardAvoidingView>
        </Modal>
      </ScrollView>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: FONTS.medium,
    textAlign: "center",
    flex: 1,
  },
  profileCard: {
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 16,
    marginVertical: 16,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  profileCardImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  profileInfoContainer: {
    marginBottom: 16,
  },
  profileInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  profileInfoText: {
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.gray,
    flex: 1,
  },
  profileAboutContainer: {
    flexDirection: "row",
    alignItems: "start",
    paddingHorizontal: 8,
    marginTop: 8,
  },
  profileAboutText: {
    marginLeft: 10,
    fontSize: 14,
    color: COLORS.gray,
    flex: 1,
  },
  editProfileButton: {
    marginTop: 8,
    alignSelf: "center",
    width: "100%",
  },
  emptyProfile: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  emptyImage: {
    width: 256,
    height: 256,
    marginBottom: 24,
  },
  emptyText: {
    fontSize: 20,
    fontFamily: FONTS.medium,
    color: COLORS.gray,
    marginBottom: 16,
  },
  createButton: {
    width: 256,
  },
  modalContainer: {
    flex: 1,
    paddingTop: 80,
  },
  modalScrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  modalImageContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  modalImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
    marginBottom: 16,
  },
  editPhotoButton: {
    position: "absolute",
    bottom: 10,
    right: "41%",
    borderRadius: 50,
    padding: 4,
    overflow: "hidden",
  },
  aboutInputContainer: {
    marginBottom: 16,
  },
  aboutInputLabel: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    marginBottom: 8,
  },
  aboutInputText: {
    fontSize: 14,
    color: COLORS.gray,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 8,
    paddingRight: 50,
  },
  modalButtonContainer: {
    marginTop: 24,
    gap: 12,
    marginBottom: 24,
  },
  saveButton: {
    // Specific styling for save button if needed
  },
  closeButton: {
    position: "absolute",
    top: 70,
    left: 20,
    padding: 5,
    overflow: "hidden",
    borderRadius: 50,
  },
  summarySelectionContainer: {
    flex: 1,
    padding: 16,
  },
  summaryItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    borderRadius: 10,
  },
  summaryTitle: {
    fontSize: 18,
    fontFamily: FONTS.medium,
    textAlign: "center",
    marginBottom: 15,
  },
  summaryText: {
    fontSize: 14,
    color: "#666",
  },
  backButton: {
    marginTop: 16,
  },
  titleAboutMe: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: FONTS.bold,
    marginBottom: 30,
  },
  nothingText: {
    textAlign: "center",
    fontSize: 22,
    fontFamily: FONTS.bold,
  },
  select: {
    textDecorationLine: "underline",
    position: "absolute",
    right: 10,
    top: "50%",
    color: COLORS.secondary,
    fontFamily: FONTS.bold,
  },
});

export default PersonalProfile;
