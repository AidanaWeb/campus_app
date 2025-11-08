import { StyleProp, Text, TextStyle } from "react-native";
import React from "react";

interface AppTextProps {
  type?: "title" | "default";
  size?: number;
  children: string | number;
  style?: StyleProp<TextStyle>;
}

export default function AppText({
  type = "default",
  size = 12,
  children,
  style = {},
}: AppTextProps) {
  const textStyle = {
    fontFamily: type === "title" ? "Montserrat" : "Roboto",
    fontSize: size,
  };

  return <Text style={[textStyle, style]}>{children}</Text>;
}
