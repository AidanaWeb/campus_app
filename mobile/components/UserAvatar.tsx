import {
  View,
  Text,
  Image,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
} from "react-native";
import React, { Fragment } from "react";
import AppText from "./UI/AppText";

interface UserAvatarProps {
  imageUrl: string | undefined;
  size?: number;
  containerStyle?: StyleProp<ViewStyle>;
  letter?: string;
}

export default function UserAvatar({
  imageUrl,
  size = 50,
  containerStyle,
  letter,
}: UserAvatarProps) {
  if (!imageUrl) {
    const letterSize = size / 2;

    return (
      <View style={containerStyle}>
        <View
          style={{
            width: size,
            height: size,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "grey",
          }}
        >
          <AppText
            size={letterSize}
            style={{
              color: "#fff",
            }}
          >
            {letter}
          </AppText>
        </View>
      </View>
    );
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
