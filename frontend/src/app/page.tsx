import Image from 'next/image';
import SearchBar from './components/SearchBar';
import { Book } from '../../types';
import Link from 'next/link';
import { fetchBooksByGenre } from '../../lib/api';

export default async function Home() {
  // Fetch mystery books from API
  const mysteryBooks = Array.isArray(await fetchBooksByGenre('Mystery')) ? await fetchBooksByGenre('Mystery') : [];
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        
      </div>
      
      <SearchBar />
      
      
  <div className="mt-12 relative">
  <h2 className="text-lg font-medium mb-6">TOP MYSTERY BOOKS</h2>
  
  {/* Desktop and tablet view */}
  <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {mysteryBooks.map((book: Book) => (
      <div key={book.id} className="group relative">
        <div className="relative">
          <Image 
            src={book.cover_image || `/api/placeholder/220/320`} 
            alt={book.title}
            width={220}
            height={320}
            className="w-full h-auto aspect-[2/3] object-cover rounded-md shadow-lg transition-transform duration-300 group-hover:scale-105"
          />
          {/* Rating badge */}
          <div className="absolute top-0 right-0 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md">
            
            <span className="text-sm font-medium">{book.rating || '4.9'}</span>
          </div>
          
          {/* Hover overlay with quick actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 w-full">
            <div className="w-full">
              <div className="flex space-x-2">
          <Link href={`/book/${book.id}`} className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="text-black">→</span>
          </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-3">
          <h3 className="font-medium text-gray-900 line-clamp-1">{book.title}</h3>
          <p className="text-sm text-gray-600">{book.author}</p>
        </div>
      </div>
    ))}
  </div>

  {/* Mobile view with overlapping books */}
  <div className="md:hidden">
    <div className="relative h-48 flex items-end">
      {mysteryBooks.slice(0, 3).map((book: Book, index: number) => (
        <div 
          key={book.id} 
          className="absolute"
          style={{ 
            left: `${index * 25}%`,
            bottom: index === 1 ? '10px' : '0px',
            zIndex: 3 - index,
            transform: `rotate(${index === 1 ? '-5deg' : index === 2 ? '5deg' : '0deg'})`
          }}
        >
            <div className="relative">
            <Image 
              src={book.cover_image || `/api/placeholder/150/220`} 
              alt={book.title}
              width={96} // 24 * 4 (tailwind width in pixels)
              height={144} // 36 * 4 (tailwind height in pixels)
              className="w-24 h-36 object-cover rounded-md shadow-lg"
            />
            {/* Rating badge */}
            <div className="absolute top-0 right-0 bg-white rounded-full w-7 h-7 flex items-center justify-center shadow-md">
                {/* <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"></svg>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg> */}
                <span className="text-xs font-medium">{book.rating || '4.9'}</span>
              </div>
            </div>
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