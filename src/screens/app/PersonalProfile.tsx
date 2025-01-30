import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
} from "react-native";
import SafeView from "@/src/components/global/SafeView";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "@/src/constants/theme";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useResumeStore } from "@/src/store/resumeStore";
import { useForm, Controller } from "react-hook-form";
import AppTextInput from "@/src/components/global/AppTextInput";
import AppButton from "@/src/components/global/AppButton";
import GradientBackground from "@/src/components/global/GradientBackground";

const PersonalProfile = () => {
  const navigation = useNavigation();
  const { personalInfo, updatePersonalInfo } = useResumeStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [tempPhoto, setTempPhoto] = useState(personalInfo.photo || null);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: personalInfo,
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setTempPhoto(result.assets[0].uri);
    }
  };

  const onSubmit = (data) => {
    updatePersonalInfo({ ...data, photo: tempPhoto });
    setModalVisible(false);
  };

  const openEditForm = () => {
    setTempPhoto(personalInfo.photo);
    setModalVisible(true);
  };

  const closeModal = () => {
    setTempPhoto(personalInfo.photo);
    setModalVisible(false);
  };

  const hasPersonalInfo =
    personalInfo.name ||
    personalInfo.email ||
    personalInfo.phone ||
    personalInfo.about;

  return (
    <SafeView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
          </Pressable>
          <Text numberOfLines={1} adjustsFontSizeToFit style={styles.title}>
            Personal Information
          </Text>
          {hasPersonalInfo && (
            <Pressable onPress={openEditForm}>
              <MaterialCommunityIcons name="pencil" size={24} color="black" />
            </Pressable>
          )}
        </View>

        {hasPersonalInfo ? (
          <>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri:
                    personalInfo.photo || require("@/assets/images/hobby.png"),
                }}
                style={styles.image}
              />
              <AppButton
                title="Update Profile"
                onPress={openEditForm}
                containerStyle={styles.changePhotoBtn}
              />
            </View>
            <Text style={styles.name}>{personalInfo.name}</Text>
            <Text style={styles.info}>{personalInfo.email}</Text>
            <Text style={styles.info}>{personalInfo.phone}</Text>
            <Text style={styles.info}>{personalInfo.about}</Text>
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Image
              source={require("@/assets/images/hobby.png")}
              style={styles.emptyImage}
              resizeMode="contain"
            />
            <Text style={styles.emptyText}>Profile not yet set</Text>
            <AppButton
              title="Update Profile"
              onPress={openEditForm}
              containerStyle={styles.updateBtn}
            />
          </View>
        )}

        {/* Modal for Editing Profile */}
        <Modal visible={modalVisible} animationType="slide">
          <SafeView style={styles.modalContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalImageContainer}>
                <Image
                  source={{
                    uri: tempPhoto || require("@/assets/images/hobby.png"),
                  }}
                  style={styles.modalImage}
                />

                <Pressable style={styles.absolute} onPress={pickImage}>
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
                    value={value}
                    onChangeText={onChange}
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
                    value={value}
                    onChangeText={onChange}
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
                    value={value}
                    onChangeText={onChange}
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
                    value={value}
                    onChangeText={onChange}
                    multiline
                    numberOfLines={4}
                  />
                )}
              />
              <View style={styles.btnContainer}>
                <AppButton title="Save" onPress={handleSubmit(onSubmit)} />
                <AppButton title="Cancel" onPress={closeModal} />
              </View>
            </ScrollView>
          </SafeView>
        </Modal>
      </ScrollView>
    </SafeView>
  );
};

export default PersonalProfile;

const styles = StyleSheet.create({
  absolute: {
    borderRadius: "50%",
    padding: 4,
    overflow: "hidden",
    position: "absolute",
    bottom: 10,
    right: "41%",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontFamily: FONTS.medium,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    marginBottom: 10,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  name: {
    fontFamily: FONTS.medium,
    fontSize: 20,
    textAlign: "center",
  },
  info: {
    textAlign: "center",
    fontSize: 16,
    color: COLORS.gray,
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  btnContainer: {
    marginTop: 20,
    gap: 10,
    marginBottom: 20,
  },
  modalImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  modalImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  selectPhotoBtn: {
    width: 200,
  },
  changePhotoBtn: {
    width: 150,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: FONTS.medium,
    color: COLORS.gray,
    marginBottom: 20,
  },
  updateBtn: {
    width: 200,
  },
});
