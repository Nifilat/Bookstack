import { fetchBooksByGenre } from '../../../../lib/api';
import BookList from '@/app/components/BookList';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function GenrePage({ 
  params 
}: { 
  params: { genre: string } 
}) {
  const genre = params.genre.charAt(0).toUpperCase() + params.genre.slice(1);
  
  try {
    const books = await fetchBooksByGenre(genre);
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center mb-6">
          <Link href="/" className="mr-4">
            <span className="text-xl">←</span>
          </Link>
          <h1 className="text-xl font-medium">{genre} Books</h1>
        </div>
        
        <BookList books={books} title={`Top ${genre} Books`} />
      </div>
    );
  } catch (error) {
    notFound();
  }
}