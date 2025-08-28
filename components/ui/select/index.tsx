import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, FlatList, Text } from 'react-native';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'underlined' | 'rounded';
  isDisabled?: boolean;
  className?: string;
}

export function Select({
  options,
  value,
  placeholder = 'Select an option...',
  onValueChange,
  size = 'md',
  variant = 'outline',
  isDisabled = false,
  className = '',
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedOption = options.find(option => option.value === value);
  
  const baseContainerClasses = 'flex-row items-center justify-between';
  
  const containerVariantClasses = {
    outline: 'border border-gray-300 rounded-lg',
    underlined: 'border-b border-gray-300',
    rounded: 'border border-gray-300 rounded-full',
  };
  
  const containerSizeClasses = {
    sm: 'h-9 px-3',
    md: 'h-11 px-4',
    lg: 'h-12 px-4',
  };
  
  const disabledClasses = isDisabled ? 'opacity-50' : '';
  const focusClasses = isOpen ? 'border-blue-500' : '';
  
  const containerClasses = `${baseContainerClasses} ${containerVariantClasses[variant]} ${containerSizeClasses[size]} ${disabledClasses} ${focusClasses} ${className}`;
  
  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };
  
  const handleSelect = (optionValue: string) => {
    onValueChange?.(optionValue);
    setIsOpen(false);
  };
  
  return (
    <>
      <TouchableOpacity
        className={containerClasses}
        onPress={() => !isDisabled && setIsOpen(true)}
        disabled={isDisabled}
        activeOpacity={0.8}
      >
        <Text 
          className={`${textSizeClasses[size]} ${selectedOption ? 'text-gray-900' : 'text-gray-500'}`}
        >
          {selectedOption?.label || placeholder}
        </Text>
        <Text className={`${textSizeClasses[size]} text-gray-400`}>
          ▼
        </Text>
      </TouchableOpacity>
      
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/50 justify-center items-center"
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View className="bg-white rounded-lg mx-4 max-h-64 min-w-48">
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className={`px-4 py-3 border-b border-gray-100 ${item.value === value ? 'bg-blue-50' : ''}`}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text className={`text-base ${item.value === value ? 'text-blue-600 font-medium' : 'text-gray-900'}`}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

export { Select as default };