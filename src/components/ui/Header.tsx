
import React from "react";
import { View, Text, ViewProps } from "react-native";
import { cn } from "../../lib/cn";

type Props = ViewProps & {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
};

export function Header({ title, subtitle, right, className, ...p }: Props) {
  return (
    <View className={cn("flex-row items-center justify-between py-3 px-4", className)} {...p}>
      <View>
        <Text className="text-2xl font-bold text-black">{title}</Text>
        {subtitle ? <Text className="text-sm text-neutral-500">{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  );
}
