// client/src/components/reviews/ReviewCard.tsx
'use client';

import Image from 'next/image';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface Review {
  _id: string;
  userName: string;
  rating: number;
  comment: string;
  images?: string[];
  verified: boolean;
  createdAt: string;
}

interface ReviewCardProps {
  review: Review;
  onImageClick?: (url: string) => void;
}

export function ReviewCard({ review, onImageClick }: ReviewCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-jify-primary-400 to-jify-primary-600 flex items-center justify-center text-white font-bold">
            {review.userName.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">{review.userName}</h3>
              <p className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString('en-NG', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < Math.floor(review.rating) ? (
                    <StarSolidIcon className="w-5 h-5 text-yellow-400" />
                  ) : i < review.rating ? (
                    <StarSolidIcon className="w-5 h-5 text-yellow-400 opacity-50" />
                  ) : (
                    <StarOutlineIcon className="w-5 h-5 text-gray-300" />
                  )}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-3 text-gray-600">{review.comment}</p>
          
          {review.images && review.images.length > 0 && (
            <div className="mt-4">
              <div className="flex space-x-2 flex-wrap">
                {review.images.map((img, idx) => (
                  <div key={idx} className="w-24 h-24 rounded-lg overflow-hidden border">
                    <Image 
                      src={img} 
                      alt={`Review image ${idx + 1}`} 
                      width={96}
                      height={96}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => onImageClick?.(img)}
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {review.verified && (
            <div className="mt-3 flex items-center text-sm text-green-600">
              <CheckCircleIcon className="w-4 h-4 mr-1" />
              Verified Purchase
            </div>
          )}
        </div>
      </div>
    </div>
  );
}