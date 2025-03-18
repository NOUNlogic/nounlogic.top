'use client';

import { useEffect, useState, useRef, RefObject } from 'react';
import { gsap } from 'gsap';

interface InteractiveCursorOptions {
  size?: number;
  color?: string;
  trailColor?: string;
  trailLength?: number;
  magneticElements?: string[];
  magneticStrength?: number;
  cursorVisible?: boolean;
}

export function useInteractiveCursor({
  size = 20,
  color = 'rgba(255, 255, 255, 0.5)',
  trailColor = 'rgba(255, 255, 255, 0.2)',
  trailLength = 8,
  magneticElements = ['.magnetic', 'button', 'a'],
  magneticStrength = 0.5,
  cursorVisible = true,
}: InteractiveCursorOptions = {}) {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cursorTrailRef = useRef<HTMLDivElement[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  const trailPositions = useRef<Array<{ x: number, y: number }>>([]);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!cursorVisible) return;
    
    // Create cursor element
    const cursor = document.createElement('div');
    cursor.className = 'interactive-cursor';
    cursor.style.position = 'fixed';
    cursor.style.width = `${size}px`;
    cursor.style.height = `${size}px`;
    cursor.style.borderRadius = '50%';
    cursor.style.backgroundColor = color;
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.opacity = '0';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.transition = 'transform 0.2s var(--spring-bounce), width 0.3s var(--smooth-spring), height 0.3s var(--smooth-spring)';
    cursor.style.mixBlendMode = 'difference';
    document.body.appendChild(cursor);
    cursorRef.current = cursor;
    
    // Create cursor trails
    for (let i = 0; i < trailLength; i++) {
      const trail = document.createElement('div');
      trail.className = 'interactive-cursor-trail';
      trail.style.position = 'fixed';
      trail.style.width = `${size * 0.5}px`;
      trail.style.height = `${size * 0.5}px`;
      trail.style.borderRadius = '50%';
      trail.style.backgroundColor = trailColor;
      trail.style.pointerEvents = 'none';
      trail.style.zIndex = '9998';
      trail.style.opacity = `${1 - i / trailLength}`;
      trail.style.transform = 'translate(-50%, -50%)';
      document.body.appendChild(trail);
      cursorTrailRef.current.push(trail);
      trailPositions.current.push({ x: 0, y: 0 });
    }

    // Initialize mouse position
    mousePosition.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      checkHoveredElements(e);
    };
    
    const handleMouseDown = () => {
      setIsActive(true);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(-50%, -50%) scale(0.8)`;
      }
    };
    
    const handleMouseUp = () => {
      setIsActive(false);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(-50%, -50%) scale(1)`;
      }
    };
    
    // Check for hovered magnetic elements
    const checkHoveredElements = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if the target or any of its parents match the magnetic elements
      let isHoveringMagnetic = false;
      let magneticElement: HTMLElement | null = null;
      
      let currentElement: HTMLElement | null = target;
      while (currentElement !== null) {
        if (magneticElements.some(selector => 
          currentElement!.matches(selector) || 
          currentElement!.closest(selector)
        )) {
          isHoveringMagnetic = true;
          magneticElement = currentElement.matches(magneticElements.join(',')) 
            ? currentElement 
            : currentElement.closest(magneticElements.join(','));
          break;
        }
        currentElement = currentElement.parentElement;
      }
      
      setIsHovering(isHoveringMagnetic);
      
      if (isHoveringMagnetic && magneticElement && cursorRef.current) {
        applyMagneticEffect(e, magneticElement);
        
        // Scale up cursor on hover
        cursorRef.current.style.width = `${size * 1.5}px`;
        cursorRef.current.style.height = `${size * 1.5}px`;
      } else if (cursorRef.current) {
        cursorRef.current.style.width = `${size}px`;
        cursorRef.current.style.height = `${size}px`;
      }
    };
    
    // Enhanced magnetic effect
    const applyMagneticEffect = (e: MouseEvent, element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const distX = e.clientX - (rect.left + rect.width / 2);
      const distY = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.sqrt(distX * distX + distY * distY);
      const maxDist = 100;
      
      if (dist < maxDist) {
        const strength = (1 - dist / maxDist) * magneticStrength;
        const x = e.clientX - distX * strength;
        const y = e.clientY - distY * strength;
        mousePosition.current = { x, y };
      }
    };
    
    // Start animation loop
    const animate = () => {
      if (cursorRef.current) {
        // Smooth cursor movement
        const x = mousePosition.current.x;
        const y = mousePosition.current.y;
        
        cursorRef.current.style.left = `${x}px`;
        cursorRef.current.style.top = `${y}px`;
        cursorRef.current.style.opacity = '1';
        
        // Update trail positions
        for (let i = 0; i < trailLength; i++) {
          const delay = 3 * (i + 1);
          
          // If this is the first trail dot, follow the cursor
          if (i === 0) {
            trailPositions.current[i] = {
              x: x,
              y: y
            };
          } 
          // Otherwise, follow the previous trail dot
          else {
            const dx = trailPositions.current[i - 1].x - trailPositions.current[i].x;
            const dy = trailPositions.current[i - 1].y - trailPositions.current[i].y;
            
            trailPositions.current[i] = {
              x: trailPositions.current[i].x + dx / delay,
              y: trailPositions.current[i].y + dy / delay
            };
          }
          
          if (cursorTrailRef.current[i]) {
            cursorTrailRef.current[i].style.left = `${trailPositions.current[i].x}px`;
            cursorTrailRef.current[i].style.top = `${trailPositions.current[i].y}px`;
          }
        }
      }
      
      raf.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Handle cursor leaving the window
    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
      cursorTrailRef.current.forEach(trail => {
        trail.style.opacity = '0';
      });
    };
    
    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1';
      }
      cursorTrailRef.current.forEach((trail, i) => {
        trail.style.opacity = `${1 - i / trailLength}`;
      });
    };
    
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    // Hide default cursor
    document.documentElement.style.cursor = 'none';
    
    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      
      if (raf.current) {
        cancelAnimationFrame(raf.current);
      }
      
      if (cursorRef.current) {
        document.body.removeChild(cursorRef.current);
      }
      
      cursorTrailRef.current.forEach(trail => {
        if (trail.parentNode) {
          document.body.removeChild(trail);
        }
      });
      
      // Restore default cursor
      document.documentElement.style.cursor = '';
    };
  }, [size, color, trailColor, trailLength, magneticElements, magneticStrength, cursorVisible]);

  return { isHovering, isActive };
}
