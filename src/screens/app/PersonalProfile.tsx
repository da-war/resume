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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "@/src/constants/theme";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useResumeStore } from "@/src/store/resumeStore";
import { useForm, Controller } from "react-hook-form";
import AppTextInput from "@/src/components/global/AppTextInput";
import AppButton from "@/src/components/global/AppButton";

const PersonalProfile = () => {
  const navigation = useNavigation();
  const { personalInfo, updatePersonalInfo } = useResumeStore();
  const [modalVisible, setModalVisible] = useState(false);
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
      updatePersonalInfo({ ...personalInfo, photo: result.assets[0].uri });
    }
  };

  const onSubmit = (data) => {
    updatePersonalInfo(data);
    setModalVisible(false);
  };

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
          <Pressable onPress={() => setModalVisible(true)}>
            <MaterialCommunityIcons name="pencil" size={24} color="black" />
          </Pressable>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: personalInfo.photo || "https://via.placeholder.com/100",
            }}
            style={styles.image}
          />
          <Pressable style={styles.absolute} onPress={pickImage}>
            <MaterialCommunityIcons
              name="pencil"
              size={20}
              color={COLORS.white}
            />
          </Pressable>
        </View>
        <Text style={styles.name}>{personalInfo.name || "Your Name"}</Text>
        <Text style={styles.info}>{personalInfo.email}</Text>
        <Text style={styles.info}>{personalInfo.phone}</Text>
        <Text style={styles.info}>{personalInfo.about}</Text>

        {/* Modal for Editing Profile */}
        <Modal visible={modalVisible} animationType="slide">
          <SafeView style={styles.modalContainer}>
            <ScrollView>
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
                  />
                )}
              />
              <View style={styles.btnContainer}>
                <AppButton title="Save" onPress={handleSubmit(onSubmit)} />
                <AppButton
                  title="Cancel"
                  onPress={() => setModalVisible(false)}
                />
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
  container: { flex: 1, padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 18, fontFamily: FONTS.medium },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  absolute: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 5,
  },
  name: { fontFamily: FONTS.medium, fontSize: 20, textAlign: "center" },
  info: { textAlign: "center", fontSize: 16, color: COLORS.gray },
  modalContainer: { flex: 1, padding: 20, paddingTop: 100 },
  btnContainer: { marginTop: 20, gap: 10 },
});
