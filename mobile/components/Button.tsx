import {
  View,
  Text,
  TouchableOpacity,
  TextStyle,
  StyleSheet,
} from "react-native";
import React, { ReactNode } from "react";
import AppText from "./AppText";

interface ButtonProps {
  title?: string | number;
  icon?: ReactNode;
  color?: string;
  titleColor?: string;
  titleStyle?: TextStyle;
  isActive?: boolean;
}

export default function Button({
  title = "",
  icon,
  color,
  titleColor,
  titleStyle,
  isActive = false,
}: ButtonProps) {
  const theme = "light";

  if (isActive) {
    return (
      <View>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: "#000",
            },
          ]}
        >
          <AppText
            style={[
              styles.title,
              {
                color: "#fff",
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

  return (
    <View>
      <TouchableOpacity style={[styles.button]}>
        <AppText style={[styles.title]}>{title}</AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 30,
  },
  title: {
    opacity: 0.4,
  },
});
