import { View, Text } from "react-native";
import React from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
  AntDesign,
  FontAwesome,
  Entypo,
  MaterialIcons,
  Fontisto,
} from "@expo/vector-icons";
import { RootState } from "@/store/store";
import Colors from "@/constants/Theme";
import { useSelector } from "react-redux";

export type iconType =
  | "Ionicons"
  | "MaterialCommunityIcons"
  | "Octicons"
  | "AntDesign"
  | "FontAwesome"
  | "Entypo"
  | "MaterialIcons"
  | "Fontisto";

interface IconsProps {
  type: iconType;
  name: string;
  size?: number;
  color?: string;
  translucent?: boolean;
  opacity?: number;
}

export default function Icon({
  type,
  name,
  size = 24,
  color,
  opacity,
}: IconsProps) {
  const theme = useSelector((state: RootState) => state.theme.current);
  const iconColor = color ? color : Colors[theme].icon;

  switch (type) {
    case "Ionicons":
      return (
        <Ionicons
          name={name as any}
          size={size}
          color={iconColor}
          style={{
            opacity,
          }}
        />
      );

    case "MaterialCommunityIcons":
      return (
        <MaterialCommunityIcons
          name={name as any}
          size={size}
          color={iconColor}
          style={{
            opacity,
          }}
        />
      );

    case "Octicons":
      return (
        <Octicons
          name={name as any}
          size={size}
          color={iconColor}
          style={{
            opacity,
          }}
        />
      );

    case "AntDesign":
      return (
        <AntDesign
          name={name as any}
          size={size}
          color={iconColor}
          style={{
            opacity,
          }}
        />
      );

    case "FontAwesome":
      return (
        <FontAwesome
          name={name as any}
          size={size}
          color={iconColor}
          style={{
            opacity,
          }}
        />
      );

    case "Entypo":
      return (
        <Entypo
          name={name as any}
          size={size}
          color={iconColor}
          style={{
            opacity,
          }}
        />
      );

    case "MaterialIcons":
      return (
        <MaterialIcons
          name={name as any}
          size={size}
          color={iconColor}
          style={{
            opacity,
          }}
        />
      );

    case "Fontisto":
      return (
        <Fontisto
          name={name as any}
          size={size}
          color={iconColor}
          style={{
            opacity,
          }}
        />
      );

    default:
      return null;
  }
}
