import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import BookCard from '@/components/BookCard';
import { getBooks } from '@/services/api';

export default function BrowsePage() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getBooks()
      .then(setBooks)
      .catch(console.error);
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)] min-h-screen">
      <Navbar />
      <section className="px-6 py-10">
        <h1 className="text-2xl font-bold mb-4">Browse All Books</h1>
        <input
          type="text"
          placeholder="Search by title or author..."
          className="w-full max-w-md px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 mb-6"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {filteredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <p>No books match your search.</p>
        )}
      </section>
    </main>
  );
}
