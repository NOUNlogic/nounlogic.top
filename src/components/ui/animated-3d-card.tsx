'use client';

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface Animated3DCardProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  backgroundColor?: string;
  borderColor?: string;
  shadowColor?: string;
  glare?: boolean;
  interactive?: boolean;
  rotationFactor?: number;
}

const Animated3DCard: React.FC<Animated3DCardProps> = ({
  children,
  className = '',
  depth = 30,
  backgroundColor = 'rgba(16, 16, 32, 0.8)',
  borderColor = 'rgba(255, 255, 255, 0.1)',
  shadowColor = 'rgba(0, 90, 255, 0.15)',
  glare = true,
  interactive = true,
  rotationFactor = 10,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const bounds = useRef({ left: 0, top: 0, width: 0, height: 0 });
  
  // Update card bounds when mounted
  useEffect(() => {
    if (cardRef.current) {
      updateBounds();
    }
    
    window.addEventListener('resize', updateBounds);
    return () => {
      window.removeEventListener('resize', updateBounds);
    };
  }, []);
  
  // Update bounds helper
  const updateBounds = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      bounds.current = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height
      };
    }
  };
  
  // Handle mouse movement for tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !interactive) return;
    
    updateBounds();
    
    // Calculate relative mouse position
    const relativeX = e.clientX - bounds.current.left;
    const relativeY = e.clientY - bounds.current.top;
    
    // Calculate position as percentage
    const x = (relativeX / bounds.current.width) * 2 - 1;
    const y = (relativeY / bounds.current.height) * 2 - 1;
    
    setMousePosition({ x, y });
    
    // Update glare position if enabled
    if (glare && glareRef.current) {
      const glareX = (relativeX / bounds.current.width) * 100;
      const glareY = (relativeY / bounds.current.height) * 100;
      
      glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 80%)`;
    }
  };
  
  // Apply tilt effect when mouse position changes
  useEffect(() => {
    if (!cardInnerRef.current || !isHovering || !interactive) return;
    
    gsap.to(cardInnerRef.current, {
      rotationY: mousePosition.x * rotationFactor,
      rotationX: -mousePosition.y * rotationFactor,
      duration: 0.1,
      ease: 'power2.out',
      transformPerspective: 1000,
      transformStyle: 'preserve-3d',
    });
    
    // Apply depth movement
    gsap.to(cardInnerRef.current, {
      z: depth,
      duration: 0.1,
      ease: 'power1.out',
    });
    
  }, [mousePosition, isHovering, rotationFactor, depth, interactive]);
  
  // Handle mouse enter/leave
  const handleMouseEnter = () => {
    setIsHovering(true);
    
    if (cardRef.current) {
      updateBounds();
    }
    
    if (glare && glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    
    // Add glow effect
    gsap.to(cardRef.current, {
      boxShadow: `0 15px 35px ${shadowColor}`,
      duration: 0.3,
      ease: 'power2.out'
    });
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    
    if (!cardInnerRef.current) return;
    
    // Reset rotation
    gsap.to(cardInnerRef.current, {
      rotationY: 0,
      rotationX: 0,
      z: 0,
      duration: 0.5,
      ease: 'power3.out',
    });
    
    if (glare && glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    
    // Remove glow effect
    gsap.to(cardRef.current, {
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      duration: 0.3,
      ease: 'power2.out'
    });
  };
  
  return (
    <div 
      ref={cardRef}
      className={`animated-3d-card relative ${className}`}
      style={{
        backgroundColor,
        borderRadius: '16px',
        border: `1px solid ${borderColor}`,
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        transition: 'box-shadow 0.3s ease',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardInnerRef}
        className="animated-3d-card-inner relative z-10"
        style={{
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </div>
      
      {glare && (
        <div
          ref={glareRef}
          className="animated-3d-card-glare absolute inset-0 opacity-0 pointer-events-none"
          style={{
            borderRadius: 'inherit',
            zIndex: 20,
          }}
        />
      )}
    </div>
  );
};

export default Animated3DCard;
