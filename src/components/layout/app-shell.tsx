'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AppLikeNavigation from '../ui/app-like-navigation';
import ThreeBackground from '../ui/three-background';
import FloatingObjects from '../ui/floating-objects';
import ThreeSceneTransition from '../ui/three-scene-transition';
import { useInteractiveCursor } from '@/hooks/use-interactive-cursor';

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextPath, setNextPath] = useState('');
  
  // Set up interactive cursor
  useInteractiveCursor({
    size: 24,
    trailLength: 6,
    magneticStrength: 0.3
  });
  
  // Navigation items
  const navItems = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    { title: 'Services', href: '/services' },
    { title: 'Projects', href: '/projects' },
    { title: 'Contact', href: '/contact' }
  ];
  
  // Handle route changes with transitions
  const handleRouteChange = (path: string) => {
    if (path === pathname) return;
    
    setIsTransitioning(true);
    setNextPath(path);
  };
  
  // Complete transition and navigate
  useEffect(() => {
    if (isTransitioning && nextPath) {
      const timer = setTimeout(() => {
        router.push(nextPath);
        
        // Small delay before ending transition animation
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, nextPath, router]);
  
  return (
    <div className="app-shell min-h-screen flex flex-col relative overflow-hidden">
      {/* 3D Background */}
      <ThreeBackground 
        color="#050814"
        particleDensity={60}
        interactive={true}
      />
      
      {/* Floating objects */}
      <FloatingObjects
        count={12}
        colors={['#4f56ff', '#0ff0fc', '#fc2f9a']}
        speed={0.3}
      />
      
      {/* Page transition effect */}
      <ThreeSceneTransition 
        isActive={isTransitioning}
        type="portal"
        color="#4f46e5"
        duration={1.5}
      />
      
      {/* Main content */}
      <main className="flex-grow relative z-10">
        {children}
      </main>
      
      {/* App-like navigation */}
      <AppLikeNavigation 
        items={navItems} 
        position="bottom"
        hideOnScroll={true}
        className="mx-auto max-w-screen-lg rounded-full px-4 py-1 my-4"
      />
    </div>
  );
};

export default AppShell;
