import React from 'react';
import { View, ViewProps } from 'react-native';

export interface HStackProps extends ViewProps {
  space?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  reversed?: boolean;
  wrap?: boolean;
  className?: string;
}

export function HStack({
  space = 'md',
  reversed = false,
  wrap = true,
  className = '',
  ...props
}: HStackProps) {
  const baseClasses = 'flex-row';
  
  const spaceClasses = {
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4',
    xl: 'gap-5',
    '2xl': 'gap-6',
  };
  
  const directionClasses = reversed ? 'flex-row-reverse' : 'flex-row';
  const wrapClasses = wrap ? 'flex-wrap' : '';
  
  const hstackClasses = `${baseClasses} ${directionClasses} ${wrapClasses} ${spaceClasses[space]} ${className}`;
  
  return (
    <View className={hstackClasses} {...props} />
  );
}

export { HStack as default };