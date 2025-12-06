// client/src/components/ui/Rating.tsx
'use client';
import { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
}

export const Rating = ({ value, onChange, readOnly = false }: RatingProps) => {
  const [hoverValue, setHoverValue] = useState(0);
  const displayValue = hoverValue || value;

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange && onChange(star)}
          onMouseEnter={() => !readOnly && setHoverValue(star)}
          onMouseLeave={() => !readOnly && setHoverValue(0)}
          className={`focus:outline-none ${
            readOnly ? 'cursor-default' : 'cursor-pointer'
          }`}
        >
          {star <= displayValue ? (
            <StarIcon className="w-5 h-5 text-amber-400" />
          ) : (
            <StarOutlineIcon className="w-5 h-5 text-gray-300" />
          )}
        </button>
      ))}
    </div>
  );
};