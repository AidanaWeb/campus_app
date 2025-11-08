import { View, Text } from "react-native";
import React from "react";
import Carousel from "@/components/Carousel";
import { banners } from "@/mock/banners";

export default function profile() {
  return (
    <View>
      <Text>profile</Text>

      <View>
        <Carousel data={banners} />
      </View>
    </View>
  );
}
