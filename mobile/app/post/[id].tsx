import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { Fragment, useEffect, useState, useRef } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { posts } from "@/mock/posts";
import { Post, Event } from "@/types/post.type";
import { StatusBar, ScrollView } from "react-native";
import AppText from "@/components/AppText";
import Icon from "@/components/Icon";

const { width } = Dimensions.get("window");

const IMAGE_SIZE = width;
const HEADER_HEIGHT = IMAGE_SIZE;
const NAVBAR_HEIGHT = 60;

export default function PostDetails() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<Post | Event | null>(null);

  useEffect(() => {
    const found = posts.find((item) => item.id === Number(id));
    if (found) setPost(found);
  }, [id]);

  if (!post) {
    return <Fragment />;
  }

  if (post.type === "event") {
    return (
      <ScrollView style={{ flex: 1 }}>
        <PostImage url={post.coverImage} />

        <View style={styles.panel}>
          <View style={styles.desc}>
            {post.title && (
              <AppText type="title" size={24} weight={"bold"}>
                {post.title}
              </AppText>
            )}

            <AppText type={"subText"} size={14}>
              {post.body}
            </AppText>
          </View>

          <EventProps location={post.location} startsAt={post.startsAt} />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <PostImage url={post.coverImage} />

      <View style={styles.panel}>
        <View style={styles.desc}>
          {post.title && (
            <AppText type="title" size={24} weight={"bold"}>
              {post.title}
            </AppText>
          )}

          <AppText type={"subText"} size={14}>
            {post.body}
          </AppText>
        </View>
      </View>
    </ScrollView>
  );
}

const PostImage = (props: { url: string | undefined }) => {
  if (!props.url) {
    return;
  }

  return (
    <View style={{}}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          position: "absolute",
          top: 10,
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

const EventProps = (props: { location: string; startsAt: Date }) => {
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
          {props.startsAt.toLocaleString("ru-RU", {
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

const styles = StyleSheet.create({
  panel: {
    borderRadius: 50,
    backgroundColor: "#fff",
    bottom: 40,
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  image: {
    width: width,
    height: width,
  },
  desc: {
    gap: 10,
  },

  eventPropsLine: {
    marginTop: 20,
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
