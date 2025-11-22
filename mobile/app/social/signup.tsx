import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import React, { useState } from "react";
import AppText from "@/components/UI/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "@/components/UI/Input";
import FormInput from "@/components/FormInput";
import Button from "@/components/UI/Button";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "@/utils/validateForm";
import { router } from "expo-router";
import { useLoginMutation, useSignupMutation } from "@/store/api/users";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";
import { setUser, setUserInfo } from "@/store/slices/userSlice";
import { saveDataInStorage } from "@/utils/storage";

const { height } = Dimensions.get("window");

interface Form {
  email: string;
  name: string;
  lastName: string;
  password: string;
  passwordCheck: string;
}

export default function SignupScr() {
  const [signUp, signUpResult] = useSignupMutation();
  const [login, loginResult] = useLoginMutation();

  const dispatch = useDispatch();

  const [form, setForm] = useState<Form>({
    email: "",
    name: "",
    lastName: "",
    password: "",
    passwordCheck: "",
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

    const nameCheck = validateName(form.name);
    if (nameCheck.error) {
      Alert.alert(nameCheck.error);
      return false;
    }

    const lastNameCheck = validateName(form.lastName);
    if (lastNameCheck.error) {
      Alert.alert(lastNameCheck.error);
      return false;
    }

    const passCheck = validatePassword(form.password, form.passwordCheck);
    if (passCheck.error) {
      Alert.alert(passCheck.error);
      return false;
    }

    return true;
  };

  const handleSubmitForm = async () => {
    const validStatus = validateForm();

    if (!validStatus) return;

    try {
      const signupRes = await signUp({
        email: form.email,
        name: form.name,
        lastName: form.lastName,
        password: form.password,
        role: "STUDENT",
      }).unwrap();

      if (!signupRes.user) {
        Alert.alert("Произошла ошибка", "Попробуйте позже");
        return;
      }

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
      Alert.alert("Регистрация завершена", "Авторизация выполнена успешно.");
      router.replace("/(tabs)");
    } catch (error: FetchBaseQueryError | any) {
      if (error?.data?.translations?.["ru"]) {
        Alert.alert(error.data.translations?.["ru"]);
        return;
      }

      if (Array.isArray(error?.data?.message)) {
        Alert.alert(error.data.message[0]);
        return;
      }

      Alert.alert("Произошла ошибка", "Попробуйте позже");
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
          Регистрация
        </AppText>

        <FormInput
          value={form.email}
          setValue={setValue}
          field="email"
          placeholder="email"
        />
        <FormInput
          value={form.name}
          setValue={setValue}
          field="name"
          placeholder="Имя"
        />
        <FormInput
          value={form.lastName}
          setValue={setValue}
          field="lastName"
          placeholder="Фамилия"
        />
        <FormInput
          value={form.password}
          setValue={setValue}
          field="password"
          placeholder="Пароль"
        />
        <FormInput
          value={form.passwordCheck}
          setValue={setValue}
          field="passwordCheck"
          placeholder="Повторите пароль"
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <AppText type="subText">Уже есть аккаунт?</AppText>
          <TouchableOpacity
            onPress={() => router.push({ pathname: "/social/login" })}
          >
            <AppText>Войти</AppText>
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

const styles = StyleSheet.create({});
