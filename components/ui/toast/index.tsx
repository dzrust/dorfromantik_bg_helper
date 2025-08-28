import React, { createContext, useContext, useState, useCallback } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface ToastContextType {
  show: (options: ToastOptions) => void;
  hide: () => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toast, setToast] = useState<ToastOptions | null>(null);
  const [visible, setVisible] = useState(false);

  const show = useCallback((options: ToastOptions) => {
    setToast(options);
    setVisible(true);
    
    const duration = options.duration ?? 3000;
    if (duration > 0) {
      setTimeout(() => {
        hide();
      }, duration);
    }
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
    setTimeout(() => setToast(null), 300);
  }, []);

  const variantClasses = {
    success: 'bg-green-600 border-green-500',
    error: 'bg-red-600 border-red-500',
    warning: 'bg-yellow-600 border-yellow-500',
    info: 'bg-blue-600 border-blue-500',
  };

  const iconMap = {
    success: '✓',
    error: '✕',
    warning: '!',
    info: 'i',
  };

  return (
    <ToastContext.Provider value={{ show, hide }}>
      {children}
      <Modal
        visible={visible && !!toast}
        transparent
        animationType="fade"
        onRequestClose={hide}
      >
        <View className="flex-1 justify-start items-center pt-16 px-4">
          <TouchableOpacity
            activeOpacity={1}
            onPress={hide}
            className={`rounded-lg px-4 py-3 mx-4 shadow-lg border min-w-64 ${
              toast ? variantClasses[toast.variant || 'info'] : ''
            }`}
          >
            <View className="flex-row items-center">
              <Text className="text-white text-lg font-bold mr-2">
                {toast ? iconMap[toast.variant || 'info'] : ''}
              </Text>
              <View className="flex-1">
                <Text className="text-white font-semibold text-base">
                  {toast?.title}
                </Text>
                {toast?.description && (
                  <Text className="text-white/90 text-sm mt-1">
                    {toast.description}
                  </Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export { ToastProvider as default };