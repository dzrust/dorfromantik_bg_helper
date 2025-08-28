import React from 'react';
import { View, ViewProps } from 'react-native';

export interface CardProps extends ViewProps {
  variant?: 'elevated' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Card({
  variant = 'elevated',
  size = 'md',
  className = '',
  children,
  ...props
}: CardProps) {
  const baseClasses = 'bg-white rounded-lg';
  
  const variantClasses = {
    elevated: 'shadow-sm shadow-gray-200',
    outline: 'border border-gray-200',
    ghost: 'bg-transparent',
  };
  
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };
  
  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <View className={cardClasses} {...props}>
      {children}
    </View>
  );
}

export { Card as default };