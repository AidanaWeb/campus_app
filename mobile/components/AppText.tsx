import { StyleProp, Text, TextStyle } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Colors from "@/constants/Theme";

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
  const theme = useSelector((state: RootState) => state.theme.current);

  const textStyle = {
    fontFamily: type === "title" ? "Montserrat" : "Roboto",
    fontSize: size,
    color: Colors[theme].text,
  };

  return <Text style={[textStyle, style]}>{children}</Text>;
}
