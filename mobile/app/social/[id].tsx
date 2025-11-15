import { View, Text, Dimensions, FlatList } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useGetUserByIdQuery } from "@/store/api/users";
import { Author, FeedItem } from "@/types/post.type";
import { ScrollView } from "react-native";
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
import Post, { PostAuthor } from "@/components/Post";

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

  // return (
  //   <ScrollView
  //     style={{
  //       flex: 1,
  //     }}
  //   >
  //     <View style={styles.imageContainer}>
  //       <HeaderButton
  //         onPress={() => router.back()}
  //         icon={{ type: "Ionicons", name: "arrow-back" }}
  //       />

  //       <Image
  //         source={{
  //           uri: user.coverImage,
  //         }}
  //         style={{
  //           width,
  //           height: width / 1.5,
  //         }}
  //         resizeMode="cover"
  //       />
  //     </View>

  //     <View
  //       style={{
  //         top: IMAGE_SIZE * 1.5,
  //       }}
  //     >
  //       <UserAvatar
  //         containerStyle={[
  //           styles.avatarContainer,
  //           { backgroundColor: Colors[theme].primary },
  //         ]}
  //         size={IMAGE_SIZE}
  //         user={{
  //           name: user.name,
  //           avatar: user.avatar,
  //         }}
  //       />

  //       <View
  //         style={{
  //           minHeight: 100,
  //           borderRadius: 50,
  //           backgroundColor: Colors[theme].primary,
  //           top: IMAGE_SIZE / 2,
  //         }}
  //       >
  //         <View style={styles.panelContent}>
  //           <View style={{ paddingHorizontal: 10, gap: 5 }}>
  //             <AppText type="title" size={20} weight={"bold"}>
  //               {user.name + " " + user.lastName}
  //             </AppText>

  //             {user.bio && <AppText type="subText">{user.bio}</AppText>}

  //             <RegisterDate createdAt={user.createdAt} />

  //             <SubscribeButton />
  //           </View>

  //           <View style={{ gap: 10, marginTop: 20 }}>
  //             <AppText type="title" size={16} style={{ marginLeft: 10 }}>
  //               Посты
  //             </AppText>

  //             {/* {posts.map((post) => {
  //               return <Post key={post.id} post={post} />;
  //             })} */}
  //           </View>
  //         </View>
  //       </View>
  //     </View>
  //   </ScrollView>
  // );
}

const ProfileTop = ({ user }: { user: User }) => {
  const theme = useSelector((state: RootState) => state.theme.current);

  if (user) {
    return (
      <View
        style={{
          marginBottom: 20,
        }}
      >
        <HeaderButton
          onPress={() => router.back()}
          icon={{ type: "Ionicons", name: "arrow-back" }}
        />

        <Image
          source={{
            uri: user.coverImage,
          }}
          style={{
            width: COVER_WIDTH,
            height: COVER_HEIGHT,
            position: "absolute",
          }}
          resizeMode="cover"
        />

        <UserAvatar
          containerStyle={[
            {
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
            { backgroundColor: Colors[theme].primary },
          ]}
          size={IMAGE_SIZE}
          user={{
            name: user.name,
            avatar: user.avatar,
          }}
        />

        <View
          style={{
            marginTop: COVER_HEIGHT - 50,
            borderRadius: 50,
            backgroundColor: Colors[theme].primary,
          }}
        >
          <View
            style={{
              marginTop: IMAGE_SIZE / 2 + 20 + 20,
              minHeight: 100,
            }}
          >
            <View
              style={{
                paddingHorizontal: 10,
                gap: 10,
              }}
            >
              <View style={{ paddingHorizontal: 10, gap: 5 }}>
                <AppText type="title" size={20} weight={"bold"}>
                  {user.name + " " + user.lastName}
                </AppText>

                {user.bio && <AppText type="subText">{user.bio}</AppText>}

                <RegisterDate createdAt={user.createdAt} />

                <SubscribeButton />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
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

const RegisterDate = (props: { createdAt: string }) => {
  const registerDate = new Date(props.createdAt).toLocaleDateString();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginTop: 10,
      }}
    >
      <Icon type="Ionicons" name="calendar-outline" size={18} opacity={0.3} />
      <AppText type="subText">Дата регистрации: {registerDate}</AppText>
    </View>
  );
};

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
    paddingHorizontal: 10,
    gap: 10,
    top: IMAGE_SIZE / 2 + 40,
  },
});
