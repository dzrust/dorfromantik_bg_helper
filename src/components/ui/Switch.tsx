import React, { useState, useEffect } from "react";
import { Pressable, View } from "react-native";
import { cn } from "../../lib/cn";

export function Switch({
  value,
  onValueChange,
}: { value?: boolean; onValueChange?: (v: boolean) => void }) {
  const [on, setOn] = useState(!!value);
  useEffect(() => { if (value !== undefined) setOn(!!value); }, [value]);
  const toggle = () => {
    const v = !on;
    setOn(v);
    onValueChange?.(v);
  };
  return (
    <Pressable
      onPress={toggle}
      className={cn("w-12 h-7 rounded-full", on ? "bg-black" : "bg-neutral-300")}
    >
      <View
        className={cn(
          "w-6 h-6 rounded-full bg-white mt-0.5",
          on ? "ml-6" : "ml-0.5"
        )}
      />
    </Pressable>
  );
}
