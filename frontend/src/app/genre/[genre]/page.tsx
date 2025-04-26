import { fetchBooksByGenre } from '../../../../lib/api';
import BookList from '@/app/components/BookList';
import BackButton from '@/app/components/BackButton';
import { notFound } from 'next/navigation';

type PageProps<T = {}> = {
  params: T;
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function GenrePage({ 
  params 
}: PageProps<{ genre: string }>) {
    const rawGenre = params.genre;
    const genre = rawGenre.charAt(0).toUpperCase() + rawGenre.slice(1);
    
  
  try {
    const books = await fetchBooksByGenre(genre);
    // console.log("Fetched books:", books);
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="fflex items-center justify-between mb-6">
        <BackButton />
          <h1 className="text-xl font-medium">{genre} Books</h1>
        </div>
        
        <BookList books={books} title={`Top ${genre} Books`} />
      </div>
    );
  } catch {
    notFound();
  }
}