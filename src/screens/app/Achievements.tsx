import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, Modal } from "react-native";
import SafeView from "@/src/components/global/SafeView";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "@/src/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import AppTextInput from "@/src/components/global/AppTextInput";
import AppButton from "@/src/components/global/AppButton";
import { useResumeStore } from "@/src/store/resumeStore";

const Achievements = () => {
  const navigation = useNavigation();
  const { achievements, addAchievement, removeAchievement } = useResumeStore();
  const [modalVisible, setModalVisible] = useState(false);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { achievement: "" },
  });

  const onSubmit = (data) => {
    addAchievement(data.achievement);
    setModalVisible(false);
    reset();
  };

  return (
    <SafeView style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Achievements</Text>
        <MaterialCommunityIcons
          name="plus"
          size={24}
          color="black"
          onPress={() => setModalVisible(true)}
        />
      </View>

      <View style={{ marginTop: 15 }}>
        <ScrollView>
          {achievements.map((achievement, index) => (
            <View key={index} style={styles.listItem}>
              <Text>{achievement}</Text>
              <MaterialCommunityIcons
                name="delete"
                size={20}
                color="red"
                onPress={() => removeAchievement(achievement)}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <SafeView style={styles.modalContainer}>
          <Controller
            control={control}
            name="achievement"
            render={({ field: { onChange, value } }) => (
              <AppTextInput
                title="Achievement"
                placeholder="Won Coding Competition"
                icon="trophy"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <AppButton title="Save" onPress={handleSubmit(onSubmit)} />
        </SafeView>
      </Modal>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 18, fontFamily: FONTS.medium },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  modalContainer: { flex: 1, padding: 20, paddingTop: 60 },
});

export default Achievements;
