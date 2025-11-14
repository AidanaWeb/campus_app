import { TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Icon from "../Icon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface HeaderButtonProps {
  margin?: number;
  onPress: () => void;
}

export const HeaderButton = ({ margin = 10, onPress }: HeaderButtonProps) => {
  const insets = useSafeAreaInsets();
  const theme = useSelector((state: RootState) => state.theme.current);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.button,
        margin,
        top: insets.top,
        backgroundColor: theme === "light" ? "#00000030" : "#ffffff30",
      }}
    >
      <Icon
        type="Ionicons"
        name="arrow-back"
        color={theme === "light" ? "white" : "black"}
      />
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
