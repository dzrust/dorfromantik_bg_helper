import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

export interface TextProps extends RNTextProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  variant?: 'body' | 'caption' | 'label';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  className?: string;
}

export function Text({
  size = 'md',
  variant = 'body',
  weight = 'normal',
  className = '',
  ...props
}: TextProps) {
  const baseClasses = 'text-gray-900';
  
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm', 
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
  };
  
  const variantClasses = {
    body: '',
    caption: 'text-gray-600',
    label: 'text-gray-700',
  };
  
  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };
  
  const textClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${weightClasses[weight]} ${className}`;
  
  return (
    <RNText className={textClasses} {...props} />
  );
}

export { Text as default };