import AppText from "@/components/AppText";
import Button from "@/components/Button";
import UserAvatar from "@/components/UserAvatar";
import Colors from "@/constants/Theme";
import { RootState } from "@/store/store";
import React, { Fragment } from "react";
import { StyleSheet, ScrollView, View, Image, Dimensions } from "react-native";
import { useSelector } from "react-redux";

const { width } = Dimensions.get("window");

const IMAGE_SIZE = 100;

export default function Profile() {
  const user = useSelector((state: RootState) => state.user.info);
  const theme = useSelector((state: RootState) => state.theme.current);

  if (!user) {
    return <Fragment />;
  }

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://i.pinimg.com/736x/7b/e1/23/7be1232b786e13dadc29bc52abdc38ce.jpg",
          }}
          style={{
            width,
            height: width / 2.5,
          }}
          resizeMode="cover"
        />
      </View>

      <View
        style={{
          top: IMAGE_SIZE / 2,
        }}
      >
        {user.avatar && (
          <View
            style={[
              styles.avatarContainer,
              { backgroundColor: Colors[theme].primary },
            ]}
          >
            <UserAvatar imageUrl={user.avatar} size={IMAGE_SIZE} />
          </View>
        )}

        <View
          style={{
            minHeight: 100,
            borderRadius: 50,
            backgroundColor: Colors[theme].primary,
            top: IMAGE_SIZE / 2,
          }}
        >
          <View style={styles.panelContent}>
            <AppText type="title" size={20} weight={"bold"}>
              {user.name + " " + user.lastName}
            </AppText>

            {user.bio && <AppText type="subText">{user.bio}</AppText>}

            <Button
              containerStyle={{
                marginTop: 20,
              }}
              title={"Подписаться"}
              isActive
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: "black",
    width,
    height: width / 2.5,
    position: "absolute",
  },
  avatarContainer: {
    width: IMAGE_SIZE + 20,
    height: IMAGE_SIZE + 20,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    left: 40,
    position: "absolute",
    zIndex: 1,
  },

  panelContent: {
    paddingHorizontal: 30,
    gap: 10,
    top: IMAGE_SIZE / 2 + 40,
  },
});
