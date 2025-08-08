import React from "react";
import { Pressable, View, Text } from "react-native";
import { cn } from "../../lib/cn";

export function Radio({
  selected,
  onSelect,
  label,
  className,
}: { selected?: boolean; onSelect?: () => void; label?: string; className?: string }) {
  return (
    <Pressable onPress={onSelect} className={cn("flex-row items-center", className)}>
      <View
        className={cn(
          "w-5 h-5 rounded-full border border-neutral-400 items-center justify-center",
          selected ? "border-black" : ""
        )}
      >
        {selected ? <View className="w-3 h-3 rounded-full bg-black" /> : null}
      </View>
      {label ? <Text className="ml-2 text-base text-black">{label}</Text> : null}
    </Pressable>
  );
}
