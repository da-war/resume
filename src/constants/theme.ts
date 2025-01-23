import { Dimensions } from "react-native";

export const COLORS = {
    primary: '#2A7AE2',
    secondary: '#34D399',
    white: '#FFFFFF',
    black: '#000000',
    gray: '#B0B0B0',
    lightGray: '#F5F5F5',
    darkGray: '#333333',
    error: '#FF0000',
  background: "#F7F7F7",
  iconColor: "#5C5C5C",
    iconPlaceholder:"#ABABAB"
}


export const SHADOWS={
  dark: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8, // For Android
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4, // For Android
  },
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // For Android
  },
};


export const FONTS = {
    bold: 'Montserrat-Bold',
    extraBold: 'Montserrat-ExtraBold',
    light: 'Montserrat-Light',
    medium: 'Montserrat-Medium',
    regular: 'Montserrat-Regular',
    semiBold: 'Montserrat-SemiBold',
    thin: 'Montserrat-Thin',
}


const { width, height } = Dimensions.get("window");

export const screenWidth = width;
export const screenHeight = height;