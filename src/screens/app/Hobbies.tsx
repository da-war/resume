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
import React from "react";
import SafeView from "@/src/components/global/SafeView";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "@/src/constants/theme";
import { useNavigation } from "@react-navigation/native";
import AppButton from "@/src/components/global/AppButton";
import AppTextInput from "@/src/components/global/AppTextInput";
import GradientBackground from "@/src/components/global/GradientBackground";

interface hobbyType {
  name: string;
}

const Hobbies: React.FC = () => {
  const navigation = useNavigation();
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [hobby, setHobby] = React.useState("");
  const hobbies: hobbyType[] = [];

  const handleHobbiesSave = () => {
    if (hobby.length < 3) {
      Alert.alert("Please add Some Real Hobby");
      return;
    }
    const newHobby: hobbyType = {
      name: hobby,
    };
    hobbies.push(newHobby);
    setIsOpenModal(false);
  };
  return (
    <>
      <SafeView style={styles.mainContainer}>
        <Text style={styles.title}>Hobbies</Text>
        <Pressable onPress={() => navigation.goBack()} style={styles.absolute}>
          <MaterialCommunityIcons
            name="arrow-left"
            color={COLORS.black}
            size={28}
          />
        </Pressable>
        {hobbies.length < 1 ? (
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
              data={hobbies}
              keyExtractor={(item) => item.name.toString()}
              renderItem={({ item }) => (
                <View>
                  <View style={styles.itemIconContainer}>
                    <GradientBackground />
                    <Image
                      source={require("@/assets/icons/hobbies.png")}
                      style={styles.image}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              )}
            />
          </View>
        )}

        <AppButton title="+ Add" onPress={() => setIsOpenModal(true)} />
      </SafeView>
      <Modal visible={isOpenModal} animationType="slide">
        <View style={{ flex: 1, paddingTop: 100, paddingHorizontal: 20 }}>
          <Text style={[styles.title, { marginBottom: 40 }]}>Hobbies</Text>
          <AppTextInput
            title="Enter Hobbies"
            value={hobby}
            onChangeText={(text) => setHobby(text)}
            placeholder="Enter Your Hobbies"
            icon="account"
          />

          <AppButton title="Save" onPress={() => handleHobbiesSave()} />
        </View>
      </Modal>
    </>
  );
};

export default Hobbies;

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
});
