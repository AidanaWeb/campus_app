import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { Fragment } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { FeedItem } from "@/types/post.type";
import { ScrollView } from "react-native";
import AppText from "@/components/AppText";
import Icon from "@/components/Icon";
import { PostAuthor } from "@/components/Post";
import Colors from "@/constants/Theme";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useGetPostByIdQuery } from "@/store/api/posts";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const IMAGE_SIZE = width;

export default function PostDetails() {
  const { id }: { id: string } = useLocalSearchParams();
  const theme = useSelector((state: RootState) => state.theme.current);

  const { currentData } = useGetPostByIdQuery(id);
  const post: FeedItem | null = currentData?.data ?? null;

  if (!post) {
    return <Fragment />;
  }

  if (post.type === "EVENT") {
    return (
      <ScrollView style={{ flex: 1 }}>
        <PostImage url={post.coverImage} />

        <View
          style={[
            styles.panel,
            {
              backgroundColor: Colors[theme].primary,
              bottom: post.coverImage ? 40 : null,
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
      <PostImage url={post.coverImage} />

      <View
        style={[
          styles.panel,
          {
            backgroundColor: Colors[theme].primary,
            bottom: post.coverImage ? 40 : null,
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

const PostImage = (props: { url: string | undefined }) => {
  const insets = useSafeAreaInsets();

  if (!props.url) {
    return;
  }

  return (
    <View style={{}}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          position: "absolute",
          top: insets.top,
          zIndex: 20,
          backgroundColor: "#ffffff40",
          borderRadius: 50,
          paddingVertical: 15,
          paddingHorizontal: 15,
          margin: 10,
        }}
      >
        <Icon type="Ionicons" name="arrow-back" color="white" />
      </TouchableOpacity>

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

// const PostBody = () => {
//   return (
//     <View>
//       <AppText type="subText" size={14}>
//         {`
// Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborisnisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

// Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`}
//       </AppText>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  panel: {
    borderRadius: 50,
    paddingTop: 30,
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
