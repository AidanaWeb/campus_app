import React from "react";
import Icon from "./UI/Icon";
import Error from "./Error";
import { router } from "expo-router";

export default function AuthError() {
  return (
    <Error
      icon={<Icon type="Entypo" name="block" color="red" size={62} />}
      title="Войдите, чтобы продолжить 🔒"
      message="Эта функция доступна только зарегистрированным пользователям."
      buttonTitle="Зарегистрироваться"
      onPress={() => router.push({ pathname: "/social/signup" })}
    />
  );
}
