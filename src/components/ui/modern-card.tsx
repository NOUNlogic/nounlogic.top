import React, { ReactNode } from 'react';

interface ModernCardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  bordered?: boolean;
  compact?: boolean;
  shadow?: 'sm' | 'md' | 'lg' | 'none';
}

export default function ModernCard({ 
  children, 
  className = '', 
  hoverable = false, 
  bordered = false, 
  compact = false, 
  shadow = 'md' 
}: ModernCardProps) {
  const shadowClass = {
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg',
    none: ''
  };
  
  const hoverClass = hoverable ? 'card-hover' : '';
  const borderClass = bordered ? 'border border-gray-200 dark:border-gray-700' : '';
  const paddingClass = compact ? 'p-4' : 'p-6';
  
  return (
    <div className={`
      bg-white dark:bg-gray-800 
      rounded-xl 
      ${shadowClass[shadow]}
      ${hoverClass}
      ${borderClass}
      ${paddingClass}
      ${className}
    `}>
      {children}
    </div>
  );
}
