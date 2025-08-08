import React, { useMemo, useState } from "react";
import { Modal, Pressable, View, Text, FlatList } from "react-native";
import { cn } from "../../lib/cn";
import { tokens } from "../../theme/tokens";

export type Option<T = string> = { label: string; value: T };

type Props<T> = {
  options: Option<T>[];
  value?: T;
  onChange?: (v: T) => void;
  placeholder?: string;
  className?: string;
};

export function Select<T>({ options, value, onChange, placeholder = "Select...", className }: Props<T>) {
  const [open, setOpen] = useState(false);
  const current = useMemo(() => options.find(o => o.value === value), [options, value]);

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        className={cn("h-11 px-3 flex-row items-center justify-between", tokens.radius, tokens.border, tokens.surface, className)}
      >
        <Text className={cn("text-base", current ? "text-black" : "text-neutral-500")}>
          {current ? String(current.label) : placeholder}
        </Text>
        <Text className="text-neutral-500">▾</Text>
      </Pressable>

      <Modal transparent visible={open} animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable className="flex-1 bg-black/40" onPress={() => setOpen(false)}>
          <View className="mt-auto bg-white rounded-t-3xl p-3 max-h-[60%]">
            <View className="items-center py-1">
              <View className="w-12 h-1.5 bg-neutral-300 rounded-full" />
            </View>
            <FlatList
              data={options}
              keyExtractor={(_, i) => String(i)}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => { onChange?.(item.value); setOpen(false); }}
                  className="px-3 py-3 border-b border-neutral-200"
                >
                  <Text className="text-base text-black">{String(item.label)}</Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
