'use client';

import { useEffect, useRef, ReactNode } from 'react';

type ParallaxSectionProps = {
  children: ReactNode;
  speed?: number;
  className?: string;
};

export default function ParallaxSection({
  children,
  speed = 0.2,
  className = '',
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrollY = window.scrollY;
        const offsetY = scrollY * speed;
        ref.current.style.transform = `translateY(${offsetY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
