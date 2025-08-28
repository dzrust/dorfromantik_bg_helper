import React from 'react';
import { View, ViewProps } from 'react-native';

export interface VStackProps extends ViewProps {
  space?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  reversed?: boolean;
  className?: string;
}

export function VStack({
  space = 'md',
  reversed = false,
  className = '',
  ...props
}: VStackProps) {
  const baseClasses = 'flex-col';
  
  const spaceClasses = {
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4',
    xl: 'gap-5',
    '2xl': 'gap-6',
  };
  
  const directionClasses = reversed ? 'flex-col-reverse' : 'flex-col';
  
  const vstackClasses = `${baseClasses} ${directionClasses} ${spaceClasses[space]} ${className}`;
  
  return (
    <View className={vstackClasses} {...props} />
  );
}

export { VStack as default };