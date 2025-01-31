import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
  StyleSheet,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useResumeStore } from "@/src/store/resumeStore";
import { TextInput } from "react-native";

// Define the schema for form validation using Yup
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

const Courses = () => {
  const { courses, addCourse, updateCourse, removeCourse } = useResumeStore();
  const [isModalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { control, handleSubmit, reset, setValue } = useForm<CourseFormData>({
    resolver: yupResolver(courseSchema),
    defaultValues: {
      title: "",
      dateFrom: "",
      dateTo: "",
      courseFrom: "",
    },
  });

  const onSubmit = (data: CourseFormData) => {
    if (editingId) {
      updateCourse(editingId, data);
    } else {
      addCourse(data);
    }
    setModalVisible(false);
    reset();
    setEditingId(null);
  };

  const handleEdit = (id: string) => {
    const item = courses.find((course) => course.id === id);
    if (item) {
      setValue("title", item.title);
      setValue("dateFrom", item.dateFrom);
      setValue("dateTo", item.dateTo);
      setValue("courseFrom", item.courseFrom);
      setEditingId(id);
      setModalVisible(true);
    }
  };

  const handleDelete = (id: string) => {
    removeCourse(id);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{`${item.dateFrom} - ${item.dateTo}`}</Text>
            <Text>{item.courseFrom}</Text>
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

      <Button title="Add Course" onPress={() => setModalVisible(true)} />

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {editingId ? "Edit Course" : "Add Course"}
          </Text>

          <Controller
            control={control}
            name="title"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Title"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
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
                {error && <Text style={styles.errorText}>{error.message}</Text>}
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
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </View>
            )}
          />

          <Controller
            control={control}
            name="courseFrom"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Course Provider"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {error && <Text style={styles.errorText}>{error.message}</Text>}
              </View>
            )}
          />

          <Button title="Save" onPress={handleSubmit(onSubmit)} />
          <Button
            title="Cancel"
            onPress={() => setModalVisible(false)}
            color="red"
          />
        </View>
      </Modal>
    </View>
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
});

export default Courses;
