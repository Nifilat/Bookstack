import SearchBar from './components/SearchBar';
import { Book } from '../../types';
import BookList from './components/BookList';
import Link from 'next/link';
import { fetchBooks, fetchBooksByGenre } from '../../lib/api';

export default async function Home() {
  // Fetch mystery books from API
  const mysteryBooks = await fetchBooksByGenre('Mystery');
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        {/* <p className="text-xs text-gray-500">9:41</p>
        <div className="flex items-center space-x-1">
          <div className="h-2.5 w-4 bg-gray-800 rounded-sm"></div>
          <div className="h-2.5 w-2.5 bg-gray-800 rounded-full"></div>
          <div className="h-2.5 w-2.5 bg-gray-800 rounded-full"></div>
        </div> */}
      </div>
      
      <SearchBar />
      
      <div className="mt-12 relative">
        <div className="flex justify-center md:justify-start flex-wrap gap-4 mb-4">
            {mysteryBooks.slice(0, 3).map((book: Book, index: number) => (
            <div 
              key={book.id} 
              className="relative" 
              style={{ 
              top: index === 0 ? '10px' : index === 1 ? '0' : '5px',
              left: index === 0 ? '0' : index === 1 ? '50px' : '25px',
              zIndex: 3 - index
              }}
            >
              <img 
              src={book.cover_image || `/api/placeholder/150/220`} 
              alt={book.title}
              className="w-24 h-36 object-cover rounded-md shadow-lg"
              />
            </div>
            ))}

  
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-2">TOP 25 MYSTERY BOOKS</h2>
          <Link href="/genre/mystery" className="inline-block">
            <div className="flex items-center">
              <span className="mr-1">→</span>
            </div>
          </Link>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="border-t border-gray-300 py-4">
          <Link href="/recommendations" className="flex justify-between items-center">
            <span className="font-medium text-lg">RECOMMENDATIONS</span>
            <span>→</span>
          </Link>
        </div>
        <div className="border-t border-gray-300 py-4">
          <Link href="/featured" className="flex justify-between items-center">
            <span className="font-medium text-lg">FEATURED</span>
            <span>→</span>
          </Link>
        </div>
        <div className="border-t border-gray-300 py-4">
          <Link href="/community" className="flex justify-between items-center">
            <span className="font-medium text-lg">COMMUNITY</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}