import { Drawer } from "expo-router/drawer";

export default function HomeLayout() {
  return (
    <Drawer
      initialRouteName="index"
      screenOptions={{
        headerShown: true,
        drawerType: "slide",
        drawerStyle: {
          backgroundColor: "#fff",
          width: 240,
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "Главная",
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: "Настройки",
        }}
      />
    </Drawer>
  );
}
