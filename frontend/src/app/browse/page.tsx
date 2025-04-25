import { fetchBooks } from '../../../lib/api';
import BookList from '../components/BookList';
import { Book } from '../../../types';

export default async function BrowsePage() {
  const books = await fetchBooks();
  

interface GenreMap {
    [genre: string]: Book[];
}

const genreMap = books.reduce((acc: GenreMap, book: Book) => {
    if (!acc[book.genre]) {
        acc[book.genre] = [];
    }
    acc[book.genre].push(book);
    return acc;
}, {} as GenreMap);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Browse Books</h1>
      
      {Object.entries(genreMap).map(([genre, books]) => (
              <BookList 
                key={genre} 
                books={(books as Book[]).slice(0, 4)} 
                title={genre} 
                viewMoreLink={`/genre/${genre.toLowerCase()}`} 
              />
            ))}
    </div>
  );
}