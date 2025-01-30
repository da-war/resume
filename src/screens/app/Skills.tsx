import {
  Alert,
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
  skill: yup
    .string()
    .min(3, "Skill must be at least 3 characters")
    .required("Skill is required"),
});

const Skills: React.FC = () => {
  const navigation = useNavigation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const addSkill = useResumeStore((state) => state.addSkill);
  const skills = useResumeStore((state) => state.skills);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { skill: "" },
  });

  const handleSkillSave = ({ skill }: { skill: string }) => {
    addSkill(skill);
    reset();
    setIsOpenModal(false);
  };

  return (
    <>
      <SafeView style={styles.mainContainer}>
        <Text style={styles.title}>Skills</Text>
        <Pressable onPress={() => navigation.goBack()} style={styles.absolute}>
          <MaterialCommunityIcons
            name="arrow-left"
            color={COLORS.black}
            size={28}
          />
        </Pressable>
        {skills.length < 1 ? (
          <View style={styles.imageLoad}>
            <Image
              source={require("@/assets/images/hobby.png")}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        ) : (
          <View style={styles.listContainer}>
            <FlatList
              data={skills}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.container}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={require("@/assets/icons/expertise.png")}
                      style={{ width: 24, height: 24 }}
                      resizeMode="contain"
                    />
                    <GradientBackground />
                  </View>
                  <Text style={styles.titleHobby}>{item}</Text>
                </View>
              )}
            />
          </View>
        )}

        <AppButton title="+ Add" onPress={() => setIsOpenModal(true)} />
      </SafeView>
      <Modal visible={isOpenModal} animationType="slide">
        <View style={{ flex: 1, paddingTop: 100, paddingHorizontal: 20 }}>
          <Text style={[styles.title, { marginBottom: 40 }]}>Add Skill</Text>
          <Controller
            control={control}
            name="skill"
            render={({ field: { onChange, value } }) => (
              <AppTextInput
                title="Enter Skill"
                value={value}
                onChangeText={onChange}
                placeholder="Enter Your Skill"
                icon="account"
                errorMessage={errors.skill?.message}
              />
            )}
          />
          <AppButton title="Save" onPress={handleSubmit(handleSkillSave)} />
        </View>
      </Modal>
    </>
  );
};

export default Skills;

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
  image: {
    width: "75%",
    height: "70%",
    alignSelf: "center",
  },
  itemIconContainer: {
    padding: 10,
    width: "20%",
    flexDirection: "row",
  },
  listContainer: {
    flex: 1,
    marginTop: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#f3f3f3",
    borderRadius: 10,
  },
  imageContainer: {
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  titleHobby: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    marginLeft: 15,
  },
});
