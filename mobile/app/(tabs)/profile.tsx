import AppText from "@/components/AppText";
import UserAvatar from "@/components/UserAvatar";
import { RootState } from "@/store/store";
import React, { Fragment } from "react";
import { StyleSheet, ScrollView, View, Image, Dimensions } from "react-native";
import { useSelector } from "react-redux";

const { width } = Dimensions.get("window");

const IMAGE_SIZE = 100;

export default function Profile() {
  const user = useSelector((state: RootState) => state.user.info);

  if (!user) {
    return <Fragment />;
  }

  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: "black",
          width,
          height: width / 2.5,
        }}
      >
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQyfme07N2Zg8AOUuGY0Ymw-XjjA9sGwVUWQ&s",
          }}
          style={{
            width,
            height: width / 2.5,
          }}
        />
      </View>

      {user.avatar && (
        <View
          style={{
            width: IMAGE_SIZE + 20,
            height: IMAGE_SIZE + 20,
            borderRadius: 60,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            bottom: 50,
            left: 20,
          }}
        >
          <UserAvatar imageUrl={user.avatar} size={IMAGE_SIZE} />
        </View>
      )}

      <AppText>{user.name}</AppText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
