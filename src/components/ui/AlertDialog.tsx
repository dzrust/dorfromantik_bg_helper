import React from "react";
import { View, Text, Pressable, Modal } from "react-native";

type Props = {
  open: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export function AlertDialog({
  open,
  title = "Are you sure?",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal transparent visible={open} animationType="fade" onRequestClose={onCancel}>
      <View className="flex-1 bg-black/40 items-center justify-center p-6">
        <View className="bg-white rounded-3xl p-4 w-full">
          <Text className="text-lg font-semibold text-black">{title}</Text>
          {message ? <Text className="text-base text-neutral-600 mt-2">{message}</Text> : null}
          <View className="flex-row justify-end gap-3 mt-4">
            <Pressable onPress={onCancel} className="px-4 h-10 items-center justify-center rounded-xl border border-neutral-300">
              <Text className="text-black">{cancelText}</Text>
            </Pressable>
            <Pressable onPress={onConfirm} className="px-4 h-10 items-center justify-center rounded-xl bg-black">
              <Text className="text-white">{confirmText}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
