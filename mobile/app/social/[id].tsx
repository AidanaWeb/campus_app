import { View, Text, Dimensions, FlatList } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useGetUserByIdQuery } from "@/store/api/users";
import { Author } from "@/types/post.type";
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

const { width } = Dimensions.get("window");

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

  const user: User | null = currentData?.data ?? null;

  const theme = useSelector((state: RootState) => state.theme.current);

  if (isLoading) {
    return null;
  }

  if (isError || !user) {
    return null;
  }

  if (user.coverImage) {
    return (
      <FlatList
        ListHeaderComponent={<ProfileTop user={user} />}
        data={[]}
        renderItem={() => <></>}
      />
    );
  }

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

  return (
    <View>
      <View style={styles.imageContainer}>
        <HeaderButton
          onPress={() => router.back()}
          icon={{ type: "Ionicons", name: "arrow-back" }}
        />

        <Image
          source={{
            uri: user.coverImage,
          }}
          style={{
            width,
            height: width / 1.5,
          }}
          resizeMode="cover"
        />
      </View>

      <View
        style={{
          top: IMAGE_SIZE * 1.5,
        }}
      >
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

        <View
          style={{
            minHeight: 100,
            borderRadius: 50,
            backgroundColor: Colors[theme].primary,
            top: IMAGE_SIZE / 2,
          }}
        >
          <View style={styles.panelContent}>
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
};

const ListHeader = (props: { user: User }) => {
  const theme = useSelector((state: RootState) => state.theme.current);

  return (
    <View>
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
        {props.user.avatar && (
          <UserAvatar
            containerStyle={[
              styles.avatarContainer,
              { backgroundColor: Colors[theme].primary },
            ]}
            imageUrl={props.user.avatar}
            size={IMAGE_SIZE}
          />
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
              {props.user.name + " " + props.user.lastName}
            </AppText>

            {props.user.bio && (
              <AppText type="subText">{props.user.bio}</AppText>
            )}

            <RegisterDate createdAt={props.user.createdAt} />

            <SubscribeButton />
          </View>
        </View>
      </View>
    </View>
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
