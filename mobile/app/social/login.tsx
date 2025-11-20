import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import FormInput from "@/components/FormInput";
import AppText from "@/components/UI/AppText";
import { SafeAreaView } from "react-native-safe-area-context";

interface Form {
  email: string;
  password: string;
}

export default function LoginScr() {
  const [form, setForm] = useState<Form>({
    email: "",
    password: "",
  });

  const setValue = (field: string, value: string) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        keyboardShouldPersistTaps="never"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          padding: 20,
          gap: 10,
        }}
      >
        <AppText type="title" size={28} weight={"bold"} align="center">
          Вход
        </AppText>

        <FormInput
          value={form.email}
          setValue={setValue}
          field="email"
          placeholder="email"
        />
        <FormInput
          value={form.password}
          setValue={setValue}
          field="password"
          placeholder="Пароль"
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <AppText type="subText">Нет аккаунта?</AppText>
          <TouchableOpacity>
            <AppText>Регистрация</AppText>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
