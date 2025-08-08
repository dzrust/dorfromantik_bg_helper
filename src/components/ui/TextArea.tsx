import React from "react";
import { TextInput, View, TextInputProps } from "react-native";
import { cn } from "../../lib/cn";
import { tokens } from "../../theme/tokens";

type Props = TextInputProps & { className?: string; rows?: number };

export function TextArea({ className, rows = 4, ...props }: Props) {
  const height = Math.max(44, rows * 24);
  return (
    <View className={cn(tokens.radius, tokens.border, tokens.surface, "px-3")}>
      <TextInput
        style={{ height }}
        multiline
        className={cn("text-base py-2", tokens.text, className)}
        placeholderTextColor="#9ca3af"
        {...props}
      />
    </View>
  );
}
