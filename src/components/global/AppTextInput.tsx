import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/src/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface AppTextInputProps {
  icon?: any;
  placeholder: string;
  defaultValue: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  style?: any;
  title?: string;
}

const AppTextInput: React.FC<AppTextInputProps> = ({
  title,
  icon,
  placeholder,
  defaultValue,
  onChangeText,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  autoCorrect,
  multiline,
  numberOfLines,
  style,
}) => {
  return (
    <>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.container}>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color={COLORS.iconPlaceholder}
          />
        )}
        <TextInput
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          style={[styles.input, style]}
          placeholderTextColor="#878585"
          defaultValue={defaultValue}
        />
      </View>
    </>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 5,
    borderRadius: 10,
    marginBottom: 15,
  },
  input: {
    padding: 10,
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: COLORS.black,
    marginBottom: 10,
    fontFamily: FONTS.semiBold,
  },
});
