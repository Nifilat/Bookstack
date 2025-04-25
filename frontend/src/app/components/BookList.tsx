import { Book } from '../../../types';
import BookCard from './BookCard';
import Link from 'next/link';

interface BookListProps {
  books: Book[];
  title: string;
  viewMoreLink?: string;
  compact?: boolean;
}

export default function BookList({ books, title, viewMoreLink, compact = false }: BookListProps) {
  if (books.length === 0) {
    return <div className="text-center py-8">No books found</div>;
  }

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        {viewMoreLink && (
          <Link href={viewMoreLink} className="text-gray-600">
            <span className="text-xl">→</span>
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {books.map((book) => (
          <BookCard
            key={book.id}
            id={book.id.toString()}
            title={book.title}
            author={book.author}
            coverImage={book.cover_image || `/api/placeholder/180/280`}
            rating={book.rating}
            compact={compact}
          />
        ))}
      </div>
    </div>
  );
}