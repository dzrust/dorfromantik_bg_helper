import React from "react";
import { Text, TextProps } from "react-native";
import { cn } from "../../lib/cn";

export function Label({ className, ...p }: TextProps & { className?: string }) {
  return <Text className={cn("text-base", className)} {...p} />;
}
