import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import AppText from "@/components/UI/AppText";
import Button from "@/components/UI/Button";
import { router } from "expo-router";
import AuthError from "@/components/AuthError";
import Input from "@/components/UI/Input";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCreatePostMutation } from "@/store/api/posts";

type Props = {};

const CreatePostScr = (props: Props) => {
  const [createPost] = useCreatePostMutation();
  const user = useSelector((state: RootState) => state.user.info);

  const [post, setPost] = useState({
    title: "",
    description: "",
    coverImage: "",
  });

  const handleCreatePost = async () => {
    if (!post.title || !post.description) {
      Alert.alert("");
      return;
    }

    try {
      const postRes = await createPost({
        title: post.title,
        description: post.description,
        coverImage: post.coverImage,
      }).unwrap();

      if (!postRes.data) {
        Alert.alert("Произошла ошибка", "Попробуйте позже");
        return;
      }

      console.log(postRes);
      router.push({ pathname: "/post/[id]", params: { id: postRes.data.id } });
    } catch (error) {
      console.log(error);
      Alert.alert("Произошла ошибка", "Попробуйте позже");
      return;
    }
  };

  const setValue = (
    field: "title" | "description" | "coverImage",
    value: string
  ) => {
    setPost({
      ...post,
      [field]: value,
    });
  };

  if (!user) {
    return <AuthError />;
  }

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      accessible={false}
      style={{
        flex: 1,
      }}
    >
      <ScrollView keyboardShouldPersistTaps="handled" style={{ flex: 1 }}>
        <Input
          placeholder="url фото"
          value={post.coverImage}
          onChangeText={(text) => setValue("coverImage", text)}
          transparent
        />

        <Input
          placeholder="Название"
          value={post.title}
          onChangeText={(text) => setValue("title", text)}
          transparent
        />

        <Input
          placeholder="Описание поста"
          value={post.description}
          onChangeText={(text) => setValue("description", text)}
          transparent
          multiline
        />

        <Button title={"Создать"} isActive onPress={handleCreatePost} />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostScr;
