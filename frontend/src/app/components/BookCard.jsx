import Link from 'next/link';

const BookCard = ({ book }) => {
  return (
    <Link href={`/book/${book.id}`}>
      <div className="bg-[var(--card)] rounded-xl shadow-md overflow-hidden w-40 cursor-pointer transition hover:scale-105">
        <img src={book.cover_image} alt={book.title} className="h-56 w-full object-cover"/>
        <div className="p-2">
          <h3 className="text-sm font-semibold truncate">{book.title}</h3>
          <p className="text-xs text-gray-500">{book.author}</p>
          <span className="text-xs mt-1 inline-block bg-[var(--accent)] text-black px-2 py-1 rounded-md font-semibold">{book.rating} ★</span>
        </div>
      </div>
    </Link>
  );
};
export default BookCard;