'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  
  // Set isOpen to false on mobile devices initially
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    
    // Set initial state
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const menuItems = [
    { id: '01', name: 'HOME', path: '/' },
    { id: '02', name: 'BROWSE', path: '/browse' },
    { id: '03', name: 'MY BOOKS', path: '/my-books' },
    { id: '04', name: 'COMMUNITY', path: '/community' },
    { id: '05', name: 'PROFILE', path: '/profile' },
  ];

  return (
    <>
      {/* Mobile menu toggle button - visible only on small screens */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-30 sm:hidden bg-gray-900 text-white rounded-md p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}
      
      {/* Sidebar - conditionally rendered */}
      <div className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
      } fixed sm:sticky top-0 z-40 w-64 bg-gray-900 text-white h-screen transition-transform duration-300 ease-in-out`}>
        <div className="p-6 h-full flex flex-col">
          {/* Only show close button on small screens */}
          <div className="flex justify-end mb-12 sm:hidden">
            <button 
              onClick={() => setIsOpen(false)} 
              className="rounded-full border border-gray-700 p-2"
            >
              <span className="text-xl">×</span>
            </button>
          </div>
          
          <nav className="flex-1">
            <ul className="space-y-8">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link 
                    href={item.path} 
                    className="flex items-center"
                    onClick={() => window.innerWidth < 640 && setIsOpen(false)}
                  >
                    <span className="text-sm mr-4 text-gray-500">{item.id}</span>
                    <span className={`text-xl ${pathname === item.path ? 'text-white' : 'text-gray-500'}`}>
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="mt-auto mb-8">
            <div className="w-full h-1 bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile - only visible when sidebar is open on mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}