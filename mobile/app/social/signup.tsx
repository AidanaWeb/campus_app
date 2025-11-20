import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import AppText from "@/components/UI/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "@/components/UI/Input";
import FormInput from "@/components/FormInput";
import Button from "@/components/UI/Button";

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
          value={form.lastName}
          setValue={setValue}
          field="password"
          placeholder="Пароль"
        />
        <FormInput
          value={form.lastName}
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
          <TouchableOpacity>
            <AppText>Войти</AppText>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <Button
        title="Продолжить"
        isActive
        containerStyle={{ paddingHorizontal: 20, left: 0, right: 0 }}
        buttonStyle={{ width: "100%" }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
