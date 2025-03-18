'use client';

import React, { ReactNode, useEffect, useRef, useState } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export default function ParallaxSection({ 
  children, 
  speed = 0.5, 
  className = ''
}: ParallaxSectionProps) {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!window) return;
    
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      // Get the element's position relative to the viewport
      const rect = sectionRef.current.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate how far the element is from the middle of the viewport
      const distanceFromCenter = elementTop - windowHeight / 2 + elementHeight / 2;
      
      // Apply parallax effect based on that distance
      const newOffset = distanceFromCenter * speed;
      
      setOffset(newOffset);
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial calculation
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);
  
  return (
    <div ref={sectionRef} className={`relative ${className}`}>
      <div 
        style={{ 
          transform: `translateY(${offset}px)`,
          transition: 'transform 0.1s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
        className="w-full h-full"
      >
        {children}
      </div>
    </div>
  );
}
