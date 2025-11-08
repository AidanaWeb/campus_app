import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";

import Swiper from "react-native-swiper";
import { banners } from "@/mock/banners";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import Banners from "@/components/Banners";
import Carousel from "@/components/Carousel";

const { width } = Dimensions.get("window");

export default function TabOneScreen() {
  const ITEM_WIDTH = width * 0.8;
  const ITEM_HEIGHT = ITEM_WIDTH * 0.6;

  return (
    <ScrollView style={styles.container}>
      {/* <Text>Главная</Text> */}

      <View style={{ marginTop: 20 }}>
        <Banners />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
