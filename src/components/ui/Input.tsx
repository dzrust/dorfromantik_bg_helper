import React from "react";
import { TextInput, View, TextInputProps } from "react-native";
import { cn } from "../../lib/cn";
import { tokens } from "../../theme/tokens";

type Props = TextInputProps & { className?: string };

export function Input({ className, ...props }: Props) {
  return (
    <View className={cn(tokens.radius, tokens.border, tokens.surface, "px-3")}>
      <TextInput
        className={cn("h-11 text-base", tokens.text, className)}
        placeholderTextColor="#9ca3af"
        {...props}
      />
    </View>
  );
}
