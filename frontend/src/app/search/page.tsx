import { searchBooks } from '../../../lib/api';
import BookList from '@/app/components/BookList';
import BackButton from '@/app/components/BackButton';
import { notFound } from 'next/navigation';

export default async function SearchPage({ 
  searchParams 
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  
  try {
    const books = await searchBooks(q);
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="fflex items-center justify-between mb-6">
          <BackButton />
          <h1 className="text-xl font-medium">Search Results for &quot;{q}&quot;</h1>
        </div>
        
        <BookList books={books} title={`Search Results for "${q}"`} />
      </div>
    );
  } catch {
    notFound();
  }
}