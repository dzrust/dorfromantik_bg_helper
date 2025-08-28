import React from 'react';
import { View, TextInput, TextInputProps } from 'react-native';

export interface InputProps extends TextInputProps {
  variant?: 'outline' | 'underlined' | 'rounded';
  size?: 'sm' | 'md' | 'lg';
  isInvalid?: boolean;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({
  variant = 'outline',
  size = 'md',
  isInvalid = false,
  className = '',
  leftIcon,
  rightIcon,
  style,
  ...props
}: InputProps) {
  const baseContainerClasses = 'flex-row items-center';
  
  const containerVariantClasses = {
    outline: 'border border-gray-300 rounded-lg',
    underlined: 'border-b border-gray-300',
    rounded: 'border border-gray-300 rounded-full',
  };
  
  const containerSizeClasses = {
    sm: 'h-9',
    md: 'h-11',
    lg: 'h-12',
  };
  
  const focusClasses = 'focus:border-blue-500';
  const invalidClasses = isInvalid ? 'border-red-500' : '';
  
  const containerClasses = `${baseContainerClasses} ${containerVariantClasses[variant]} ${containerSizeClasses[size]} ${focusClasses} ${invalidClasses} ${className}`;
  
  const inputClasses = 'flex-1 text-gray-900 text-base';
  
  const paddingClasses = {
    outline: leftIcon || rightIcon ? 'px-2' : 'px-3',
    underlined: 'px-0',
    rounded: leftIcon || rightIcon ? 'px-3' : 'px-4',
  };
  
  const inputPaddingClasses = paddingClasses[variant];
  
  return (
    <View className={containerClasses}>
      {leftIcon && (
        <View className="pl-3 pr-2">
          {leftIcon}
        </View>
      )}
      
      <TextInput
        className={`${inputClasses} ${inputPaddingClasses}`}
        placeholderTextColor="#9CA3AF"
        style={[
          { 
            fontSize: size === 'sm' ? 14 : size === 'lg' ? 18 : 16,
          },
          style
        ]}
        {...props}
      />
      
      {rightIcon && (
        <View className="pr-3 pl-2">
          {rightIcon}
        </View>
      )}
    </View>
  );
}

export { Input as default };