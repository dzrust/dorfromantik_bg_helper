
import React from "react";
import { Text, TextProps } from "react-native";
import { cn } from "../../lib/cn";

export function Title({ className, ...p }: TextProps & { className?: string }) {
  return <Text className={cn("text-xl font-semibold text-black", className)} {...p} />;
}

export function Subtitle({ className, ...p }: TextProps & { className?: string }) {
  return <Text className={cn("text-lg text-neutral-700", className)} {...p} />;
}

export function Body({ className, ...p }: TextProps & { className?: string }) {
  return <Text className={cn("text-base text-black", className)} {...p} />;
}

export function Small({ className, ...p }: TextProps & { className?: string }) {
  return <Text className={cn("text-sm text-neutral-500", className)} {...p} />;
}
