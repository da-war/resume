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

// Components

// Stores and Styles

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
  const { personalInfo, updatePersonalInfo } = useResumeStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [tempPhoto, setTempPhoto] = useState<string | null>(
    personalInfo.photo || null
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PersonalInfoFormData>({
    resolver: yupResolver(PersonalInfoSchema),
    defaultValues: {
      name: personalInfo.name || "",
      email: personalInfo.email || "",
      phone: personalInfo.phone || "",
      about: personalInfo.about || "",
    },
  });

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
                <Text style={styles.profileAboutText} numberOfLines={3}>
                  {personalInfo.about}
                </Text>
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
                <Pressable style={styles.editPhotoButton} onPress={pickImage}>
                  <GradientBackground />
                  <Entypo name="edit" size={14} color="white" />
                </Pressable>
              </View>

              {/* Form Fields */}
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
              <Controller
                control={control}
                name="about"
                render={({ field: { onChange, value } }) => (
                  <AppTextInput
                    title="About You"
                    placeholder="Write about yourself..."
                    icon="information"
                    defaultValue={value}
                    onChangeText={onChange}
                    multiline
                    numberOfLines={4}
                    error={errors.about?.message}
                  />
                )}
              />

              {/* Buttons */}
              <View style={styles.modalButtonContainer}>
                <AppButton
                  title="Save"
                  onPress={handleSubmit(onSubmit)}
                  style={styles.saveButton}
                />
                <AppButton
                  title="Cancel"
                  onPress={closeModal}
                  style={styles.cancelButton}
                />
              </View>
            </ScrollView>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Entypo name="circle-with-cross" size={24} color="white" />
              <GradientBackground />
            </Pressable>
          </KeyboardAvoidingView>
        </Modal>
      </ScrollView>
    </SafeView>
  );
};

const styles = StyleSheet.create({
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
  profileContent: {
    alignItems: "center",
    marginTop: 24,
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 2,
    borderColor: COLORS.secondary,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    marginBottom: 8,
  },
  profileEmail: {
    fontSize: 18,
    color: COLORS.gray,
    marginBottom: 4,
  },
  profilePhone: {
    fontSize: 18,
    color: COLORS.gray,
    marginBottom: 4,
  },
  profileAbout: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  editButton: {
    width: 256,
    marginTop: 16,
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
  modalButtonContainer: {
    marginTop: 24,
    gap: 12,
    marginBottom: 24,
  },
  saveButton: {
    // Specific styling for save button if needed
  },
  cancelButton: {
    // Specific styling for cancel button if needed
  },
  closeButton: {
    position: "absolute",
    top: 70,
    left: 20,
    padding: 5,
    overflow: "hidden",
    borderRadius: 50,
  },
});

export default PersonalProfile;
