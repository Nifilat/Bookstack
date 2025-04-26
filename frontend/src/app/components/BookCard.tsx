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
        <div className={`relative ${compact ? 'w-full sm:w-32 h-48' : 'w-full h-64'}`}>
          <Image
            src={coverImage.startsWith('http') ? coverImage : `/api/placeholder/180/280`}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-md shadow-lg"
          />
        </div>
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