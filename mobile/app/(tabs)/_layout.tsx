import { router, Tabs, usePathname } from "expo-router";
import React, { ReactNode } from "react";
import Colors from "@/constants/Theme";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { BlurView } from "expo-blur";
import UserAvatar from "@/components/UserAvatar";
import Icon from "@/components/UI/Icon";
import ToggleThemeButton from "@/components/ToggleThemeButton";
import { useTranslation } from "react-i18next";

function TabBarIcon(props: { icon: ReactNode; isFocused: boolean }) {
  const theme = useSelector((state: RootState) => state.theme.current);
  const backgroundColor =
    theme === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)";

  return (
    <View
      style={{
        borderRadius: 50,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          backgroundColor: props.isFocused ? backgroundColor : "transparent",
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
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.current);
  const user = useSelector((state: RootState) => state.user.info);
  const pathname = usePathname();

  const backgroundColor = theme === "light" ? "#fff" : "#000";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[theme].secondary,
        tabBarInactiveTintColor: Colors[theme].secondary,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarBadgeStyle: styles.tabBarBadge,
        sceneStyle: {
          backgroundColor,
        },
        headerShown: true,
        headerStyle: {
          backgroundColor,
          borderBottomWidth: 0,
          height: 110,
        },
        headerTitleStyle: {
          color: Colors[theme].text,
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
          title: t("mainScr"),
          headerTitle: t("mainScr"),
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
              <TouchableOpacity onPress={() => router.push("/settings")}>
                <Icon type="Ionicons" name="settings-outline" opacity={0.3} />
              </TouchableOpacity>
              <ToggleThemeButton />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="createPost"
        options={{
          title: t("create"),
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
          // tabBarBadge: 4,
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
