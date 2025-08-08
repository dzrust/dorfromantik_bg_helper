import React from "react";
import { Modal as RNModal, View, Pressable } from "react-native";
import { cn } from "../../lib/cn";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  children: React.ReactNode;
  contentClassName?: string;
};

export function Sheet({ open, onOpenChange, children, contentClassName }: Props) {
  return (
    <RNModal transparent visible={open} animationType="slide" onRequestClose={() => onOpenChange(false)}>
      <Pressable className="flex-1 bg-black/40" onPress={() => onOpenChange(false)}>
        <View className={cn("mt-auto p-4 rounded-t-3xl bg-white", contentClassName)}>
          {children}
        </View>
      </Pressable>
    </RNModal>
  );
}
