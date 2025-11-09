import { View, Text, Image } from "react-native";
import React, { Fragment } from "react";

interface UserAvatarProps {
  imageUrl: string | undefined;
  size?: number;
}

export default function UserAvatar({ imageUrl, size = 50 }: UserAvatarProps) {
  if (!imageUrl) {
    return <Fragment />;
  }

  return (
    <View>
      <Image
        source={{ uri: imageUrl }}
        style={{
          width: size,
          height: size,
          borderRadius: 50,
        }}
      />
    </View>
  );
}
