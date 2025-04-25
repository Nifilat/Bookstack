import Link from 'next/link';
import { fetchRecommendations } from '../../../lib/api';
import { Book } from '../../../types';



export default async function RecommendationsPage() {
  const recommendations = await fetchRecommendations();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link href="/" className="mr-4">
            <span className="text-xl">←</span>
          </Link>
          <h1 className="text-xl font-medium">RECOMMENDATIONS</h1>
        </div>
        <div className="flex items-center space-x-1">
          <div className="h-2.5 w-4 bg-gray-800 rounded-sm"></div>
          <div className="h-2.5 w-2.5 bg-gray-800 rounded-full"></div>
          <div className="h-2.5 w-2.5 bg-gray-800 rounded-full"></div>
        </div>
      </div>
      
      <div className="mt-8">
        {recommendations.map((book: Book, index: number) => (
          <div key={book.id} className="mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="w-32">
            <img 
              src={book.cover_image || `/api/placeholder/120/180`} 
              alt={book.title}
              className="w-full h-auto object-cover rounded-md shadow-lg"
            />
              </div>
              <div className="flex-1 text-center sm:text-left">
            <h2 className="text-lg font-medium">{book.title}</h2>
            <p className="text-gray-600">{book.author}</p>
            <Link href={`/book/${book.id}`} className="inline-block mt-4">
              <span className="text-xl">→</span>
            </Link>
              </div>
              <div className="w-24 hidden sm:block">
            <img 
              src={book.cover_image || `/api/placeholder/80/120`} 
              alt={book.title}
              className="w-full h-auto object-cover rounded-md shadow-lg"
            />
              </div>
            </div>
            {index < recommendations.length - 1 && (
              <div className="my-4 border-b border-gray-200"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}