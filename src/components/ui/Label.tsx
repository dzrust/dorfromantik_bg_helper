import React from "react";
import { Text, TextProps } from "react-native";
import { cn } from "../../lib/cn";
import { tokens } from "../../theme/tokens";

export function Label({ className, ...p }: TextProps & { className?: string }) {
  return <Text className={cn("text-base", tokens.textMuted, className)} {...p} />;
}
