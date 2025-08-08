import React from "react";
import { View, Text, ViewProps } from "react-native";
import { cn } from "../../lib/cn";
import { tokens } from "../../theme/tokens";

export function Card({ className, ...p }: ViewProps) {
  return <View className={cn(tokens.radiusLg, tokens.surface, "p-4", tokens.shadow, className)} {...p} />;
}
export function CardTitle({ children }: { children?: React.ReactNode }) {
  return <Text className="text-xl font-semibold text-black">{children}</Text>;
}
export function CardSection({ className, ...p }: ViewProps) {
  return <View className={cn("mt-3 gap-3", className)} {...p} />;
}
