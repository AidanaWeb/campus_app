import React from "react";
import SocialDetailScr from "../social/[id]";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "@/components/UI/AppText";
import Icon from "@/components/UI/Icon";
import Button from "@/components/UI/Button";

export default function profile() {
  const user = useSelector((state: RootState) => state.user.info);

  if (!user) {
    return <NoAuthProfile />;
  }

  return <SocialDetailScr id={user.id} />;
}

const NoAuthProfile = () => {
  return (
    <SafeAreaView
      style={{
        flexGrow: 1,
      }}
    >
      <View
        style={{
          flexGrow: 1,
          gap: 20,
          justifyContent: "center",
          alignItems: "center",
          padding: 30,
        }}
      >
        <Icon type="AntDesign" name="user-add" size={62} />

        <AppText size={14} align="center">
          Чтобы просматривать профиль, создавать посты и управлять настройками —
          войдите в аккаунт.
        </AppText>

        <View
          style={{
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Button title="Войти" isActive />
          <Button title="Зарегистрироваться" />
        </View>

        <View style={{ height: 100 }} />
      </View>
    </SafeAreaView>
  );
};
