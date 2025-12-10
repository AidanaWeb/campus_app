import React from "react";
import Icon from "./UI/Icon";
import Error from "./Error";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

export default function AuthError() {
  const { t } = useTranslation();

  return (
    <Error
      icon={<Icon type="Entypo" name="block" color="red" size={62} />}
      title={t("login_to_continue") + "🔒"}
      message={t("feature_allowed_for_registered_users")}
      buttonTitle={t("register")}
      onPress={() => router.push({ pathname: "/social/signup" })}
    />
  );
}
