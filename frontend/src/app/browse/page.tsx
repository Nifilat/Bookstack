import { fetchBooks, fetchBooksByGenre, fetchGenres } from '../../../lib/api';
import BookCard from '../components/BookCard';
import Link from 'next/link';
import { Book } from '../../../types';

// Define common book genres for a fallback option
const COMMON_GENRES = [
  "Mystery", 
  "Fiction", 
  "Science Fiction", 
  "Fantasy", 
  "Romance", 
  "Thriller", 
  "Biography",
  "History",
  "Horror",
  "Young Adult"
];

export default async function BrowsePage() {
let genres = [];
const featuredBooks: Record<string, Book[]> = {};

  try {
    // Fetch all books
    // books = await fetchBooks();
    
    genres = await fetchGenres();
    
    // Get featured books for each genre (up to 4 per genre)
    for (const genre of genres) {
      try {
        const genreBooks = await fetchBooksByGenre(genre);
        if (genreBooks.length > 0) {
          featuredBooks[genre] = genreBooks.slice(0, 4);
        }
      } catch (error) {
        console.error(`Error fetching books for genre ${genre}:`, error);
        // Continue with other genres if one fails
      }
    }
  } catch (error) {
    console.error("Error fetching books:", error);
    // If API fails, use common genres as fallback
    genres = COMMON_GENRES;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Browse Books</h1>
      
      {/* Genre Categories Grid */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {genres.map((genre) => (
            <Link
              key={genre}
              href={`/genre/${genre.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-800 font-bold">{genre.charAt(0)}</span>
                </div>
                <span className="font-medium">{genre}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Featured Books by Genre */}
      {Object.keys(featuredBooks).length > 0 ? (
        Object.entries(featuredBooks).map(([genre, books]) => (
          <div key={genre} className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{genre}</h2>
              <Link 
                href={`/genre/${genre.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-blue-600 hover:underline flex items-center"
              >
                See all <span className="ml-1">→</span>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {books.map((book: Book) => (
                <BookCard
                  key={book.id}
                  id={book.id.toString()}
                  title={book.title}
                  author={book.author}
                  coverImage={book.cover_image || `/api/placeholder/180/280`}
                  rating={book.rating}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        // Fallback UI when no books are available
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h3 className="text-xl font-medium mb-4">Explore Popular Categories</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {genres.map((genre) => (
              <Link
                key={genre}
                href={`/genre/${genre.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                {genre}
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* Popular Authors Section */}
      <div className="mt-12 mb-8">
        <h2 className="text-xl font-semibold mb-4">Popular Authors</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            Discover books from bestselling authors across various genres.
          </p>
          <Link 
            href="/authors" 
            className="inline-block mt-4 text-blue-600 hover:underline"
          >
            View popular authors →
          </Link>
        </div>
      </div>
      
      {/* Reading Lists Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Curated Reading Lists</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            Explore hand-picked collections for every mood and interest.
          </p>
          <Link 
            href="/reading-lists" 
            className="inline-block mt-4 text-blue-600 hover:underline"
          >
            Browse reading lists →
          </Link>
        </div>
      </div>
    </div>
  );
}
