import { View, Text, Modal, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "@/components/UI/AppText";
import Colors from "@/constants/Theme";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import RNPickerSelect from "react-native-picker-select";
import { Picker } from "@react-native-picker/picker";
import Icon from "@/components/UI/Icon";

type themeSelect = "system" | "light" | "dark";

export default function Settings() {
  const theme = useSelector((state: RootState) => state.theme.current);
  const [selectedTheme, setSelectedTheme] = useState<themeSelect>(theme);

  return (
    <ScrollView>
      {/* <AppText>Настройки</AppText> */}

      <View
        style={{
          backgroundColor: Colors[theme].overlay,
          gap: 5,
          margin: 10,
          borderRadius: 10,
        }}
      >
        <SettingItem title="Тема" type="select" />
        <SettingItem title="Язык" type="select" />
        <SettingItem title="Уведомления" type="toggle" />
      </View>
    </ScrollView>
  );
}

interface selectItem {
  label: string;
  value: string;
}
interface SettingItemProps {
  title: string;
  type?: "default" | "select" | "toggle";
  selectItems?: selectItem[];
}
const SettingItem = ({ title, type = "default" }: SettingItemProps) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <AppText type="title" size={18}>
        {title}
      </AppText>

      <Icon type="MaterialIcons" name="navigate-next" opacity={0.3} />
    </TouchableOpacity>
  );
};
