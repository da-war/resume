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
import { useResumeStore } from "@/src/store/resumeStore";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  summary: yup.string().required("Summary is required"),
});

const Summaries: React.FC = () => {
  const navigation = useNavigation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const addSummary = useResumeStore((state) => state.addSummary);
  const summaries = useResumeStore((state) => state.summaries);
  const deleteSummary = useResumeStore((state) => state.removeSummary);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      summary: "",
    },
  });

  const handleSummarySave = (data: any) => {
    addSummary(data);
    reset();
    setIsOpenModal(false);
  };

  return (
    <>
      <SafeView style={styles.mainContainer}>
        <Text style={styles.title}>Summaries</Text>
        <Pressable onPress={() => navigation.goBack()} style={styles.absolute}>
          <MaterialCommunityIcons
            name="arrow-left"
            color={COLORS.black}
            size={28}
          />
        </Pressable>
        {summaries.length < 1 ? (
          <View style={styles.imageLoad}>
            <Image
              source={require("@/assets/images/hobby.png")}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        ) : (
          <FlatList
            data={summaries}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.summaryBox}>
                <Text style={styles.heading}>{item.title}</Text>
                <Text style={styles.text}>{item.summary}</Text>
                <Pressable
                  style={styles.absoluteDelete}
                  onPress={() => deleteSummary(item.id)}
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
          <Pressable onPress={() => setIsOpenModal(false)}>
            <Entypo name="circle-with-cross" size={24} color="black" />
          </Pressable>
          <Text style={[styles.title, { marginBottom: 40 }]}>Add Summary</Text>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <AppTextInput
                placeholder="Enter Title"
                defaultValue={value}
                onChangeText={onChange}
                errorMessage={errors.title?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="summary"
            render={({ field: { onChange, value } }) => (
              <AppTextInput
                placeholder="Enter Summary"
                defaultValue={value}
                multiline
                numberOfLines={4}
                onChangeText={onChange}
                errorMessage={errors.summary?.message}
              />
            )}
          />
          <AppButton title="Save" onPress={handleSubmit(handleSummarySave)} />
        </View>
      </Modal>
    </>
  );
};

export default Summaries;

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
    marginBottom: 30,
  },
  summaryBox: {
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    marginBottom: 10,
    borderRadius: 15,
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
  absoluteDelete: {
    position: "absolute",
    right: 20,
    top: 20,
  },
});
