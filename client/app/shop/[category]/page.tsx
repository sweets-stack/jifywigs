// client/app/shop/[slug]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  color: string;
  density: number;
  laceType: string;
  inStock: boolean;
  stockCount: number;
  images: string[];
  rating?: number;
  reviewCount?: number;
}

const mockProducts: Record<string, Product> = {
  'premium-bone-straight': {
    _id: '1',
    name: 'Premium Bone Straight Wig',
    slug: 'premium-bone-straight',
    description: '180% density, frontal lace, natural black',
    price: 45000,
    discountPrice: 38000,
    category: 'bone_straight',
    color: 'Natural Black',
    density: 180,
    laceType: 'frontal',
    inStock: true,
    stockCount: 12,
    images: ['https://placehold.co/600x600/EEE/999?text=Wig1'],
    rating: 4.8,
    reviewCount: 86,
  },
  'curly-closure': {
    _id: '2',
    name: 'Curly Closure Wig',
    slug: 'curly-closure',
    description: 'Soft curls, closure lace, 150% density',
    price: 35000,
    category: 'curly',
    color: 'Dark Brown',
    density: 150,
    laceType: 'closure',
    inStock: true,
    stockCount: 8,
    images: ['https://placehold.co/600x600/EEE/999?text=Wig2'],
    rating: 4.5,
    reviewCount: 42,
  }
};

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const p = mockProducts[params.slug];
    if (!p) {
      notFound();
    }
    setProduct(p);
  }, [params.slug]);

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto pt-8 pb-52">
      <div className="mb-4">
        <a href="/shop" className="text-pink-600 hover:underline">← Back to Shop</a>
      </div>
      
      <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-100 rounded-xl aspect-square">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        
        <div>
          <p className="text-gray-700 mb-4">{product.description}</p>
          
          <div className="mb-6">
            <p className="text-3xl font-bold text-pink-600">
              ₦{product.discountPrice ? product.discountPrice.toLocaleString() : product.price.toLocaleString()}
            </p>
            {product.discountPrice && (
              <p className="text-gray-500 line-through text-lg">
                ₦{product.price.toLocaleString()}
              </p>
            )}
          </div>

          <button className="w-full bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium transition mb-6">
            Add to Cart
          </button>

          <div className="space-y-3 border-t pt-6">
            <h3 className="font-bold text-lg">Product Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-600">Color:</div>
              <div className="font-medium">{product.color}</div>
              
              <div className="text-gray-600">Density:</div>
              <div className="font-medium">{product.density}%</div>
              
              <div className="text-gray-600">Lace Type:</div>
              <div className="font-medium capitalize">{product.laceType}</div>
              
              <div className="text-gray-600">Stock:</div>
              <div className={product.inStock ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                {product.inStock ? `${product.stockCount} available` : 'Out of stock'}
              </div>
            </div>
          </div>

          {product.rating && (
            <div className="mt-6 flex items-center gap-2">
              <div className="flex text-yellow-400">
                {'★'.repeat(Math.round(product.rating))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}