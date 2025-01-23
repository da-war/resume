import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import SafeView from "@/src/components/global/SafeView";
import {
  FONTS,
  screenHeight,
  screenWidth,
  SHADOWS,
} from "@/src/constants/theme";
import { resumes } from "@/src/constants/data";

const Recipients = () => {
  return (
    <SafeView style={{ paddingHorizontal: 20 }}>
      <Text style={styles.title}>Recipients</Text>
      <View style={{ flex: 1 }}>
        <FlatList
          data={resumes}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => (
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="contain"
            />
          )}
        />
      </View>
    </SafeView>
  );
};

export default Recipients;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: FONTS.medium,
    textAlign: "center",
  },
  image: {
    width: screenWidth / 4,
    height: screenHeight / 6,
    margin: 10,
    ...SHADOWS.medium,
  },
});
