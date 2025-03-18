import { ReactNode } from 'react';
import Link from 'next/link';

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullWidth?: boolean;
  animated?: boolean;
  icon?: ReactNode;
};

export default function ModernButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  fullWidth = false,
  animated = true,
  icon,
}: ButtonProps) {
  // Base styles
  let baseStyles = `relative rounded-full font-medium inline-flex items-center justify-center transition-all duration-300 overflow-hidden ${fullWidth ? 'w-full' : ''}`;
  
  // Size styles
  const sizeStyles = {
    sm: 'text-sm py-2 px-4',
    md: 'text-base py-2.5 px-5',
    lg: 'text-lg py-3 px-6',
  };
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark shadow-md hover:shadow-lg',
    accent: 'bg-accent text-white hover:bg-accent-dark shadow-md hover:shadow-lg',
    outline: 'bg-transparent border-2 border-gray-medium hover:bg-gray-light dark:hover:bg-gray-dark/20',
    ghost: 'bg-transparent hover:bg-gray-light dark:hover:bg-gray-dark/20',
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
