import { StyleProp, Text, TextStyle } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Colors from "@/constants/Theme";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";

interface AppTextProps {
  type?: "title" | "default" | "subText";
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
    opacity: type === "subText" ? 0.5 : 1,
    color: Colors[theme].text,
  };

  return <Text style={[textStyle, style]}>{children}</Text>;
}
