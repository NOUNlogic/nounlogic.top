'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface ModernButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullWidth?: boolean;
  animated?: boolean;
  icon?: ReactNode;
}

export default function ModernButton({ 
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  fullWidth = false,
  animated = true,
  icon
}: ModernButtonProps) {
  // Base styles
  let baseStyles = `relative rounded-full font-medium inline-flex items-center justify-center transition-all duration-300 overflow-hidden ${fullWidth ? 'w-full' : ''}`;

  // Size styles
  const sizeStyles = {
    sm: 'text-sm py-2 px-4',
    md: 'text-base py-2.5 px-5',
    lg: 'text-lg py-3 px-6'
  };

  // Variant styles with improved contrast
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg dark:bg-blue-500 dark:hover:bg-blue-600',
    secondary: 'bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg dark:bg-purple-500 dark:hover:bg-purple-600',
    accent: 'bg-pink-600 text-white hover:bg-pink-700 shadow-md hover:shadow-lg dark:bg-pink-500 dark:hover:bg-pink-600',
    outline: 'bg-transparent border-2 border-gray-300 text-gray-700 dark:text-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800',
    ghost: 'bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
  };

  // Animation class
  const animationClass = animated ? 'btn-hover-effect' : '';
  const buttonClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${animationClass} ${className}`;

  const content = (
    <>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {content}
    </button>
  );
}
