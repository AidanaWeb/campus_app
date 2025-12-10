import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Share,
  Alert,
} from "react-native";
import React, { Fragment } from "react";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import { FeedItem } from "@/types/post.type";
import { ScrollView } from "react-native";
import AppText from "@/components/UI/AppText";
import Icon from "@/components/UI/Icon";
import { PostAuthor } from "@/components/Post";
import Colors from "@/constants/Theme";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useDeletePostMutation, useGetPostByIdQuery } from "@/store/api/posts";
import { HeaderButton } from "@/components/UI/HeaderButton";
import { useTranslation } from "react-i18next";
import { SERVER_URL } from "@/config/api";

const { width } = Dimensions.get("window");
const IMAGE_SIZE = width;

export default function PostDetails() {
  const [deletePost] = useDeletePostMutation();

  const { id }: { id: string } = useLocalSearchParams();
  const theme = useSelector((state: RootState) => state.theme.current);
  const user = useSelector((state: RootState) => state.user.info);
  const { t } = useTranslation();

  const { currentData } = useGetPostByIdQuery(id);
  const post: FeedItem | null = currentData?.data ?? null;

  const imagePath = post?.coverImage?.includes("uploads/")
    ? "" + SERVER_URL + post?.coverImage
    : post?.coverImage;

  const handleSharePost = async () => {
    const message = `
    ${post?.title}

    ${post?.description}
    `;

    try {
      await Share.share({
        message,
        title: "CampusApp",
      });
    } catch (error) {
      Alert.alert(t("error_occured"), t("try_later"));
    }
  };

  const handleDeletePost = () => {
    if (!user?.id || user.id !== post?.author.id) return;

    Alert.alert("Удалить пост?", "Отменить действие будет нельзя", [
      {
        text: "удалить",
        onPress: () => handleDelete(),
      },
      {
        text: "отмена",
      },
    ]);
  };

  const handleDelete = async () => {
    if (!post?.id) return;

    try {
      await deletePost({ postId: post.id }).unwrap();
      Alert.alert("Пост удален");
      router.replace("/");
    } catch (error) {
      console.log(error);
      Alert.alert(t("error_occured"), t("try_later"));
    }
  };

  if (!post) {
    return <Fragment />;
  }

  if (post.type === "EVENT") {
    return (
      <ScrollView style={{ flex: 1 }}>
        <PostImage
          url={imagePath}
          handleShare={handleSharePost}
          showDeleteButton={Boolean(user?.id && user.id === post.author.id)}
          handleDeletePost={() => handleDeletePost()}
        />

        <View
          style={[
            styles.panel,
            {
              backgroundColor: Colors[theme].primary,
              bottom: post.coverImage ? 40 : null,
              paddingTop: post.coverImage ? 30 : 0,
            },
          ]}
        >
          <View style={styles.title}>
            {post.title && (
              <AppText type="title" size={24} weight={"bold"}>
                {post.title}
              </AppText>
            )}

            <PostAuthor author={post.author} />
          </View>

          <EventProps location={post.location} startsAt={post.startsAt} />

          <PostBody description={post.description} />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <PostImage
        url={imagePath}
        handleShare={handleSharePost}
        showDeleteButton={Boolean(user?.id && user.id === post.author.id)}
        handleDeletePost={() => handleDeletePost()}
      />

      <View
        style={[
          styles.panel,
          {
            backgroundColor: Colors[theme].primary,
            bottom: post.coverImage ? 40 : null,
            paddingTop: post.coverImage ? 30 : 0,
          },
        ]}
      >
        <View style={styles.title}>
          {post.title && (
            <AppText type="title" size={24} weight={"bold"}>
              {post.title}
            </AppText>
          )}

          <PostAuthor author={post.author} />
        </View>

        <PostBody description={post.description} />
      </View>
    </ScrollView>
  );
}

const PostImage = (props: {
  url: string | undefined;
  handleShare: () => void;
  showDeleteButton: boolean;
  handleDeletePost: () => void;
}) => {
  if (!props.url) {
    return (
      <View
        style={{
          height: 150,
        }}
      >
        <HeaderButton
          onPress={() => router.back()}
          icon={{ type: "Ionicons", name: "arrow-back" }}
        />

        <HeaderButton
          onPress={() => props.handleShare()}
          icon={{ type: "Entypo", name: "share" }}
          containerStyle={{
            right: 0,
          }}
        />

        {props.showDeleteButton && (
          <HeaderButton
            onPress={props.handleDeletePost}
            icon={{ type: "MaterialIcons", name: "delete-outline" }}
            containerStyle={{
              right: 0,
              top: 50,
            }}
          />
        )}
      </View>
    );
  }

  return (
    <View style={{}}>
      <HeaderButton
        onPress={() => router.back()}
        icon={{ type: "Ionicons", name: "arrow-back" }}
      />
      <HeaderButton
        onPress={() => props.handleShare()}
        icon={{ type: "Entypo", name: "share" }}
        containerStyle={{
          right: 0,
        }}
      />

      {props.showDeleteButton && (
        <HeaderButton
          onPress={props.handleDeletePost}
          icon={{ type: "MaterialIcons", name: "delete-outline" }}
          containerStyle={{
            right: 0,
            top: 120,
          }}
        />
      )}

      <Image
        source={{
          uri: props.url,
        }}
        style={styles.image}
      />
    </View>
  );
};

const EventProps = (props: { location: string; startsAt: string }) => {
  return (
    <View style={styles.eventPropsLine}>
      <View style={styles.eventProp}>
        <Icon type="AntDesign" name="clock-circle" opacity={0.3} size={20} />
        <AppText
          type="subText"
          style={{
            flexShrink: 1,
          }}
        >
          {new Date(props.startsAt).toLocaleString("ru-RU", {
            dateStyle: "full",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </AppText>
      </View>

      <View style={styles.eventProp}>
        <Icon type="Ionicons" name="location-outline" opacity={0.3} size={20} />
        <AppText
          type="subText"
          style={{
            flexShrink: 1,
          }}
        >
          {props.location}
        </AppText>
      </View>
    </View>
  );
};

const PostBody = (props: { description: string }) => {
  return (
    <View>
      <AppText type="subText" size={14}>
        {props.description}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  panel: {
    // paddingTop: 30,
    borderRadius: 50,
    paddingHorizontal: 30,
    gap: 20,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  title: {
    gap: 10,
  },

  eventPropsLine: {
    // marginTop: 20,
    gap: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eventProp: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    maxWidth: "45%",
  },
});
