import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useResumeStore } from "@/src/store/resumeStore";
import AppButton from "@/src/components/global/AppButton";
import { COLORS, FONTS, SHADOWS } from "@/src/constants/theme";
import SafeView from "@/src/components/global/SafeView";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Define the schema for form validation using Yup
const educationSchema = yup.object().shape({
  degree: yup.string().required("Degree is required"),
  college: yup.string().required("College is required"),
  dateFrom: yup.string().required("Start date is required"),
  dateTo: yup.string().required("End date is required"),
});

type EducationFormData = {
  degree: string;
  college: string;
  dateFrom: string;
  dateTo: string;
};

const Education = ({ navigation }) => {
  const { education, addEducation, updateEducation, removeEducation } =
    useResumeStore();
  const [isModalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { control, handleSubmit, reset, setValue } = useForm<EducationFormData>(
    {
      resolver: yupResolver(educationSchema),
      defaultValues: {
        degree: "",
        college: "",
        dateFrom: "",
        dateTo: "",
      },
    }
  );

  const onSubmit = (data: EducationFormData) => {
    if (editingId) {
      updateEducation(editingId, data);
    } else {
      addEducation(data);
    }
    setModalVisible(false);
    reset();
    setEditingId(null);
  };

  const handleEdit = (id: string) => {
    const item = education.find((edu) => edu.id === id);
    if (item) {
      setValue("degree", item.degree);
      setValue("college", item.college);
      setValue("dateFrom", item.dateFrom);
      setValue("dateTo", item.dateTo);
      setEditingId(id);
      setModalVisible(true);
    }
  };

  const handleDelete = (id: string) => {
    removeEducation(id);
  };

  return (
    <SafeView>
      <View style={styles.container}>
        <Text style={styles.title2}>Education</Text>
        <Pressable onPress={() => navigation.goBack()} style={styles.absolute}>
          <MaterialCommunityIcons
            name="arrow-left"
            color={COLORS.black}
            size={28}
          />
        </Pressable>
        <FlatList
          data={education}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.degree}</Text>
              <Text>{item.college}</Text>
              <Text>{`${item.dateFrom} - ${item.dateTo}`}</Text>
              <View style={styles.actions}>
                <Button title="Edit" onPress={() => handleEdit(item.id)} />
                <Button
                  title="Delete"
                  onPress={() => handleDelete(item.id)}
                  color="red"
                />
              </View>
            </View>
          )}
        />

        <AppButton
          title="Add Education"
          onPress={() => setModalVisible(true)}
        />

        <Modal visible={isModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {editingId ? "Edit Education" : "Add Education"}
            </Text>

            <Controller
              control={control}
              name="degree"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Degree"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  {error && (
                    <Text style={styles.errorText}>{error.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="college"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="College"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  {error && (
                    <Text style={styles.errorText}>{error.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="dateFrom"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Start Date (e.g., 2020-01)"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  {error && (
                    <Text style={styles.errorText}>{error.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="dateTo"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="End Date (e.g., 2022-12)"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  {error && (
                    <Text style={styles.errorText}>{error.message}</Text>
                  )}
                </View>
              )}
            />

            <AppButton title="Save" onPress={handleSubmit(onSubmit)} />

            <AppButton
              title="Cancel"
              onPress={() => setModalVisible(false)}
              isGradient={false}
              textColor={COLORS.primary}
              style={{ borderWidth: 1 }}
            />
          </View>
        </Modal>
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    ...SHADOWS.dark,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
  absolute: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  title2: {
    fontFamily: FONTS.semiBold,
    fontSize: 18,
    textAlign: "center",
    marginTop: 5,
  },
});

export default Education;
