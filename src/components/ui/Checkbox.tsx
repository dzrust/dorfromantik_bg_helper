import React from "react";
import { Pressable, View } from "react-native";
import { cn } from "../../lib/cn";

type Props = {
  checked?: boolean;
  onChange?: (v: boolean) => void;
  className?: string;
};

export function Checkbox({ checked, onChange, className }: Props) {
  return (
    <Pressable
      onPress={() => onChange?.(!checked)}
      className={cn(
        "w-6 h-6 items-center justify-center rounded-lg border border-neutral-400",
        checked ? "bg-black" : "bg-white",
        className
      )}
    >
      {checked ? <View className="w-3.5 h-3.5 bg-white rounded-[3px]" /> : null}
    </Pressable>
  );
}
