import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import AppText from "./UI/AppText";
import type { Author, FeedItem, Post } from "@/types/post.type";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import UserAvatar from "./UserAvatar";
import UserRoleTag from "./UserRoleTag";
import Icon from "./UI/Icon";
import { router } from "expo-router";

const { width } = Dimensions.get("window");
interface PostProps {
  post: FeedItem;
  paddingHorizontal: number;
}

export default function Post({ post, paddingHorizontal = 10 }: PostProps) {
  const IMAGE_WITH = width - (paddingHorizontal * 2 + 20);

  const theme = useSelector((state: RootState) => state.theme.current);
  const backgroundColor =
    theme === "light" ? "rgba(0,0,0, 0.05)" : "rgba(255, 255, 255, 0.05)";

  const openDetails = () => {
    router.navigate({
      pathname: "/post/[id]",
      params: { id: post.id },
    });
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
        },
      ]}
    >
      {post.author && <PostAuthor author={post.author} />}

      {post.coverImage && (
        <TouchableOpacity activeOpacity={0.7} onPress={openDetails}>
          <Image
            source={{ uri: post.coverImage }}
            style={[
              styles.image,
              {
                width: IMAGE_WITH,
                height: IMAGE_WITH,
              },
            ]}
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={openDetails}
        activeOpacity={0.5}
        style={{
          gap: 5,
        }}
      >
        {post.title && (
          <AppText
            size={18}
            type="title"
            style={{
              fontWeight: 500,
            }}
          >
            {post.title}
          </AppText>
        )}

        {post.description && (
          <AppText size={14} type="subText" numberOfLines={3}>
            {post.description}
          </AppText>
        )}
      </TouchableOpacity>

      <PostLike likes={post.likesCount} />
    </View>
  );
}

interface PostAuthorProps {
  author: Author;
}

export const PostAuthor = ({ author }: PostAuthorProps) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.navigate({
          pathname: `/social/[id]`,
          params: { id: author.id },
        })
      }
      activeOpacity={0.5}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      <UserAvatar
        user={{
          avatar: author.avatar,
          name: author.name,
        }}
      />

      <View>
        <AppText
          size={14}
          type="title"
          style={{
            fontWeight: 500,
          }}
        >
          {author.name + " " + author.lastName}
        </AppText>

        <UserRoleTag role={author.role} />
      </View>
    </TouchableOpacity>
  );
};

const PostLike = (props: { likes: number }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginTop: 10,
      }}
    >
      <TouchableOpacity>
        <Icon type="FontAwesome" name="heart-o" />
      </TouchableOpacity>
      <AppText>{props.likes}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0, 0.05)",
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 10,
  },
  image: {
    // width: IMAGE_WITH,
    // height: IMAGE_WITH,
    borderRadius: 20,
  },
});
