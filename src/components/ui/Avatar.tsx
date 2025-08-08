import React from "react";
import { View, Text, Image, ViewProps } from "react-native";
import { cn } from "../../lib/cn";

type Props = ViewProps & {
  uri?: string;
  name?: string;
  size?: number;
};

export function Avatar({ uri, name, size = 40, className, ...p }: Props) {
  const initials = name
    ? name
        .split(" ")
        .map((x) => x[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
    );
  }

  return (
    <View
      style={{ width: size, height: size, borderRadius: size / 2 }}
      className={cn("items-center justify-center bg-neutral-200", className)}
      {...p}
    >
      <Text className="text-neutral-700 font-semibold">{initials}</Text>
    </View>
  );
}
