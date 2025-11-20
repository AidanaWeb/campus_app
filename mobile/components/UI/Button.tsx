import {
  View,
  Text,
  TouchableOpacity,
  TextStyle,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent,
} from "react-native";
import React, { ReactNode } from "react";
import AppText from "./AppText";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ButtonProps {
  title?: string | number;
  icon?: ReactNode;
  color?: string;
  titleColor?: string;
  titleStyle?: TextStyle;
  isActive?: boolean;
  containerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  onPress?: (event: GestureResponderEvent) => void;
}

export default function Button({
  title = "",
  icon,
  color,
  titleColor,
  titleStyle,
  isActive = false,
  containerStyle,
  buttonStyle,
  onPress,
}: ButtonProps) {
  const theme = useSelector((state: RootState) => state.theme.current);

  if (isActive) {
    const backgroundColor = theme === "light" ? "#000" : "#fff";
    const color = theme === "light" ? "#fff" : "#000";

    return (
      <View style={containerStyle}>
        <TouchableOpacity
          onPress={onPress}
          style={[
            styles.button,
            {
              backgroundColor,
              justifyContent: "center",
              alignItems: "center",
              ...buttonStyle,
            },
          ]}
        >
          <AppText
            style={[
              styles.title,
              {
                color,
                opacity: 1,
              },
            ]}
          >
            {title}
          </AppText>
        </TouchableOpacity>
      </View>
    );
  }

  const backgroundColor =
    theme === "light" ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.05)";

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor }]}
        onPress={onPress}
      >
        <AppText style={[styles.title]}>{title}</AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 30,
  },
  title: {
    opacity: 0.4,
  },
});
