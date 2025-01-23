import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import SafeView from "@/src/components/global/SafeView";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "@/src/constants/theme";
import { useNavigation } from "@react-navigation/native";

import * as ImagePicker from "expo-image-picker";
import AppTextInput from "@/src/components/global/AppTextInput";
import AppButton from "@/src/components/global/AppButton";

const PersonalProfile = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState<string | null>(null);

  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [address, setAddress] = React.useState<string>("");
  const [field, setField] = React.useState<string>("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
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
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="black"
          />
        </View>

        <View style={styles.imageContainer}>
          <View>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Image
                source={require("@/assets/images/resume1.png")}
                style={styles.image}
              />
            )}
            <Pressable style={styles.absolute} onPress={pickImage}>
              <MaterialCommunityIcons
                name="pencil"
                size={20}
                color={COLORS.white}
              />
            </Pressable>
          </View>
        </View>
        <Text style={styles.name}>Dawar</Text>

        <AppTextInput
          title="Your Name"
          placeholder="Kami Williams"
          icon="account"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <AppTextInput
          title="Your Email"
          placeholder="kami@gmail.com"
          icon="email"
          value={name}
          onChangeText={(text) => setEmail(text)}
        />
        <AppTextInput
          title="Phone Number"
          placeholder="+923036861918"
          icon="phone"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        <AppTextInput
          title="Your Address"
          placeholder="address"
          icon="map-marker"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <AppTextInput
          title="Your Field"
          placeholder="computer science"
          icon="book"
          value={field}
          onChangeText={(text) => setField(text)}
        />

        <View style={styles.btnContainer}>
          <AppButton title="Save" onPress={() => {}} />
        </View>
      </ScrollView>
    </SafeView>
  );
};

export default PersonalProfile;

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    borderRadius: "50%",
    padding: 3,
    borderColor: COLORS.secondary,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontFamily: FONTS.medium,
  },
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
  name: {
    fontFamily: FONTS.medium,
    fontSize: 20,
    textAlign: "center",
  },
  btnContainer: {
    marginTop: 20,
  },
});
