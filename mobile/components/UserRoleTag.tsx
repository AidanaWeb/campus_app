import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AppText from "./AppText";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface UserTag {
  role: "STUDENT" | "TEACHER" | "ADMIN";
}

const rolesProps = {
  STUDENT: {
    color: "#a1f3b4ba",
    emoji: "🎓",
  },
  TEACHER: {
    color: "#a1e0f3ba",
    emoji: "🧑‍🏫",
  },
  ADMIN: {
    color: "#f3a1b8ba",
    emoji: "🛡️",
  },
};

export default function UserRoleTag({ role }: UserTag) {
  const theme = useSelector((state: RootState) => state.theme.current);

  return (
    <TouchableOpacity
      style={{
        borderRadius: 10,
        backgroundColor: rolesProps[role].color,
        paddingHorizontal: 10,
        paddingVertical: 2,
        alignSelf: "flex-start",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <AppText>{rolesProps[role].emoji}</AppText>
        <AppText type="subText">{role}</AppText>
      </View>
    </TouchableOpacity>
  );
}
