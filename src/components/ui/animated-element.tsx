'use client';

import { useEffect, useRef, ReactNode } from 'react';

type AnimatedElementProps = {
  children: ReactNode;
  animation: 'fade-in' | 'slide-up' | 'slide-down' | 'scale-in' | 'bounce';
  delay?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
};

export default function AnimatedElement({
  children,
  animation,
  delay = 0,
  threshold = 0.1,
  className = '',
  once = true,
}: AnimatedElementProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-active');
              if (once) {
                observer.unobserve(entry.target);
              }
            }, delay);
          }
        });
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [animation, delay, threshold, once]);

  return (
    <div ref={ref} className={`animate-initial ${animation} ${className}`}>
      {children}
    </div>
  );
}
