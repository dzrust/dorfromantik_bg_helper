import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export interface CheckboxProps {
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline';
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function Checkbox({
  defaultChecked = false,
  onCheckedChange,
  label,
  size = 'md',
  variant = 'default',
  disabled = false,
  className = '',
  children,
}: CheckboxProps) {
  const baseCheckboxClasses = 'items-center justify-center border-2 rounded';
  const [checked, setChecked] = useState(defaultChecked);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const variantClasses = {
    default: checked ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300',
    outline: checked ? 'bg-transparent border-blue-600' : 'bg-transparent border-gray-300',
  };

  const disabledClasses = disabled ? 'opacity-50' : '';

  const checkboxClasses = `${baseCheckboxClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses}`;

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const checkmarkSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const handlePress = () => {
    if (!disabled) {
      const newstate = !checked;
      setChecked(newstate);
      onCheckedChange?.(newstate);
    }
  };

  const containerClasses = `flex-row items-center ${className}`;

  return (
    <TouchableOpacity
      className={containerClasses}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.8}>
      <View className={checkboxClasses}>
        {checked && (
          <Text
            className={`${checkmarkSizeClasses[size]} ${
              variant === 'default' ? 'text-white' : 'text-blue-600'
            } font-bold`}>
            ✓
          </Text>
        )}
      </View>

      {(label || children) && (
        <View className="ml-2 flex-1">
          {label && (
            <Text
              className={`text-gray-900 ${textSizeClasses[size]} ${disabled ? 'opacity-50' : ''}`}>
              {label}
            </Text>
          )}
          {children}
        </View>
      )}
    </TouchableOpacity>
  );
}

export { Checkbox as default };
