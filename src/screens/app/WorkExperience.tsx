import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SafeView from "@/src/components/global/SafeView";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "@/src/constants/theme";
import { useNavigation } from "@react-navigation/native";
import AppButton from "@/src/components/global/AppButton";
import AppTextInput from "@/src/components/global/AppTextInput";
import GradientBackground from "@/src/components/global/GradientBackground";
import { useResumeStore } from "@/src/store/resumeStore";

const schema = yup.object().shape({
  company: yup.string().required("Organization Name is required"),
  position: yup.string().required("Designation is required"),
  date: yup.string().required("Start Date is required"),
  description: yup.string().required("Description is required"),
});

const WorkExperience: React.FC = () => {
  const navigation = useNavigation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const addExperience = useResumeStore((state) => state.addExperience);
  const experiences = useResumeStore((state) => state.experiences);
  const deleteExperience = useResumeStore((state) => state.removeExperience);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      company: "",
      position: "",
      date: "",
      description: "",
    },
  });

  const handleExperienceSave = (data: any) => {
    addExperience(data);
    reset();
    setIsOpenModal(false);
  };

  const deleteItem = (item: any) => {
    deleteExperience(item.id);
  };

  return (
    <>
      <SafeView style={styles.mainContainer}>
        <Text style={styles.title}>Work Experiences</Text>
        <Pressable onPress={() => navigation.goBack()} style={styles.absolute}>
          <MaterialCommunityIcons
            name="arrow-left"
            color={COLORS.black}
            size={28}
          />
        </Pressable>
        {experiences.length < 1 ? (
          <View style={styles.imageLoad}>
            <Image
              source={require("@/assets/images/hobby.png")}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        ) : (
          <FlatList
            data={experiences}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.experienceBox}>
                <View style={styles.section}>
                  <View style={styles.iconContainer}>
                    <GradientBackground />
                    <Image
                      source={require("@/assets/icons/company.png")}
                      style={styles.icon}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={styles.organizationName}>{item.company}</Text>
                </View>
                <View style={styles.spacer} />
                <View style={styles.section}>
                  <Text style={styles.heading}>Designation:</Text>
                  <Text style={styles.text}>{item.position}</Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.heading}>Description:</Text>
                  <Text style={styles.text}>{item.description}</Text>
                </View>
                <View style={styles.spacer} />
                <View style={styles.section}>
                  <Text style={styles.heading}>Time:</Text>
                  <View style={styles.row}>
                    <Text style={styles.text}>{item.date}</Text>
                  </View>
                </View>
                <Pressable
                  style={styles.absoluteDelete}
                  onPress={() => deleteItem(item)}
                >
                  <Entypo
                    name="circle-with-cross"
                    size={24}
                    color={COLORS.error}
                  />
                </Pressable>
              </View>
            )}
          />
        )}

        <AppButton title="+ Add" onPress={() => setIsOpenModal(true)} />
      </SafeView>
      <Modal visible={isOpenModal} animationType="slide">
        <View style={{ flex: 1, paddingTop: 100, paddingHorizontal: 20 }}>
          <Text style={[styles.title, { marginBottom: 40 }]}>
            Add Work Experience
          </Text>
          <Controller
            control={control}
            name="company"
            render={({ field: { onChange, value } }) => (
              <AppTextInput
                placeholder="Enter Organization Name"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.company?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="position"
            render={({ field: { onChange, value } }) => (
              <AppTextInput
                placeholder="Enter Designation"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.position?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, value } }) => (
              <AppTextInput
                placeholder="June 2022 - June 2024/Present"
                value={value}
                onChangeText={onChange}
                icon="calendar"
                errorMessage={errors.date?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <AppTextInput
                placeholder="Enter Description"
                value={value}
                multiline
                numberOfLines={3}
                onChangeText={onChange}
                errorMessage={errors.description?.message}
              />
            )}
          />
          <AppButton
            title="Save"
            onPress={handleSubmit(handleExperienceSave)}
          />
        </View>
      </Modal>
    </>
  );
};

export default WorkExperience;

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 60,
    left: 20,
  },
  mainContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: FONTS.semiBold,
    fontSize: 18,
    textAlign: "center",
    marginTop: 5,
  },
  experienceBox: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    marginBottom: 10,
    borderRadius: 15,
  },
  icon: {
    width: 30,
    height: 30,
  },

  dataContainer: {
    marginTop: 30,
  },
  heading: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.black,
  },
  text: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 7,
  },
  organizationName: {
    color: COLORS.secondary,
    fontFamily: FONTS.bold,
    marginTop: 7,
  },
  iconContainer: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    overflow: "hidden",
  },
  sectionContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  spacer: {
    height: 10,
    backgroundColor: COLORS.black,
  },
  absoluteDelete: {
    position: "absolute",
    right: 20,
    top: 20,
  },
});
