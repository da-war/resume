import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Modal,
  StyleSheet,
  Pressable,
  Image,
  Switch,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useResumeStore } from "@/src/store/resumeStore";
import AppButton from "@/src/components/global/AppButton";
import AppTextInput from "@/src/components/global/AppTextInput";
import { COLORS, FONTS } from "@/src/constants/theme";
import SafeView from "@/src/components/global/SafeView";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import GradientBackground from "@/src/components/global/GradientBackground";

const workExperienceSchema = yup.object().shape({
  company: yup.string().required("Company is required"),
  position: yup.string().required("Position is required"),
  dateFrom: yup.string().required("Start date is required"),
  dateTo: yup.string().when("isCurrentEmployment", {
    is: false,
    then: yup.string().required("End date is required"),
  }),
  description: yup.string().required("Job description is required"),
});

type WorkExperienceFormData = {
  company: string;
  position: string;
  dateFrom: string;
  dateTo: string;
  description: string;
  isCurrentEmployment?: boolean;
};

const WorkExperience: React.FC = ({ navigation }) => {
  const { experiences, addExperience, removeExperience } = useResumeStore();
  const [isModalVisible, setModalVisible] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<WorkExperienceFormData>({
    resolver: yupResolver(workExperienceSchema),
    defaultValues: {
      company: "",
      position: "",
      dateFrom: "",
      dateTo: "",
      description: "",
      isCurrentEmployment: false,
    },
  });

  const isCurrentEmployment = watch("isCurrentEmployment");

  const onSubmit = (data: WorkExperienceFormData) => {
    const formattedData = {
      company: data.company,
      position: data.position,
      date: `${data.dateFrom} - ${
        isCurrentEmployment ? "Present" : data.dateTo
      }`,
      description: data.description,
    };
    addExperience(formattedData);
    setModalVisible(false);
    reset();
  };

  const handleDelete = (id: string) => {
    removeExperience(id);
  };

  return (
    <SafeView style={styles.mainContainer}>
      <Text style={styles.title}>Work Experience</Text>
      <Pressable onPress={() => navigation.goBack()} style={styles.absolute}>
        <MaterialCommunityIcons
          name="arrow-left"
          color={COLORS.black}
          size={28}
        />
      </Pressable>

      <View style={{ height: 30 }} />

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
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.experienceBox}>
              <View style={styles.section}>
                <View style={styles.iconContainer}>
                  <GradientBackground />
                  <Image
                    source={require("@/assets/icons/work.png")}
                    style={styles.icon}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.organizationName}>{item.company}</Text>
              </View>
              <View style={styles.spacer} />
              <View style={styles.section}>
                <Text style={styles.heading}>Position:</Text>
                <Text style={styles.text}>{item.position}</Text>
              </View>
              <View style={styles.spacer} />
              <View style={styles.section}>
                <Text style={styles.heading}>Duration:</Text>
                <View style={styles.row}>
                  <Text style={styles.text}>{item.date}</Text>
                </View>
              </View>
              <View style={styles.spacer} />
              <View style={styles.section}>
                <Text style={styles.heading}>Description:</Text>
                <Text style={styles.text}>{item.description}</Text>
              </View>
              <Pressable
                style={styles.absoluteDelete}
                onPress={() => handleDelete(item.id)}
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

      <AppButton title="+ Add" onPress={() => setModalVisible(true)} />

      <Modal visible={isModalVisible} animationType="slide">
        <View style={{ flex: 1, paddingTop: 100, paddingHorizontal: 20 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Pressable onPress={() => setModalVisible(false)}>
              <Entypo name="circle-with-cross" size={24} color="black" />
            </Pressable>
            <Text style={[styles.title, { marginBottom: 40 }]}>
              Add Work Experience
            </Text>

            <Controller
              control={control}
              name="company"
              render={({ field: { onChange, value } }) => (
                <AppTextInput
                  title="Company Name"
                  placeholder="Enter Company Name"
                  defaultValue={value}
                  onChangeText={onChange}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              )}
            />

            <Controller
              control={control}
              name="position"
              render={({ field: { onChange, value } }) => (
                <AppTextInput
                  title="Position"
                  placeholder="Enter Position"
                  defaultValue={value}
                  onChangeText={onChange}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              )}
            />

            <Controller
              control={control}
              name="dateFrom"
              render={({ field: { onChange, value } }) => (
                <AppTextInput
                  title="Start Date"
                  placeholder="Enter Start Date (e.g., 2020)"
                  defaultValue={value}
                  onChangeText={onChange}
                  icon="calendar"
                  autoCorrect={false}
                  keyboardType="numeric"
                />
              )}
            />

            {!isCurrentEmployment && (
              <Controller
                control={control}
                name="dateTo"
                render={({ field: { onChange, value } }) => (
                  <AppTextInput
                    title="End Date"
                    placeholder="Enter End Date (e.g., 2024)"
                    defaultValue={value}
                    onChangeText={onChange}
                    icon="calendar"
                    autoCorrect={false}
                    keyboardType="numeric"
                  />
                )}
              />
            )}

            <View style={styles.checkboxContainer}>
              <Text style={styles.checkboxLabel}>Currently Employed</Text>
              <Controller
                control={control}
                name="isCurrentEmployment"
                render={({ field: { value, onChange } }) => (
                  <Switch
                    value={value}
                    onValueChange={(newValue) => {
                      onChange(newValue);
                      if (newValue) {
                        setValue("dateTo", "");
                      }
                    }}
                    trackColor={{
                      false: COLORS.lightGray,
                      true: COLORS.primary,
                    }}
                    thumbColor={value ? COLORS.white : COLORS.gray}
                  />
                )}
              />
            </View>

            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <AppTextInput
                  title="Job Description"
                  placeholder="Describe your role and responsibilities"
                  defaultValue={value}
                  onChangeText={onChange}
                  multiline
                  numberOfLines={4}
                  style={{ height: 100 }}
                />
              )}
            />

            <AppButton title="Save" onPress={handleSubmit(onSubmit)} />

            <AppButton
              title="Cancel"
              onPress={() => {
                setModalVisible(false);
                reset();
              }}
              isGradient={false}
              textColor={COLORS.primary}
              style={{ borderWidth: 1, marginTop: 10 }}
            />
          </ScrollView>
        </View>
      </Modal>
    </SafeView>
  );
};

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
  imageLoad: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: 200,
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
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  checkboxLabel: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.black,
  },
});

export default WorkExperience;
