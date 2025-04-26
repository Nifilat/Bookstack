'use client';

import BackButton from '@/app/components/BackButton';
import React from 'react';
import { Book } from '../../../../types';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchBookById } from '../../../../lib/api';
import { notFound } from 'next/navigation';

export default function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const unwrappedParams = React.use(params);

  // Fetch book data on component mount
  useEffect(() => {
    const getBook = async () => {
      try {
        const bookData = await fetchBookById(unwrappedParams.id);
        setBook(bookData);
      } catch {
        notFound();
      } finally {
        setLoading(false);
      }
    };
    
    getBook();
  }, [unwrappedParams.id]);

  if (loading || !book) {
    return <div className="max-w-2xl mx-auto p-6">Loading...</div>;
  }

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };


return (
    <div className="max-w-md mx-auto p-6">
      <div className="fflex items-center justify-between mb-6">
      <BackButton />
      </div>
      
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-48 md:w-56 aspect-[2/3] rounded-md overflow-hidden mb-6">
          <Image 
            src={book.cover_image || `/api/placeholder/300/450`} 
            alt={book.title}
            width={300}
            height={450}
            className="w-full h-full object-contain"
          />
          <div className="absolute top-0 right-0 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md">
            <span className="text-sm font-medium">{book.rating || '4.9'}</span>
          </div>
        </div>
      </div>
      
      <div className="text-center mb-8">
        <p className="text-gray-600 mb-2">{book.author}</p>
        <h1 className="text-2xl font-medium mb-6">{book.title}</h1>
        
        {/* Description container with conditional height and fade effect */}
        <div className="relative">
          <div 
            className={`text-gray-800 text-left mx-auto max-w-prose ${
              isDescriptionExpanded ? '' : 'max-h-32 overflow-hidden'
            }`}
          >
            <p className="leading-relaxed">{book.description}</p>
          </div>
          
          {/* Fade effect - only shows when description is collapsed */}
          {!isDescriptionExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
          )}
        </div>
      </div>
      
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <button 
          onClick={toggleDescription}
          className="h-12 w-12 rounded-full bg-gray-900 flex items-center justify-center shadow-lg"
          aria-label={isDescriptionExpanded ? "Show less" : "Show more"}
        >
          {isDescriptionExpanded ? (
            // Less/collapse icon
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            // More/expand icon
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
