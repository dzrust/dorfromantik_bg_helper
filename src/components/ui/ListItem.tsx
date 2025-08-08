import React from "react";
import { View, Text, Pressable, ViewProps } from "react-native";
import { cn } from "../../lib/cn";

type Props = ViewProps & {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  onPress?: () => void;
};

export function ListItem({ title, subtitle, right, onPress, className, ...p }: Props) {
  const Cmp: any = onPress ? Pressable : View;
  return (
    <Cmp className={cn("flex-row items-center justify-between py-3", className)} onPress={onPress} {...p}>
      <View>
        <Text className="text-base text-black">{title}</Text>
        {subtitle ? <Text className="text-sm text-neutral-500">{subtitle}</Text> : null}
      </View>
      {right}
    </Cmp>
  );
}
