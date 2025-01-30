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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "@/src/constants/theme";
import { useNavigation } from "@react-navigation/native";
import AppButton from "@/src/components/global/AppButton";
import AppTextInput from "@/src/components/global/AppTextInput";
import GradientBackground from "@/src/components/global/GradientBackground";
import { useResumeStore } from "@/src/store/resumeStore";

const schema = yup.object().shape({
  organizationName: yup.string().required("Organization Name is required"),
  designation: yup.string().required("Designation is required"),
  dateFrom: yup.string().required("Start Date is required"),
  dateTo: yup.string().required("End Date is required"),
  roleInDesignation: yup.string().required("Role is required"),
});

const WorkExperience: React.FC = () => {
  const navigation = useNavigation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const addExperience = useResumeStore((state) => state.addExperience);
  const experiences = useResumeStore((state) => state.experiences);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      organizationName: "",
      designation: "",
      dateFrom: "",
      dateTo: "",
      roleInDesignation: "",
    },
  });

  const handleExperienceSave = (data) => {
    addExperience(data);
    reset();
    setIsOpenModal(false);
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
                  <Text style={styles.organizationName}>
                    {item.organizationName}
                  </Text>
                </View>
                <View style={styles.spacer} />
                <View style={styles.section}>
                  <Text style={styles.heading}>Designation:</Text>
                  <Text style={styles.text}>{item.designation}</Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.heading}>Role:</Text>
                  <Text style={styles.text}>{item.roleInDesignation}</Text>
                </View>
                <View style={styles.spacer} />
                <View style={styles.section}>
                  <Text style={styles.heading}>Time:</Text>
                  <View style={styles.row}>
                    <Text style={styles.text}>{item.dateFrom}</Text>
                    <Text style={styles.text}> - </Text>
                    <Text style={styles.text}>{item.dateTo}</Text>
                  </View>
                </View>
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
            name="organizationName"
            render={({ field: { onChange, value } }) => (
              <AppTextInput
                placeholder="Enter Organization Name"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.organizationName?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="designation"
            render={({ field: { onChange, value } }) => (
              <AppTextInput
                placeholder="Enter Designation"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.designation?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="dateFrom"
            render={({ field: { onChange, value } }) => (
              <AppTextInput
                placeholder="From Date"
                value={value}
                onChangeText={onChange}
                icon="calendar"
                errorMessage={errors.dateFrom?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="dateTo"
            render={({ field: { onChange, value } }) => (
              <AppTextInput
                placeholder="To Date"
                value={value}
                onChangeText={onChange}
                icon="calendar"
                errorMessage={errors.dateTo?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="roleInDesignation"
            render={({ field: { onChange, value } }) => (
              <AppTextInput
                placeholder="Enter Role"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.roleInDesignation?.message}
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
  absolute: {
    position: "absolute",
    top: 60,
    left: 20,
  },
  dataContainer: {
    marginTop: 30,
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
});
