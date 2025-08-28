import React from 'react';
import { View, Text, Image } from 'react-native';

export interface AvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  src?: string;
  alt?: string;
  fallbackText?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Avatar({
  size = 'md',
  src,
  alt,
  fallbackText,
  className = '',
  children,
}: AvatarProps) {
  const baseClasses = 'rounded-full items-center justify-center bg-blue-600';
  
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8', 
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    '2xl': 'w-32 h-32',
  };
  
  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-3xl',
    '2xl': 'text-5xl',
  };
  
  const avatarClasses = `${baseClasses} ${sizeClasses[size]} ${className}`;
  
  const getInitials = (text: string): string => {
    return text
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  return (
    <View className={avatarClasses}>
      {src ? (
        <Image
          source={{ uri: src }}
          alt={alt}
          className={`${sizeClasses[size]} rounded-full`}
          style={{ position: 'absolute' }}
        />
      ) : (
        <Text className={`text-white font-semibold ${textSizeClasses[size]}`}>
          {fallbackText ? getInitials(fallbackText) : '?'}
        </Text>
      )}
      {children}
    </View>
  );
}

export { Avatar as default };