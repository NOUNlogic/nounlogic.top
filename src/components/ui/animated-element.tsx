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

  return (
    <div
      ref={elementRef}
      className={`${animation} ${isVisible ? 'animate-active' : 'animate-initial'} ${className}`}
      style={{ 
        animationDelay: `${delay}ms`, 
        transitionDelay: `${delay}ms` 
      }}
    >
      {children}
    </div>
  );
}
