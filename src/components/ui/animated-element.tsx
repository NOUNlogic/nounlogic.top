'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

interface AnimatedElementProps {
  children: ReactNode;
  animation: 'fade-in' | 'slide-up' | 'slide-down' | 'scale-in' | 'bounce' | 'fade-scale';
  delay?: number;
  className?: string;
  threshold?: number;
}

export default function AnimatedElement({ 
  children, 
  animation, 
  delay = 0,
  className = '',
  threshold = 0.1
}: AnimatedElementProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use IntersectionObserver to detect when the element enters the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Once visible, stop observing
        }
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold // When at least 10% of the element is visible
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  // Use Tailwind classes for animations instead of custom CSS classes
  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0';
    
    switch (animation) {
      case 'fade-in':
        return 'opacity-100 transition-opacity duration-700';
      case 'slide-up':
        return 'opacity-100 translate-y-0 transition-all duration-700';
      case 'slide-down':
        return 'opacity-100 translate-y-0 transition-all duration-700';
      case 'scale-in':
        return 'opacity-100 scale-100 transition-all duration-500';
      case 'bounce':
        return 'opacity-100 animate-bounce';
      case 'fade-scale':
        return 'opacity-100 scale-100 transition-all duration-500';
      default:
        return 'opacity-100';
    }
  };
  
  const getInitialClass = () => {
    switch (animation) {
      case 'fade-in':
        return 'opacity-0';
      case 'slide-up':
        return 'opacity-0 translate-y-8';
      case 'slide-down':
        return 'opacity-0 -translate-y-8';
      case 'scale-in':
        return 'opacity-0 scale-95';
      case 'bounce':
        return 'opacity-0';
      case 'fade-scale':
        return 'opacity-0 scale-95';
      default:
        return 'opacity-0';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`transform ${isVisible ? getAnimationClass() : getInitialClass()} ${className}`}
      style={{ 
        transitionDelay: `${delay}ms` 
      }}
    >
      {children}
    </div>
  );
}
