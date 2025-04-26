import { fetchBooksByGenre } from '../../../../lib/api';
import BookList from '@/app/components/BookList';
import BackButton from '@/app/components/BackButton';
import { notFound } from 'next/navigation';

export default async function GenrePage({ 
  params 
}: {
  params: Promise<{ genre: string }>;
}) {
  const { genre } = await params;
  const formattedGenre = genre.charAt(0).toUpperCase() + genre.slice(1);
  
  try {
    const books = await fetchBooksByGenre(formattedGenre);
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="fflex items-center justify-between mb-6">
          <BackButton />
          <h1 className="text-xl font-medium">{formattedGenre} Books</h1>
        </div>
        
        <BookList books={books} title={`Top ${formattedGenre} Books`} />
      </div>
    );
  } catch {
    notFound();
  }
}