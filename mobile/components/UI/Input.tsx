import { View, Text, TextInput, ViewStyle, TextStyle } from "react-native";
import React, { ReactEventHandler, ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Colors from "@/constants/Theme";

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  iconLeft?: ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  transparent?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
}

export default function Input({
  value,
  onChangeText,
  placeholder,
  iconLeft,
  containerStyle,
  inputStyle,
  transparent,
  multiline,
  numberOfLines,
}: InputProps) {
  const theme = useSelector((state: RootState) => state.theme.current);
  const placeholderColor = theme === "light" ? "#00000050" : "#ffffff50";

  if (iconLeft) {
    return null;
  }

  return (
    <View
      style={[
        {
          borderRadius: 20,
          overflow: "hidden",
        },
        containerStyle,
      ]}
    >
      <TextInput
        style={[
          {
            backgroundColor: transparent
              ? "transparent"
              : Colors[theme].overlay,
            paddingVertical: 10,
            paddingHorizontal: 20,
            fontSize: 16,
          },
          inputStyle,
        ]}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
    </View>
  );
}
