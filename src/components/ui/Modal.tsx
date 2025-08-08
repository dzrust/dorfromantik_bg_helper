import React from "react";
import { Modal as RNModal, View, Pressable } from "react-native";
import { cn } from "../../lib/cn";
import { tokens } from "../../theme/tokens";

type Props = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  contentClassName?: string;
};

export function Modal({ visible, onClose, children, contentClassName }: Props) {
  return (
    <RNModal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/40" onPress={onClose}>
        <View className={cn("m-6 mt-auto p-4 rounded-3xl bg-white", contentClassName)}>
          {children}
        </View>
      </Pressable>
    </RNModal>
  );
}
