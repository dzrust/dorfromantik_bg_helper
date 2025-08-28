import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

export interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

export function Button({
  children,
  onPress,
  variant = 'default',
  size = 'md',
  disabled = false,
  isLoading = false,
  className = '',
}: ButtonProps) {
  const baseButtonClasses = 'rounded-lg items-center justify-center flex-row';
  
  const variantClasses = {
    default: 'bg-blue-600 active:bg-blue-700',
    outline: 'border-2 border-blue-600 bg-transparent active:bg-blue-50',
    ghost: 'bg-transparent active:bg-gray-100',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 min-h-[36px]',
    md: 'px-4 py-3 min-h-[44px]',
    lg: 'px-6 py-4 min-h-[52px]',
  };
  
  const disabledClasses = (disabled || isLoading) ? 'opacity-50' : '';
  
  const buttonClasses = `${baseButtonClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;
  
  const baseTextClasses = 'font-medium text-center';
  
  const textVariantClasses = {
    default: 'text-white',
    outline: 'text-blue-600',
    ghost: 'text-gray-900',
  };
  
  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };
  
  const textClasses = `${baseTextClasses} ${textVariantClasses[variant]} ${textSizeClasses[size]}`;
  
  return (
    <TouchableOpacity
      className={buttonClasses}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
    >
      {isLoading && (
        <ActivityIndicator 
          size="small" 
          color={variant === 'default' ? '#ffffff' : '#2563eb'} 
          style={{ marginRight: 8 }}
        />
      )}
      <Text className={textClasses}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

export { Button as default };