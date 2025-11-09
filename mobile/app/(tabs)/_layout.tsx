import { Tabs, usePathname } from "expo-router";
import React, { ReactNode } from "react";
import Colors from "@/constants/Theme";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { BlurView } from "expo-blur";
import UserAvatar from "@/components/UserAvatar";
import Icon from "@/components/Icon";
import { setTheme } from "@/store/slices/themeSlice";

function TabBarIcon(props: { icon: ReactNode; isFocused: boolean }) {
  return (
    <View
      style={{
        backgroundColor: props.isFocused ? "rgba(0, 0, 0, 0.1)" : "",
        height: 50,
        width: 70,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
      }}
    >
      {props.icon}
    </View>
  );
}

const ToggleThemeButton = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.current);

  if (theme === "dark") {
    return (
      <TouchableOpacity
        onPress={() => dispatch(setTheme("light"))}
        style={{
          borderRadius: 50,
          paddingVertical: 5,
          paddingHorizontal: 5,
        }}
      >
        <Icon type="AntDesign" name="sun" color="#fff" />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => dispatch(setTheme("dark"))}
      style={{
        borderRadius: 50,
        paddingVertical: 5,
        paddingHorizontal: 5,
      }}
    >
      <Icon type="FontAwesome" name="moon-o" color="#000" />
    </TouchableOpacity>
  );
};

export default function TabLayout() {
  const theme = useSelector((state: RootState) => state.theme.current);
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
              <UserAvatar imageUrl="https://randomuser.me/api/portraits/women/44.jpg" />
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
        name="post/index"
        options={{
          title: "Создать",
          tabBarLabel: "",

          tabBarIcon: ({ color }) => {
            const isFocused = pathname === "/post";
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
