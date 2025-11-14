import { StyleProp, Text, TextStyle } from "react-native";
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Colors from "@/constants/Theme";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";

type FontWeightString = "normal" | "bold" | "light";
type FontWeightNumber = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

interface AppTextProps {
  type?: "title" | "default" | "subText";
  size?: number;
  children: string | number | ReactNode;
  style?: StyleProp<TextStyle>;
  weight?: FontWeightString | FontWeightNumber;
  numberOfLines?: number;
}

export default function AppText({
  type = "default",
  size = 12,
  children,
  style = {},
  weight = "normal",
  numberOfLines,
}: AppTextProps) {
  const theme = useSelector((state: RootState) => state.theme.current);

  const textStyle = {
    fontFamily: type === "title" ? "Montserrat" : "Roboto",
    fontSize: size,
    opacity: type === "subText" ? 0.5 : 1,
    fontWeight: weight,
    color: Colors[theme].text,
  };

  return (
    <Text style={[textStyle, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
}
