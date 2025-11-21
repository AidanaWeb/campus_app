import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Icon from "@/components/UI/Icon";
import AppText from "@/components/UI/AppText";
import Button from "@/components/UI/Button";
import { router } from "expo-router";
import AuthError from "@/components/AuthError";

type Props = {};

const CreatePostScr = (props: Props) => {
  const user = useSelector((state: RootState) => state.user.info);

  if (!user) {
    return <AuthError />;
  }

  return (
    <View>
      <Text>create post</Text>
    </View>
  );
};

export default CreatePostScr;
