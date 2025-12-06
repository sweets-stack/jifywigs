'use client';
// client/src/components/services/ServiceCard.tsx
import {
  SparklesIcon,
  ScissorsIcon,
  PaintBrushIcon,
  WrenchScrewdriverIcon,
  ArrowRightIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { IService } from '@jifywigs/shared/types';

const iconMap: Record<string, JSX.Element> = {
  washing: <SparklesIcon className="w-6 h-6" />,
  coloring: <PaintBrushIcon className="w-6 h-6" />,
  revamping: <ScissorsIcon className="w-6 h-6" />,
  repair: <WrenchScrewdriverIcon className="w-6 h-6" />,
};

interface ServiceCardProps {
  service: IService;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const serviceIcon = iconMap[service.slug] || <SparklesIcon className="w-6 h-6" />;
  
  return (
    <div className="group relative bg-white rounded-2xl border border-gray-200 p-6  hover:shadow-xl transition-all duration-300">
      {/* Popular Badge */}
      {service.slug === 'revamping' && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-3 py-1 bg-jify-primary-600 text-white text-xs font-semibold rounded-full">
            Most Popular
          </span>
        </div>
      )}
      
      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-jify-primary-50 to-jify-primary-100 flex items-center justify-center text-jify-primary-600 mb-6 group-hover:scale-110 transition-transform duration-300">
        <div className="w-8 h-8">
          {serviceIcon}
        </div>
      </div>
      
      {/* Content */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-jify-primary-700 transition-colors">
          {service.name}
        </h3>
        
        <p className="text-gray-600 leading-relaxed">
          {service.description}
        </p>
        
        {/* Details */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{service.durationMins} mins</span>
            </div>
            <div className="text-lg font-bold text-jify-primary-700">
              ₦{service.basePrice.toLocaleString()}
            </div>
          </div>
          
          {/* Action */}
          <Link 
            href={`/services/book?service=${service.slug}`}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-jify-primary-50 text-jify-primary-600 hover:bg-jify-primary-100 transition-colors group-hover:scale-110"
            aria-label={`Book ${service.name}`}
          >
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
        
        {/* Features List */}
        {service.features && service.features.length > 0 && (
          <div className="pt-4 border-t border-gray-100">
            <ul className="space-y-2">
              {service.features.slice(0, 3).map((feature: string, index: number) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-jify-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};