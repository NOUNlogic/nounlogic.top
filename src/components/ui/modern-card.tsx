import { ReactNode } from 'react';

interface ModernCardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export default function ModernCard({ 
  children, 
  className = '',
  hoverable = false 
}: ModernCardProps) {
  return (
    <div 
      className={`
        bg-white dark:bg-gray-800 
        border border-gray-200 dark:border-gray-700
        rounded-xl shadow-sm
        overflow-hidden
        ${hoverable ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-md' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
