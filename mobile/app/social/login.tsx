import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import FormInput from "@/components/FormInput";
import AppText from "@/components/UI/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/UI/Button";
import { validateEmail } from "@/utils/validateForm";
import { router } from "expo-router";

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

  const validateForm = () => {
    const emailCheck = validateEmail(form.email);
    if (emailCheck.error) {
      Alert.alert(emailCheck.error);
      return;
    }

    if (!form.password) {
      Alert.alert("Заполните пароль");
    }
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
          <TouchableOpacity
            onPress={() => router.push({ pathname: "/social/signup" })}
          >
            <AppText>Регистрация</AppText>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <Button
        title="Продолжить"
        onPress={validateForm}
        isActive
        containerStyle={{ paddingHorizontal: 20, left: 0, right: 0 }}
        buttonStyle={{ width: "100%" }}
      />
    </SafeAreaView>
  );
}
