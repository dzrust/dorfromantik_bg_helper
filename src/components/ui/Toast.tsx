import React, { createContext, useContext, useMemo, useRef, useState } from "react";
import { Animated, Easing } from "react-native";

type ToastItem = { id: string; text: string };
type Ctx = { show: (text: string) => void; hide: (id: string) => void; toasts: ToastItem[] };

const ToastContext = createContext<Ctx | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("ToastProvider missing");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const show = (text: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, text }]);
    setTimeout(() => hide(id), 2000);
  };
  const hide = (id: string) => setToasts((t) => t.filter((x) => x.id != id));
  const value = useMemo(() => ({ show, hide, toasts }), [toasts]);
  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}
