'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  direction?: 'vertical' | 'horizontal';
  perspective?: boolean;
  rotation?: boolean;
  scale?: boolean;
}

function ParallaxSection({
  children,
  speed = 0.2,
  className = '',
  direction = 'vertical',
  perspective = false,
  rotation = false,
  scale = false,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const content = contentRef.current;
    
    if (!element || !content) return;
    
    // Basic setup for both directions
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
    
    // Set transform origin
    gsap.set(content, {
      transformOrigin: "center center",
      transformStyle: perspective ? "preserve-3d" : "flat"
    });
    
    // Apply different effects based on parameters
    if (direction === 'vertical') {
      tl.fromTo(content, 
        { y: -100 * speed }, 
        { y: 100 * speed, ease: "none" }
      );
    } else {
      tl.fromTo(content, 
        { x: -100 * speed }, 
        { x: 100 * speed, ease: "none" }
      );
    }
    
    // Add rotation if enabled
    if (rotation) {
      tl.fromTo(content,
        { rotationY: -5 * speed },
        { rotationY: 5 * speed, ease: "none" },
        "<"
      );
    }
    
    // Add scale if enabled
    if (scale) {
      tl.fromTo(content,
        { scale: 0.9 },
        { scale: 1.1, ease: "none" },
        "<"
      );
    }
    
    // If perspective is enabled, add depth changes
    if (perspective) {
      tl.fromTo(content,
        { z: -50 * speed },
        { z: 50 * speed, ease: "none" },
        "<"
      );
    }
    
    return () => {
      // Clean up the animation
      if (tl) tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [speed, direction, perspective, rotation, scale]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div 
        ref={contentRef} 
        className="w-full h-full"
        style={{ 
          perspective: perspective ? '1000px' : 'none',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default ParallaxSection;
