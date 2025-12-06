// components/shop/CategoryCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface CategoryCardProps {
  category: {
    id: number;
    name: string;
    slug: string;
    image: string;
    productCount: number;
  };
}

export function CategoryCard({ category }: CategoryCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // REMOVE the outer Link wrapper and put it around the content
  return (
    <div 
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Single Link at the top level */}
      <Link href={`/shop/${category.slug}`}>
        <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-jify-primary-300 hover:shadow-lg transition-all duration-300">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gray-50">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 180px, (max-width: 1024px) 200px, 220px"
            />
            
            {/* Hover Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="text-white">
                  <div className="text-sm font-medium">Shop Now</div>
                  <div className="text-xs opacity-90">{category.productCount} products</div>
                </div>
                
                {/* Arrow Icon - Visible on both states */}
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                  ${isHovered ? 'bg-white text-jify-primary-700' : 'bg-white/20 text-white'}
                `}>
                  <ArrowRightIcon className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Category Info */}
          <div className="p-4 text-center">
            <h3 className="font-semibold text-gray-900 group-hover:text-jify-primary-700 transition-colors">
              {category.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{category.productCount} products</p>
          </div>
        </div>
      </Link>
    </div>
  );
}