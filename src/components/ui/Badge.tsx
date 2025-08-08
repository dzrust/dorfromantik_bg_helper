import React from "react";
import { Text, View, ViewProps } from "react-native";
import { cn } from "../../lib/cn";

export function Badge({ children, className, ...p }: ViewProps & { children?: React.ReactNode }) {
  return (
    <View className={cn("px-2 h-7 min-w-[28px] items-center justify-center rounded-full bg-neutral-900", className)} {...p}>
      <Text className="text-white text-xs font-medium">{children}</Text>
    </View>
  );
}
