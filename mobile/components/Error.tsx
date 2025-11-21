import { GestureResponderEvent, StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { router } from "expo-router";
import AppText from "./UI/AppText";
import Icon from "./UI/Icon";
import Button from "./UI/Button";

interface ErrorProps {
  title?: string;
  message?: string;
  icon?: ReactNode;
  buttonTitle?: string;
  onPress?: (e: GestureResponderEvent) => void;
}

export default function Error({
  title,
  message,
  onPress,
  icon,
  buttonTitle,
}: ErrorProps) {
  return (
    <View style={styles.container}>
      {icon ?? (
        <Icon type="Entypo" name="circle-with-cross" color="red" size={62} />
      )}

      <AppText type="title" size={18} weight={"bold"}>
        {title ?? "Что-то пошло не так 😕"}
      </AppText>

      <AppText align="center">
        {message ?? "Попробуйте обновить страницу."}
      </AppText>

      {onPress && (
        <Button
          title={buttonTitle ?? "Попробовать снова"}
          onPress={onPress}
          isActive
          containerStyle={{ marginTop: 20 }}
        />
      )}

      <View style={{ height: 100 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
});
