import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";

import Swiper from "react-native-swiper";
import { banners } from "@/mock/banners";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";

const { width } = Dimensions.get("window");

export default function TabOneScreen() {
  const ITEM_WIDTH = width * 0.8;
  const ITEM_HEIGHT = ITEM_WIDTH * 0.6;

  return (
    <ScrollView style={styles.container}>
      <Text>Главная</Text>

      <Swiper
        autoplay
        loop
        showsPagination
        autoplayTimeout={3}
        dotColor="rgba(255,255,255,0.4)"
        activeDotColor="#fff"
        paginationStyle={{
          bottom: 10,
        }}
        containerStyle={{
          width: width,
        }}
      >
        {banners.map((banner) => (
          <View
            key={banner.id}
            style={{
              borderRadius: 16,
              overflow: "hidden",
              width: ITEM_WIDTH,
              height: ITEM_HEIGHT,
              // marginHorizontal: (width - ITEM_WIDTH) / 2,
            }}
          >
            <Image
              source={{ uri: banner.image }}
              style={{
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
                marginHorizontal: 16,
                borderRadius: 16,
              }}
              resizeMode="cover"
            />
          </View>
        ))}
      </Swiper>
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
