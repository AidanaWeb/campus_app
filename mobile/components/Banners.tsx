import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import { banners } from "@/mock/banners";
import Swiper from "react-native-swiper";
const { width } = Dimensions.get("window");

export default function Banners() {
  const ITEM_WIDTH = width - 20;
  const ITEM_HEIGHT = ITEM_WIDTH * 0.5;

  return (
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
  );
}
