import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { getBook } from '@/services/api';

export default function BookDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (id) {
      getBook(id).then(setBook).catch(console.error);
    }
  }, [id]);

  if (!book) return <div className="text-center mt-20">Loading...</div>;

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)] min-h-screen">
      <Navbar />
      <div className="px-6 py-12 max-w-4xl mx-auto">
        <img src={book.cover_image} alt={book.title} className="w-64 h-auto mb-6 rounded-md shadow-lg" />
        <h1 className="text-4xl font-bold">{book.title}</h1>
        <p className="text-xl text-gray-500 mb-2">by {book.author}</p>
        <p className="text-yellow-400 font-semibold mb-4">{book.rating} ★</p>
        <p className="text-lg leading-relaxed">{book.description}</p>
      </div>
    </main>
  );
}
