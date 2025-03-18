"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import ModernButton from "@/components/ui/modern-button";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ui/theme-toggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const isActive = (path: string) => pathname === path;

  return (
    <nav 
      className={`app-bar sticky top-0 z-40 transition-all duration-300 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 ${
        scrolled ? 'py-2 shadow-md' : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md mr-2 
                transition-all duration-300 group-hover:rotate-6">
                <span className="font-bold text-lg text-white">N</span>
              </div>
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                NOUN Hub
              </span>
            </Link>
            
            {/* Desktop navigation */}
            <div className="hidden md:ml-8 md:flex md:space-x-6">
              <Link 
                href="/chat" 
                className={`nav-link px-3 py-2 text-sm font-medium transition-all duration-300 
                  ${isActive('/chat') 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
              >
                Chat
              </Link>
              <Link 
                href="/ai-help" 
                className={`nav-link px-3 py-2 text-sm font-medium transition-all duration-300 
                  ${isActive('/ai-help') 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
              >
                AI Help
              </Link>
              <Link 
                href="/news" 
                className={`nav-link px-3 py-2 text-sm font-medium transition-all duration-300 
                  ${isActive('/news') 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
              >
                News
              </Link>
              <Link 
                href="/resources" 
                className={`nav-link px-3 py-2 text-sm font-medium transition-all duration-300 
                  ${isActive('/resources') 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
              >
                Resources
              </Link>
            </div>
          </div>
          
          {/* Login/Profile section with Theme Toggle */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <ModernButton 
              href="/login" 
              variant="primary" 
              size="sm" 
              className="shadow-md"
            >
              Log in
            </ModernButton>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-2">
            <ThemeToggle />
            <button 
              type="button" 
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              
              {/* Animated hamburger icon */}
              <div className="w-6 h-6 flex flex-col justify-around items-center">
                <span className={`w-5 h-0.5 bg-current transform transition-all duration-300 
                  ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}
                ></span>
                <span className={`w-5 h-0.5 bg-current transition-all duration-300 
                  ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                ></span>
                <span className={`w-5 h-0.5 bg-current transform transition-all duration-300 
                  ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu with animation */}
      <div 
        className={`
          md:hidden glass dark:glass-dark absolute left-0 right-0
          transform transition-all duration-300 ease-in-out
          ${isMenuOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-5 pointer-events-none'}
          shadow-xl rounded-b-2xl mx-4 mt-2
        `}
      >
        <div className="pt-3 pb-4 space-y-1 px-4">
          <Link 
            href="/chat" 
            className={`block px-4 py-3 text-base font-medium rounded-xl transition-all duration-300
              ${isActive('/chat')
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}
            `}
            onClick={() => setIsMenuOpen(false)}
          >
            Chat
          </Link>
          <Link 
            href="/ai-help" 
            className={`block px-4 py-3 text-base font-medium rounded-xl transition-all duration-300
              ${isActive('/ai-help')
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}
            `}
            onClick={() => setIsMenuOpen(false)}
          >
            AI Help
          </Link>
          <Link 
            href="/news" 
            className={`block px-4 py-3 text-base font-medium rounded-xl transition-all duration-300
              ${isActive('/news')
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}
            `}
            onClick={() => setIsMenuOpen(false)}
          >
            News
          </Link>
          <Link 
            href="/resources"
            className={`block px-4 py-3 text-base font-medium rounded-xl transition-all duration-300
              ${isActive('/resources')
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}
            `}
            onClick={() => setIsMenuOpen(false)}
          >
            Resources
          </Link>
        </div>
        <div className="pt-4 pb-5 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center px-5">
            <ModernButton href="/login" variant="primary" size="md" fullWidth onClick={() => setIsMenuOpen(false)}>
              Log in
            </ModernButton>
          </div>
        </div>
      </div>
      
      {/* Mobile bottom navigation bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 mobile-nav bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg z-30">
        <div className="flex justify-around items-center">
          <Link 
            href="/" 
            className="flex flex-col items-center p-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg className={`w-6 h-6 ${isActive('/') ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className={`text-xs mt-1 ${isActive('/') ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400'}`}>Home</span>
          </Link>
          
          <Link 
            href="/chat" 
            className="flex flex-col items-center p-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg className={`w-6 h-6 ${isActive('/chat') ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className={`text-xs mt-1 ${isActive('/chat') ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400'}`}>Chat</span>
          </Link>
          
          <Link 
            href="/ai-help" 
            className="flex flex-col items-center p-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg className={`w-6 h-6 ${isActive('/ai-help') ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className={`text-xs mt-1 ${isActive('/ai-help') ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400'}`}>AI Help</span>
          </Link>
          
          <Link 
            href="/resources" 
            className="flex flex-col items-center p-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg className={`w-6 h-6 ${isActive('/resources') ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className={`text-xs mt-1 ${isActive('/resources') ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400'}`}>Resources</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
