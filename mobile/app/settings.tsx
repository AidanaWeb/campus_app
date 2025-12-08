import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ColorValue,
  NativeTouchEvent,
  GestureResponderEvent,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "@/components/UI/AppText";
import Colors from "@/constants/Theme";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import RNPickerSelect from "react-native-picker-select";
import { Picker } from "@react-native-picker/picker";
import Icon from "@/components/UI/Icon";
import Button from "@/components/UI/Button";
import { removeDataFromStorage, saveDataInStorage } from "@/utils/storage";
import { setTheme } from "@/store/slices/themeSlice";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import { logoutUser, setUser } from "@/store/slices/userSlice";
import { router } from "expo-router";

export default function Settings() {
  const theme = useSelector((state: RootState) => state.theme.current);
  const user = useSelector((state: RootState) => state.user.info);
  const dispatch = useDispatch();
  const lang = i18n.language;
  const { t } = useTranslation();

  const handleChangeTheme = async (next: "dark" | "light") => {
    dispatch(setTheme(next));
    await saveDataInStorage("app_theme", next);
  };

  const handleChangeLang = async (next: "ru" | "en") => {
    i18n.changeLanguage(next);
    await saveDataInStorage("app_lang", next);
  };

  const handleLogout = async () => {
    dispatch(logoutUser());
    await removeDataFromStorage("app_user");
    await removeDataFromStorage("refreshToken");
    Alert.alert(t("logout_success"));
    router.replace("/");
  };

  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: Colors[theme].overlay,
          gap: 10,
          margin: 10,
          borderRadius: 10,
        }}
      >
        <View>
          <SettingItem title={t("theme")} />

          <View style={{ flexDirection: "row", gap: 10, marginHorizontal: 10 }}>
            <Button
              title={t("theme_dark")}
              isActive={theme === "dark"}
              onPress={() => handleChangeTheme("dark")}
            />
            <Button
              title={t("theme_light")}
              isActive={theme === "light"}
              onPress={() => handleChangeTheme("light")}
            />
            <Button title={t("theme_system")} />
          </View>

          <Separator />
        </View>

        <View>
          <SettingItem title={t("language")} />

          <View style={{ flexDirection: "row", gap: 10, marginHorizontal: 10 }}>
            <Button
              title={"русский"}
              isActive={lang === "ru"}
              onPress={() => handleChangeLang("ru")}
            />
            <Button
              title={"english"}
              isActive={lang === "en"}
              onPress={() => handleChangeLang("en")}
            />
          </View>

          <Separator />
        </View>

        <SettingItem title={t("notifications")} />

        {user?.id && (
          <>
            <Separator />

            <SettingItem
              title={t("logout_verb")}
              color={"red"}
              onPress={handleLogout}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
}

interface SettingItemProps {
  title: string;
  type?: "default" | "select" | "toggle";
  color?: ColorValue;
  onPress?: (e: GestureResponderEvent) => void;
}
const SettingItem = ({
  title,
  type = "default",
  color,
  onPress = () => {},
}: SettingItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {color ? (
        <AppText
          type="title"
          size={18}
          style={{
            color,
          }}
        >
          {title}
        </AppText>
      ) : (
        <AppText type="title" size={18}>
          {title}
        </AppText>
      )}

      <Icon type="MaterialIcons" name="navigate-next" opacity={0.3} />
    </TouchableOpacity>
  );
};

const Separator = () => {
  const theme = useSelector((state: RootState) => state.theme.current);

  return (
    <View
      style={{
        width: "95%",
        height: 1,
        backgroundColor: Colors[theme].secondary,
        opacity: 0.05,
        marginVertical: 10,
        alignSelf: "center",
      }}
    />
  );
};
