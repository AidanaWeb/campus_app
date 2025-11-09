import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  StatusBar,
} from "react-native";

const HEADER_HEIGHT = 250;
const NAVBAR_HEIGHT = 60;

export default function Profile() {
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

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* Картинка */}
      <Animated.View
        style={[
          styles.headerImageContainer,
          { transform: [{ translateY: headerTranslate }] },
        ]}
      >
        <Image
          source={{
            uri: "https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg",
          }}
          style={styles.headerImage}
        />
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
        {[...Array(20).keys()].map((i) => (
          <View key={i} style={styles.card}>
            <Text style={{ fontSize: 16 }}>Пост #{i + 1}</Text>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
}

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
  },
  navbarTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
    marginTop: 60,
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
