// client/app/dashboard/wishlist/page.tsx
'use client'; // Add this since you're using interactive features

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { ProductCard } from '@/components/shop/ProductCard';
import { Button } from '@/components/ui/Button'; // Add Button import
import { IProduct } from '@jifywigs/shared/types';
import { ProductType, WigLength, WigLaceType } from '@jifywigs/shared/enums'; // Add these imports
import { HeartIcon } from '@heroicons/react/24/outline';
import { useWishlist } from '@/hooks/useWishlist';

export default function WishlistPage() {
  const { items: wishlistItems, toggle: toggleWishlist } = useWishlist();
  const [wishlistProducts, setWishlistProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch actual wishlist products
  useEffect(() => {
    const fetchWishlistProducts = async () => {
      try {
        setLoading(true);
        // In a real app, you'd fetch products by their IDs from the API
        // For now, using mock data
        const mockProducts: IProduct[] = [
          {
            _id: '1',
            name: 'Premium Bone Straight Wig',
            slug: 'premium-bone-straight',
            description: '180% density, frontal lace',
            price: 45000,
            discountPrice: 38000,
            type: ProductType.WIG, // Use enum
            category: 'bone_straight',
            color: 'Natural Black',
            length: WigLength.LONG, // Use enum
            density: 180,
            laceType: WigLaceType.FRONTAL, // Use enum
            inStock: true,
            stockCount: 12,
            isPreOrder: false,
            images: ['https://placehold.co/400x400/EEE/999?text=Wig1'],
            rating: 4.8,
            reviewCount: 86,
          },
          {
            _id: '2',
            name: 'Curly Closure Wig',
            slug: 'curly-closure',
            description: 'Soft curls, closure lace',
            price: 35000,
            type: ProductType.WIG, // Use enum
            category: 'curly',
            color: 'Dark Brown',
            length: WigLength.MEDIUM, // Use enum
            density: 150,
            laceType: WigLaceType.CLOSURE, // Use enum
            inStock: true,
            stockCount: 8,
            images: ['https://placehold.co/400x400/EEE/999?text=Wig2'],
            rating: 4.5,
            reviewCount: 42,
          },
        ];
        setWishlistProducts(mockProducts);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistProducts();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Wishlist</h1>
          <p className="text-gray-600 mt-1">Loading your saved wigs...</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Wishlist</h1>
        <p className="text-gray-600 mt-1">
          {wishlistProducts.length} saved {wishlistProducts.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      {wishlistProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                // ProductCard handles its own wishlist toggle internally
                // Just pass tags if needed
                tags={product.tags || []}
              />
            ))}
          </div>
          
          {/* Clear All Button */}
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => {
                if (confirm('Remove all items from wishlist?')) {
                  // Clear wishlist logic here
                  console.log('Clearing wishlist');
                }
              }}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              Clear All
            </Button>
          </div>
        </>
      ) : (
        <Card>
          <CardContent className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <HeartIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900">Your wishlist is empty</h3>
            <p className="text-gray-600 mt-2 max-w-md mx-auto">
              Save your favorite wigs to buy them later or keep track of styles you love.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button className="bg-jify-primary-500 hover:bg-jify-primary-600">
                  Browse Wigs
                </Button>
              </Link>
              <Link href="/shop?sale=true">
                <Button variant="outline" className="border-jify-primary-500 text-jify-primary-500 hover:bg-jify-primary-50/10">
                  View Sale Items
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}