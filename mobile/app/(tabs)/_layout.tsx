import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Redirect, Tabs, usePathname } from "expo-router";
import React from "react";

import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Главная",
          tabBarIcon: ({ color }) => (
            <Octicons
              name={pathname === "/" ? "home-fill" : "home"}
              size={24}
              color={color}
            />
          ),
          headerRight: () => (
            <Ionicons
              name="notifications-outline"
              size={24}
              color="black"
              style={{ marginRight: 20 }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="post/index"
        options={{
          title: "Создать",
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name={pathname === "/post" ? "add-circle" : "add-circle-outline"}
              size={30}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Профиль",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name={
                pathname === "/profile"
                  ? "account-school"
                  : "account-school-outline"
              }
              size={24}
              color={color}
            />
          ),
          tabBarBadge: 4,
        }}
      />
    </Tabs>
  );
}
