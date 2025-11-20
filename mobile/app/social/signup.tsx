import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
  Alert,
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

const { height } = Dimensions.get("window");

interface Form {
  email: string;
  name: string;
  lastName: string;
  password: string;
  passwordCheck: string;
}

export default function SignupScr() {
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
      return;
    }

    const nameCheck = validateName(form.name);
    if (nameCheck.error) {
      Alert.alert(nameCheck.error);
      return;
    }

    const lastNameCheck = validateName(form.lastName);
    if (lastNameCheck.error) {
      Alert.alert(lastNameCheck.error);
      return;
    }

    const passCheck = validatePassword(form.password, form.passwordCheck);
    if (passCheck.error) {
      Alert.alert(passCheck.error);
      return;
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
        onPress={validateForm}
        isActive
        containerStyle={{ paddingHorizontal: 20, left: 0, right: 0 }}
        buttonStyle={{ width: "100%" }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
