import { Text, TextStyle } from "react-native";
import React from "react";

interface AppTextProps {
  type?: "title" | "default";
  size?: number;
  children: string | number;
  style?: TextStyle;
}

export default function AppText({
  type = "default",
  size = 12,
  children,
  style = {},
}: AppTextProps) {
  const textStyle: TextStyle = {
    fontFamily: type === "title" ? "Montserrat" : "Roboto",
    fontSize: size,
    ...style,
  };

  return <Text style={textStyle}>{children}</Text>;
}
