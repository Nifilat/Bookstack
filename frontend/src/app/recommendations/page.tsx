import Image from 'next/image';
import Link from 'next/link';
import BackButton from '../components/BackButton';
import { fetchRecommendations } from '../../../lib/api';
import { Book } from '../../../types';

export default async function RecommendationsPage() {
  const recommendations = await fetchRecommendations();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
      <div className="fflex items-center justify-between mb-6">
      <BackButton />
          <h1 className="text-xl font-medium">RECOMMENDATIONS</h1>
        </div>
      </div>
      
      <div className="mt-8 space-y-12">
        {recommendations.map((book: Book, index: number) => (
          <div key={book.id}>
            <div className={`flex flex-col ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'} gap-6`}>
              {/* Main book cover */}
              <div className="relative w-full sm:w-1/3">
                <Image 
                  src={book.cover_image || `/api/placeholder/300/450`} 
                  alt={book.title}
                  width={300}
                  height={450}
                  className="w-full h-auto object-cover rounded-md shadow-lg"
                />
                {/* Rating badge */}
                <div className="absolute top-0 right-0 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                  <span className="text-sm font-medium">{book.rating || '4.9'}</span>
                </div>
              </div>
              
              {/* Book details */}
              <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-xl font-medium">{book.title}</h2>
                <p className="text-gray-600 mb-4">{book.author}</p>
                
                <div className="flex space-x-4 mt-2">
                  
                  <Link href={`/book/${book.id}`} className="px-4 py-2 hover:bg-gray-50 flex items-center">
                    
                    <span className="ml-2 text-lg">→</span>
                  </Link>
                </div>
              </div>
            </div>
            
            {index < recommendations.length - 1 && (
              <div className="my-8 border-b border-gray-200"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}