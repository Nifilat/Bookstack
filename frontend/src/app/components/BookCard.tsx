import Link from 'next/link';
import Rating from './Rating';
import Image from 'next/image';

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  rating?: number;
  compact?: boolean;
}

export default function BookCard({ id, title, author, coverImage, rating, compact = false }: BookCardProps) {
  return (
    <Link href={`/book/${id}`} className={`block ${compact ? 'w-full sm:w-32' : 'w-full'}`}>
      <div className="relative">
        {rating && <Rating score={rating} />}
        {/* Use real cover image if available, fallback to placeholder */}
        {coverImage.startsWith('http') ? (
          <div className="relative w-full h-48 sm:h-64">
            <img 
              src={coverImage}
              alt={title}
              className={`${compact ? 'w-full sm:w-32 h-48' : 'w-full h-64'} object-cover rounded-md shadow-lg`}
            />
          </div>
        ) : (
          <img 
            src={`/api/placeholder/180/280`} 
            alt={title}
            className={`${compact ? 'w-full sm:w-32 h-48' : 'w-full h-64'} object-cover rounded-md shadow-lg`}
          />
        )}
      </div>
      {!compact && (
        <div className="mt-2">
          <h3 className="font-medium truncate">{title}</h3>
          <p className="text-sm text-gray-600 truncate">{author}</p>
        </div>
      )}
    </Link>
  );
}