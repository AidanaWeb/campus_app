import { Tabs, usePathname } from "expo-router";
import React, { ReactNode } from "react";
import Colors from "@/constants/Theme";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { BlurView } from "expo-blur";
import UserAvatar from "@/components/UserAvatar";
import Icon from "@/components/UI/Icon";

function TabBarIcon(props: { icon: ReactNode; isFocused: boolean }) {
  return (
    <View
      style={{
        borderRadius: 50,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          backgroundColor: props.isFocused
            ? "rgba(0, 0, 0, 0.1)"
            : "transparent",
          height: 50,
          width: 70,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 50,
          overflow: "hidden",
        }}
      >
        {props.icon}
      </View>
    </View>
  );
}

export default function TabLayout() {
  const theme = useSelector((state: RootState) => state.theme.current);
  const user = useSelector((state: RootState) => state.user.info);
  const pathname = usePathname();

  const backgroundColor = theme === "light" ? "#fff" : "#000";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[theme].secondary,
        tabBarInactiveTintColor: "#000",
        headerShown: true,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarBadgeStyle: styles.tabBarBadge,
        sceneStyle: {
          backgroundColor,
        },
        headerStyle: {
          backgroundColor,
          borderBottomWidth: 0,
          height: 110,
        },
        headerTitleAlign: "center",
        headerShadowVisible: false,

        tabBarBackground: () => (
          <BlurView intensity={60} tint={theme} style={styles.blurView} />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Главная",
          headerTitle: "Главная",
          tabBarLabel: "",

          tabBarIcon: ({ color }) => {
            const isFocused = pathname === "/";
            return (
              <TabBarIcon
                isFocused={isFocused}
                icon={
                  <Octicons
                    name={isFocused ? "home-fill" : "home"}
                    size={24}
                    color={color}
                  />
                }
              />
            );
          },
          headerRight: () => (
            <View style={styles.headerSide}>
              <Icon type="Ionicons" name="notifications-outline" />

              {user?.id && (
                <UserAvatar
                  user={{
                    avatar: user.avatar,
                    name: user.name,
                  }}
                />
              )}
            </View>
          ),
          headerLeft: () => (
            <View style={styles.headerSide}>
              <Icon type="Ionicons" name="settings-outline" opacity={0.3} />
              {/* <ToggleThemeButton /> */}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="createPost"
        options={{
          title: "Создать",
          tabBarLabel: "",

          tabBarIcon: ({ color }) => {
            const isFocused = pathname === "/createPost";
            return (
              <TabBarIcon
                isFocused={isFocused}
                icon={
                  <Ionicons
                    name={isFocused ? "add-circle" : "add-circle-outline"}
                    size={30}
                    color={color}
                  />
                }
              />
            );
          },
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Профиль",
          tabBarLabel: "",
          headerShown: false,

          tabBarIcon: ({ color }) => {
            const isFocused = pathname === "/profile";
            return (
              <TabBarIcon
                isFocused={isFocused}
                icon={
                  <MaterialCommunityIcons
                    name={
                      isFocused ? "account-school" : "account-school-outline"
                    }
                    size={24}
                    color={color}
                  />
                }
              />
            );
          },
          tabBarBadge: 4,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "rgba(124, 124, 124, 0.32)",
    position: "absolute",
    borderRadius: 50,
    borderTopWidth: 0,
    marginHorizontal: 50,
    height: 70,
    marginBottom: 20,
    alignItems: "center",
    elevation: 5,
    overflow: "hidden",
    paddingBottom: 0,
    paddingHorizontal: 0,
  },
  tabBarItem: {
    height: 80,
  },
  tabBarIcon: {
    flex: 1,
  },
  tabBarBadge: {
    top: 5,
  },
  blurView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  headerSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginHorizontal: 10,
  },
});
