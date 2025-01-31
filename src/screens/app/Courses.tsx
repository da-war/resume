import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Modal,
  StyleSheet,
  Pressable,
  Image,
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

const courseSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  dateFrom: yup.string().required("Start date is required"),
  dateTo: yup.string().required("End date is required"),
  courseFrom: yup.string().required("Course provider is required"),
});

type CourseFormData = {
  title: string;
  dateFrom: string;
  dateTo: string;
  courseFrom: string;
};

const Courses: React.FC = ({ navigation }) => {
  const { courses, addCourse, removeCourse } = useResumeStore();
  const [isModalVisible, setModalVisible] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: yupResolver(courseSchema),
    defaultValues: {
      title: "",
      dateFrom: "",
      dateTo: "",
      courseFrom: "",
    },
  });

  const onSubmit = (data: CourseFormData) => {
    addCourse(data);
    setModalVisible(false);
    reset();
  };

  const handleDelete = (id: string) => {
    removeCourse(id);
  };

  return (
    <SafeView style={styles.mainContainer}>
      <Text style={styles.title}>Courses</Text>
      <Pressable onPress={() => navigation.goBack()} style={styles.absolute}>
        <MaterialCommunityIcons
          name="arrow-left"
          color={COLORS.black}
          size={28}
        />
      </Pressable>

      {courses.length < 1 ? (
        <View style={styles.imageLoad}>
          <Image
            source={require("@/assets/images/hobby.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      ) : (
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.courseBox}>
              <View style={styles.section}>
                <View style={styles.iconContainer}>
                  <GradientBackground />
                  <Image
                    source={require("@/assets/icons/education.png")}
                    style={styles.icon}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.organizationName}>{item.courseFrom}</Text>
              </View>
              <View style={styles.spacer} />
              <View style={styles.section}>
                <Text style={styles.heading}>Course:</Text>
                <Text style={styles.text}>{item.title}</Text>
              </View>
              <View style={styles.spacer} />
              <View style={styles.section}>
                <Text style={styles.heading}>Duration:</Text>
                <View style={styles.row}>
                  <Text style={styles.text}>
                    {item.dateFrom} - {item.dateTo}
                  </Text>
                </View>
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
          <Text style={[styles.title, { marginBottom: 40 }]}>Add Course</Text>

          <Controller
            control={control}
            name="courseFrom"
            render={({ field: { onChange, value } }) => (
              <AppTextInput
                title="Institution Name"
                placeholder="Enter Institution Name"
                defaultValue={value}
                onChangeText={onChange}
                autoCapitalize="words"
                autoCorrect={false}
              />
            )}
          />

          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <AppTextInput
                title="Course Title"
                placeholder="Enter Course Title"
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
                placeholder="Enter Start Date (e.g., 2023)"
                defaultValue={value}
                onChangeText={onChange}
                icon="calendar"
                autoCorrect={false}
                keyboardType="numeric"
              />
            )}
          />

          <Controller
            control={control}
            name="dateTo"
            render={({ field: { onChange, value } }) => (
              <AppTextInput
                title="End Date"
                placeholder="Enter End Date (e.g., 2024 or Present)"
                defaultValue={value}
                onChangeText={onChange}
                icon="calendar"
                autoCorrect={false}
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
  courseBox: {
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
});

export default Courses;
