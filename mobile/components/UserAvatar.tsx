import { View, Text, Image } from "react-native";
import React from "react";

interface UserAvatarProps {
  imageUrl: string;
}

export default function UserAvatar({ imageUrl }: UserAvatarProps) {
  return (
    <View>
      <Image
        source={{ uri: imageUrl }}
        style={{
          width: 50,
          height: 50,
          borderRadius: 50,
        }}
      />
    </View>
  );
}
