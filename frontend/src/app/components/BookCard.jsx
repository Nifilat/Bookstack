const BookCard = ({ book }) => {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden w-40">
        <img src={book.cover_image} alt={book.title} className="h-56 w-full object-cover"/>
        <div className="p-2">
          <h3 className="text-sm font-semibold truncate">{book.title}</h3>
          <p className="text-xs text-gray-500">{book.author}</p>
          <span className="text-xs mt-1 inline-block bg-yellow-300 text-black px-2 py-1 rounded-md font-semibold">{book.rating} ★</span>
        </div>
      </div>
    );
  };
  
  export default BookCard;
  