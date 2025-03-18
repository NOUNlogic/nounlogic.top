"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl text-blue-600 dark:text-blue-400">NOUN Hub</span>
            </Link>
            
            {/* Desktop navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link href="/chat" className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-blue-500 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Chat
              </Link>
              <Link href="/ai-help" className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-blue-500 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                AI Help
              </Link>
              <Link href="/news" className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-blue-500 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                News
              </Link>
              <Link href="/resources" className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-blue-500 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                Resources
              </Link>
            </div>
          </div>
          
          {/* Login/Profile section */}
          <div className="hidden md:flex items-center">
            <Link href="/login" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Log in
            </Link>
            <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium ml-2">
              Sign up
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button 
              type="button" 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white dark:bg-gray-800 shadow-lg`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link href="/chat" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            Chat
          </Link>
          <Link href="/ai-help" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            AI Help
          </Link>
          <Link href="/news" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            News
          </Link>
          <Link href="/resources" className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            Resources
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center px-4">
            <Link href="/login" className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Log in
            </Link>
            <Link href="/register" className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium ml-2">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
