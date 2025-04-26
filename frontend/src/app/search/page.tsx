import { searchBooks } from '../../../lib/api';
import Link from 'next/link';
import BookList from '../components/BookList';

export default async function SearchPage({ 
  searchParams 
}: { 
  searchParams: { q: string } 
}) {
  const query = searchParams.q || '';
  const books = await searchBooks(query);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-4">
          <span className="text-xl">←</span>
        </Link>
        <h1 className="text-xl font-medium">Search Results for &quot;{query}&quot;</h1>
      </div>
      
      {books.length > 0 ? (
        <BookList books={books} title={`${books.length} Results`} />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No books found for &quot;{query}&quot;</p>
          <Link href="/" className="mt-4 inline-block text-blue-600">
            Return to home
          </Link>
        </div>
      )}
    </div>
  );
}