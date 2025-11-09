import { View, Text, Image, ViewStyle, StyleProp } from "react-native";
import React, { Fragment } from "react";

interface UserAvatarProps {
  imageUrl: string | undefined;
  size?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function UserAvatar({
  imageUrl,
  size = 50,
  containerStyle,
}: UserAvatarProps) {
  if (!imageUrl) {
    return <Fragment />;
  }

  return (
    <View style={containerStyle}>
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
