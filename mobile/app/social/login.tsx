import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import FormInput from "@/components/FormInput";
import AppText from "@/components/UI/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/UI/Button";
import { validateEmail } from "@/utils/validateForm";
import { router } from "expo-router";
import { useLoginMutation } from "@/store/api/users";
import { useDispatch } from "react-redux";
import { setUser, setUserInfo } from "@/store/slices/userSlice";
import { saveDataInStorage } from "@/utils/storage";

interface Form {
  email: string;
  password: string;
}

export default function LoginScr() {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();

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
      return false;
    }

    if (!form.password) {
      Alert.alert("Заполните пароль");
      return false;
    }

    return true;
  };

  const handleSubmitForm = async () => {
    const validForm = validateForm();

    if (!validForm) return;

    try {
      const loginRes = await login({
        email: form.email,
        password: form.password,
      }).unwrap();

      if (!loginRes.user || !loginRes.accessToken) {
        Alert.alert("Произошла ошибка", "Попробуйте позже");
        return;
      }

      dispatch(
        setUser({
          user: loginRes.user,
          accessToken: loginRes.accessToken,
        })
      );
      await saveDataInStorage("app_user", loginRes.user);
      await saveDataInStorage("refreshToken", loginRes.refreshToken);
      Alert.alert("Вход выполнен", `Добро пожаловать, ${loginRes.user.name}`);
      router.replace("/(tabs)");
    } catch (error: any) {
      const message = error?.data?.translations?.ru;
      const message2 = error?.data?.message;
      Alert.alert(
        "Произошла ошибка",
        message ?? message2 ?? "Попробуйте позже"
      );
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
            onPress={() => router.replace({ pathname: "/social/signup" })}
          >
            <AppText>Регистрация</AppText>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <Button
        title="Продолжить"
        onPress={handleSubmitForm}
        isActive
        containerStyle={{ paddingHorizontal: 20, left: 0, right: 0 }}
        buttonStyle={{ width: "100%" }}
      />
    </SafeAreaView>
  );
}
