// components/marketing/TestimonialCard.tsx
import { StarIcon } from '@heroicons/react/24/solid';

interface TestimonialCardProps {
  testimonial: {
    id: number;
    name: string;
    location: string;
    rating: number;
    comment: string;
    date: string;
    type: 'product' | 'service';
  };
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
          <p className="text-sm text-gray-600">{testimonial.location}</p>
        </div>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`w-4 h-4 ${
                i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-gray-700 mb-4 line-clamp-4">{testimonial.comment}</p>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-jify-primary/10 text-jify-primary">
          {testimonial.type === 'product' ? 'Product Review' : 'Service Review'}
        </span>
        <span className="text-sm text-gray-500">{testimonial.date}</span>
      </div>
    </div>
  );
}