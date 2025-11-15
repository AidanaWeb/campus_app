import { View, Text, Dimensions, FlatList } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useGetUserByIdQuery } from "@/store/api/users";
import { FeedItem } from "@/types/post.type";
import { Image } from "react-native";
import UserAvatar from "@/components/UserAvatar";
import Colors from "@/constants/Theme";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import AppText from "@/components/UI/AppText";
import { User } from "@/types/user.type";
import Button from "@/components/UI/Button";
import Icon from "@/components/UI/Icon";
import { StyleSheet } from "react-native";
import { HeaderButton } from "@/components/UI/HeaderButton";
import { useGetPostsQuery } from "@/store/api/posts";
import Post from "@/components/Post";

const { width } = Dimensions.get("window");
const COVER_WIDTH = width;
const COVER_HEIGHT = width / 1.5;

const IMAGE_SIZE = 100;

interface propsWithId {
  id?: string;
}

export default function SocialDetailScr({ id: registeredUserId }: propsWithId) {
  const { id }: propsWithId = useLocalSearchParams();
  const userId = registeredUserId ?? id;
  const { currentData, isLoading, isError } = useGetUserByIdQuery(userId, {
    skip: !userId,
  });
  const { currentData: postsData } = useGetPostsQuery(
    {
      authorId: userId,
    },
    {
      skip: !userId,
    }
  );

  const user: User | null = currentData?.data ?? null;
  const posts: FeedItem[] = Array.isArray(postsData?.data)
    ? postsData.data
    : [];

  const theme = useSelector((state: RootState) => state.theme.current);

  if (isLoading) {
    return null;
  }

  if (isError || !user) {
    return null;
  }

  return (
    <FlatList
      ListHeaderComponent={<ProfileTop user={user} />}
      showsVerticalScrollIndicator={false}
      data={posts}
      renderItem={({ item }) => (
        <View style={{ paddingHorizontal: 10 }}>
          <Post post={item} paddingHorizontal={10} />
        </View>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      ListFooterComponent={() => <View style={{ height: 100 }} />}
    />
  );
}

const ProfileTop = ({ user }: { user: User }) => {
  const theme = useSelector((state: RootState) => state.theme.current);

  return (
    <View style={styles.profileTopWrap}>
      <HeaderButton
        onPress={() => router.back()}
        icon={{ type: "Ionicons", name: "arrow-back" }}
      />

      <UserCoverImage coverImage={user.coverImage} />

      <UserAvatar
        containerStyle={[
          styles.avatarContainer,
          { backgroundColor: Colors[theme].primary },
        ]}
        size={IMAGE_SIZE}
        user={{
          name: user.name,
          avatar: user.avatar,
        }}
      />

      <View style={[styles.panel, { backgroundColor: Colors[theme].primary }]}>
        <View style={styles.panelContent}>
          <AppText type="title" size={20} weight={"bold"}>
            {user.name + " " + user.lastName}
          </AppText>

          {user.bio && <AppText type="subText">{user.bio}</AppText>}

          <UserAdditionalInfo createdAt={user.createdAt} email={user.email} />

          <SubscribeButton />
        </View>
      </View>
    </View>
  );
};

const UserCoverImage = (props: { coverImage: string | undefined }) => {
  if (!props.coverImage) {
    return null;
  }

  return (
    <Image
      source={{
        uri: props.coverImage,
      }}
      style={{
        width: COVER_WIDTH,
        height: COVER_HEIGHT,
        position: "absolute",
      }}
      resizeMode="cover"
    />
  );
};

const SubscribeButton = () => {
  return (
    <Button
      containerStyle={{
        marginTop: 10,
      }}
      title={"Подписаться"}
      isActive
    />
  );
};

const UserAdditionalInfo = (props: { createdAt: string; email: string }) => {
  const registerDate = new Date(props.createdAt).toLocaleDateString();

  return (
    <View style={{ gap: 5 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 10,
        }}
      >
        <Icon type="Entypo" name="email" size={18} opacity={0.3} />
        <AppText type="subText">{props.email}</AppText>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Icon type="Ionicons" name="calendar-outline" size={18} opacity={0.3} />
        <AppText type="subText">Дата регистрации: {registerDate}</AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileTopWrap: {
    marginBottom: 20,
  },
  avatarContainer: {
    width: IMAGE_SIZE + 20,
    height: IMAGE_SIZE + 20,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: COVER_HEIGHT - 50 - IMAGE_SIZE / 2,
    left: 40,
    zIndex: 10,
  },
  panel: {
    marginTop: COVER_HEIGHT - 50,
    borderRadius: 50,
  },
  panelContent: {
    marginTop: IMAGE_SIZE / 2 + 20 + 20,
    minHeight: 100,
    paddingHorizontal: 20,
    gap: 5,
  },
});
