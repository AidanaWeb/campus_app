import { TouchableOpacity, StyleSheet } from "react-native";
import React, { ReactNode } from "react";
import Icon, { iconType } from "../Icon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface HeaderButtonProps {
  onPress: () => void;
  margin?: number;
  icon: {
    type: iconType;
    name: string;
  };
}

export const HeaderButton = ({
  margin = 10,
  onPress,
  icon,
}: HeaderButtonProps) => {
  const insets = useSafeAreaInsets();
  const theme = useSelector((state: RootState) => state.theme.current);
  const backgroundColor = theme === "light" ? "#00000030" : "#ffffff30";
  const iconColor = theme === "light" ? "white" : "black";

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.button,
        margin,
        top: insets.top,
        backgroundColor,
      }}
    >
      <Icon type={icon.type} name={icon.name} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    zIndex: 20,
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
});
