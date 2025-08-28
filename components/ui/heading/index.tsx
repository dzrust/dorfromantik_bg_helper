import React from 'react';
import { Text, TextProps } from 'react-native';

export interface HeadingProps extends TextProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  className?: string;
}

export function Heading({
  size = 'lg',
  className = '',
  ...props
}: HeadingProps) {
  const baseClasses = 'text-gray-900 font-bold';
  
  const sizeClasses = {
    xs: 'text-sm',
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
    '2xl': 'text-3xl',
    '3xl': 'text-4xl',
    '4xl': 'text-5xl',
    '5xl': 'text-6xl',
  };
  
  const headingClasses = `${baseClasses} ${sizeClasses[size]} ${className}`;
  
  return (
    <Text className={headingClasses} {...props} />
  );
}

export { Heading as default };