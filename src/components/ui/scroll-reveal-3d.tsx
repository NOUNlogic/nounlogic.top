'use client';

import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Ensure GSAP plugins are registered
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollReveal3DProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade' | 'zoom' | 'flip' | 'rotate' | 'bounce';
  delay?: number;
  duration?: number;
  threshold?: number;
  perspective?: number;
}

const ScrollReveal3D: React.FC<ScrollReveal3DProps> = ({
  children,
  className = '',
  animation = 'fade',
  delay = 0,
  duration = 1.2,
  threshold = 0.1,
  perspective = 1000,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    
    let animationProps: gsap.TweenVars = {
      duration,
      ease: 'power3.out',
      delay,
    };

    // Set initial state based on animation type
    switch (animation) {
      case 'fade':
        gsap.set(element, { 
          autoAlpha: 0,
          y: 50 
        });
        animationProps = {
          ...animationProps,
          autoAlpha: 1,
          y: 0,
        };
        break;
      case 'zoom':
        gsap.set(element, { 
          autoAlpha: 0,
          scale: 0.5 
        });
        animationProps = {
          ...animationProps,
          autoAlpha: 1,
          scale: 1,
        };
        break;
      case 'flip':
        gsap.set(element, { 
          autoAlpha: 0,
          rotationX: 90,
          perspective 
        });
        animationProps = {
          ...animationProps,
          autoAlpha: 1,
          rotationX: 0,
        };
        break;
      case 'rotate':
        gsap.set(element, { 
          autoAlpha: 0,
          rotation: 90,
          transformOrigin: 'center center' 
        });
        animationProps = {
          ...animationProps,
          autoAlpha: 1,
          rotation: 0,
        };
        break;
      case 'bounce':
        gsap.set(element, { 
          autoAlpha: 0,
          y: 100 
        });
        animationProps = {
          ...animationProps,
          autoAlpha: 1,
          y: 0,
          ease: 'elastic.out(1, 0.3)',
          duration: duration * 1.2,
        };
        break;
    }

    // Create scroll trigger
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: `top bottom-=${threshold * 100}%`,
      onEnter: () => {
        gsap.to(element, animationProps);
        setIsVisible(true);
      },
    });

    return () => {
      // Clean up
      trigger.kill();
    };
  }, [animation, delay, duration, threshold, perspective]);

  return (
    <div
      ref={elementRef}
      className={`scroll-reveal-3d ${className}`}
      style={{ 
        opacity: 0, 
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d' 
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal3D;
