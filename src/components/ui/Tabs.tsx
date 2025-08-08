import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { cn } from "../../lib/cn";

type Tab = { key: string; title: string; content: React.ReactNode };

export function Tabs({ tabs, initialKey }: { tabs: Tab[]; initialKey?: string }) {
  const [active, setActive] = useState(initialKey ?? tabs[0]?.key);
  return (
    <View className="mt-4">
      <View className="flex-row gap-2">
        {tabs.map((t) => {
          const on = t.key === active;
          return (
            <Pressable
              key={t.key}
              onPress={() => setActive(t.key)}
              className={cn(
                "px-3 h-9 items-center justify-center rounded-xl border",
                on ? "bg-black border-black" : "bg-white border-neutral-300"
              )}
            >
              <Text className={cn("text-sm", on ? "text-white" : "text-black")}>{t.title}</Text>
            </Pressable>
          );
        })}
      </View>
      <View className="mt-3">{tabs.find((t) => t.key === active)?.content}</View>
    </View>
  );
}
