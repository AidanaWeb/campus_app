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
  // imageUrl: string | undefined;
  // letter?: string;
  size?: number;
  containerStyle?: StyleProp<ViewStyle>;
  user: {
    name: string;
    avatar?: string;
  };
}

export default function UserAvatar({
  size = 50,
  containerStyle,
  user,
}: UserAvatarProps) {
  if (!user.avatar) {
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
            {user.name[0]}
          </AppText>
        </View>
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      <Image
        source={{ uri: user.avatar }}
        style={{
          width: size,
          height: size,
          borderRadius: 50,
        }}
      />
    </View>
  );
}
