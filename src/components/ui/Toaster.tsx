import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import { useToast } from "./Toast";

export function Toaster() {
  const { toasts } = useToast();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, { toValue: toasts.length ? 1 : 0, duration: 150, useNativeDriver: true }).start();
  }, [toasts.length]);

  if (!toasts.length) return null;
  return (
    <Animated.View style={{ opacity }} className="absolute left-0 right-0 bottom-8 items-center pointer-events-none">
      <View className="bg-black rounded-2xl px-4 py-2">
        <Text className="text-white">{toasts[toasts.length - 1].text}</Text>
      </View>
    </Animated.View>
  );
}
