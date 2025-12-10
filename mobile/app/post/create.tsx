import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import AppText from "@/components/UI/AppText";
import Button from "@/components/UI/Button";
import { router, useNavigation } from "expo-router";
import AuthError from "@/components/AuthError";
import Input from "@/components/UI/Input";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCreatePostMutation } from "@/store/api/posts";
import { useTranslation } from "react-i18next";
import Icon from "@/components/UI/Icon";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import { HeaderButton } from "@/components/UI/HeaderButton";

const { width } = Dimensions.get("window");

type Props = {};

const CreatePostScr = (props: Props) => {
  const { t } = useTranslation();
  const [createPost] = useCreatePostMutation();
  const user = useSelector((state: RootState) => state.user.info);
  const [image, setImage] = useState<null | string>(null);
  const navigation = useNavigation();

  const [post, setPost] = useState({
    title: "",
    description: "",
    coverImage: "",
  });

  const handleCreatePost = async () => {
    // if (!post.title || !post.description) {
    //   Alert.alert("Ошибка", "Заполните поля");
    //   return;
    // }

    const imageToSend = {
      uri: image,
      name: image,
      type: "image/jpeg",
    };

    try {
      const postRes = await createPost({
        title: post.title,
        description: post.description,
        coverImage: imageToSend,
      }).unwrap();

      if (!postRes.data) {
        Alert.alert("Произошла ошибка", "Попробуйте позже");
        return;
      }

      router.replace({
        pathname: "/post/[id]",
        params: { id: postRes.data.id },
      });
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

  const handlePickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => handleCreatePost()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 5,
          }}
        >
          <AppText size={16}>Далее</AppText>
          <Icon type="MaterialIcons" name="navigate-next" />
        </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    return () => {
      setPost({
        title: "",
        description: "",
        coverImage: "",
      });
      setImage(null);
    };
  }, []);

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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView keyboardShouldPersistTaps="handled" style={{ flex: 1 }}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                width,
                height: width,
              }}
            />
          )}

          <TouchableOpacity
            onPress={handlePickImage}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              padding: 10,
            }}
          >
            <Icon type="Entypo" name="attachment" />
            <AppText size={14}>Выбрать изображение</AppText>
          </TouchableOpacity>

          <Input
            placeholder={t("title")}
            value={post.title}
            onChangeText={(text) => setValue("title", text)}
            transparent
            inputStyle={{
              fontWeight: 500,
              fontSize: 20,
            }}
          />

          <Input
            placeholder={t("post_desc")}
            value={post.description}
            onChangeText={(text) => setValue("description", text)}
            transparent
            multiline
          />
        </ScrollView>

        <View style={{ height: 150 }} />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostScr;
