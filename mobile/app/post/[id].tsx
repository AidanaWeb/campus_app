import {
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { Fragment, useEffect, useState, useRef } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { posts } from "@/mock/posts";
import { post } from "@/types/post.type";
import { StatusBar } from "react-native";
import AppText from "@/components/AppText";
import Icon from "@/components/Icon";

const { width } = Dimensions.get("window");

const IMAGE_SIZE = width;
const HEADER_HEIGHT = IMAGE_SIZE;
const NAVBAR_HEIGHT = 60;

export default function PostDetails() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<post | null>(null);

  useEffect(() => {
    const found = posts.find((item) => item.id === Number(id));
    if (found) setPost(found);
  }, [id]);

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT - NAVBAR_HEIGHT],
    outputRange: [0, -(HEADER_HEIGHT - NAVBAR_HEIGHT)],
    extrapolate: "clamp",
  });

  const navbarOpacity = scrollY.interpolate({
    inputRange: [
      HEADER_HEIGHT - NAVBAR_HEIGHT - 20,
      HEADER_HEIGHT - NAVBAR_HEIGHT,
    ],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  if (!post) {
    return <Fragment />;
  }

  return (
    // <View>
    //   <ScrollView>
    //     <ListHeader image={post.coverImage} />
    //   </ScrollView>
    // </View>

    <View style={styles.container}>
      {/* <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      /> */}

      {/* Картинка */}
      <Animated.View
        style={[
          styles.headerImageContainer,
          { transform: [{ translateY: headerTranslate }] },
        ]}
      >
        <TouchableOpacity
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
            uri: post.coverImage,
          }}
          style={styles.headerImage}
        />

        <View
          style={{
            borderRadius: 50,
            backgroundColor: "#fff",
            height: 80,
            bottom: 40,
          }}
        ></View>
      </Animated.View>

      {/* Панель */}
      <Animated.View style={[styles.navbar, { opacity: navbarOpacity }]}>
        <Text style={styles.navbarTitle}>Новости университета</Text>
      </Animated.View>

      {/* Контент */}
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View
          style={{
            gap: 10,
          }}
        >
          {post.title && (
            <AppText type="title" size={24} weight={"bold"}>
              {post.title}
            </AppText>
          )}

          <AppText type={"subText"} size={14}>
            {post.body}
          </AppText>
        </View>

        <View
          style={{
            marginTop: 20,
          }}
        >
          {[...Array(20).keys()].map((i) => (
            <View key={i} style={styles.card}>
              <Text style={{ fontSize: 16 }}>Пост #{i + 1}</Text>
            </View>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const ListHeader = (props: { image: string | undefined }) => {
  return (
    <View>
      {props.image && (
        <Image
          source={{ uri: props.image }}
          style={{
            width: IMAGE_SIZE,
            height: IMAGE_SIZE,
          }}
          resizeMode="cover"
        />
      )}

      <View
        style={{
          borderRadius: 50,
          backgroundColor: "#fff",
          height: 60,
          bottom: 30,
        }}
      ></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerImageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    overflow: "hidden",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  navbar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: NAVBAR_HEIGHT + StatusBar.currentHeight!,
    backgroundColor: "#6C63FF",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 10,
    zIndex: 10,
  },
  navbarTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,

    // marginTop: 60,
  },
  card: {
    height: 120,
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
