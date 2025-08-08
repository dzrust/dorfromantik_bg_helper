import React from "react";
import { ActivityIndicator, View, ViewProps } from "react-native";

export function Spinner({ ...p }: ViewProps) {
  return (
    <View {...p}>
      <ActivityIndicator />
    </View>
  );
}
