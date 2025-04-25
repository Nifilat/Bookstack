import Rating from '@/app/components/Rating';
import Link from 'next/link';
import { fetchBookById } from '../../../../lib/api';
import { notFound } from 'next/navigation';

export default async function BookPage({ params }: { params: { id: string } }) {
  let book;
  try {
    book = await fetchBookById(params.id);
  } catch (error) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="text-xl">
          ←
        </Link>
        {/* <p className="text-xs text-gray-500">9:41</p>
        <div className="flex items-center space-x-1">
          <div className="h-2.5 w-4 bg-gray-800 rounded-sm"></div>
          <div className="h-2.5 w-2.5 bg-gray-800 rounded-full"></div>
          <div className="h-2.5 w-2.5 bg-gray-800 rounded-full"></div>
        </div> */}
      </div>
      
      <div className="relative mb-8">
        <img 
          src={book.cover_image || `/api/placeholder/300/450`} 
          alt={book.title}
          className="w-full h-96 object-cover rounded-md"
        />
        <Rating score={book.rating} />
      </div>
      
      <div className="text-center mb-8">
        <p className="text-gray-600 mb-2">{book.author}</p>
        <h1 className="text-3xl font-bold mb-6">{book.title}</h1>
        <p className="text-gray-800">{book.description}</p>
      </div>
      
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
          <span className="text-white">···</span>
        </div>
      </div>
    </div>
  );
}