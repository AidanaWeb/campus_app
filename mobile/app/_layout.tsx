import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, store } from "@/store/store";
import { useColorScheme } from "react-native";
import { getDataFromStorage } from "@/utils/storage";
import { setTheme } from "@/store/slices/themeSlice";
import Colors from "@/constants/Theme";
import { users } from "@/mock/users";
import { setUserInfo } from "@/store/slices/userSlice";
export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (!loaded) return;

    const timerId = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1000);

    return () => clearTimeout(timerId);

    // SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  );
}

function RootLayoutNav() {
  const dispatch = useDispatch();
  const OStheme = useColorScheme();
  const themeState = useSelector((state: RootState) => state.theme.current);

  useEffect(() => {
    const initTheme = async () => {
      const themeFromStorage = await getDataFromStorage("app_theme");

      if (themeFromStorage) {
        dispatch(setTheme(themeFromStorage));
        return;
      }

      dispatch(setTheme(OStheme));
    };

    initTheme();
  }, [OStheme]);

  // useEffect(() => {
  //   const mockUser = {
  //     id: "cmhxo53s3000aunvs4ndhl9ul",
  //     name: "Askar",
  //     lastName: "Temirbayev",
  //     email: "askar.teacher@mail.com",
  //     bio: "Преподаю основы программирования и баз данных. Люблю объяснять сложные вещи простыми словами.",
  //     phone: "+77020000001",
  //     role: "TEACHER",
  //     facultyId: null,
  //     avatar: "https://i.pravatar.cc/150?img=11",
  //     coverImage: "https://picsum.photos/seed/askar/800/200",
  //     createdAt: "2025-11-13T16:54:02.595Z",
  //     updatedAt: "2025-11-14T12:29:59.469Z",
  //   };
  //   dispatch(setUserInfo(mockUser));
  // }, [users.length]);

  return (
    <SafeAreaProvider>
      <ThemeProvider value={DefaultTheme}>
        <Stack
          screenOptions={{
            contentStyle: {
              backgroundColor: Colors[themeState].primary,
            },
            headerStyle: {
              backgroundColor: Colors[themeState].primary,
            },
            headerShadowVisible: false,
            headerTitleStyle: {
              color: Colors[themeState].text,
            },
            headerBackButtonDisplayMode: "minimal",
            headerTintColor: Colors[themeState].secondary,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          <Stack.Screen
            name="post/[id]"
            options={{
              headerShown: false,
              headerTitle: "Пост",
            }}
          />
          <Stack.Screen
            name="social/[id]"
            options={{
              headerShown: false,
              headerTitle: "Профиль",
            }}
          />
          <Stack.Screen
            name="social/signup"
            options={{
              headerShown: true,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="social/login"
            options={{
              headerShown: true,
              headerTitle: "",
            }}
          />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
