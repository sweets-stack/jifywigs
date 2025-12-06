// client/src/components/shop/ProductCard.tsx
'use client';

import { StarIcon, HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid, HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { IProduct } from '@jifywigs/shared/types';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ProductCardProps {
  product: IProduct;
  tags?: string[]; // ← optional
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const rating = product.rating || 4.2;
  const reviewCount = product.reviewCount || 128;
  const { toggle, isInWishlist } = useWishlist();
  const { addToCart, items: cartItems } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  

  // Format price with Nigerian Naira symbol
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('NGN', '₦');
  };

  // Ensure product._id is string
  const productId = product._id || `temp-${Math.random().toString(36).substr(2, 9)}`;
  
  // Ensure product.images[0] is string
  const productImage = product.images?.[0] || '/images/placeholder.jpg';

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    const cartProduct = {
      id: productId,
      name: product.name,
      price: product.discountPrice || product.price,
      image: productImage,
      qty: 1
    };
    
    addToCart(cartProduct);
    
    // Show feedback
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 500);
  };

  const handleWishlistToggle = () => {
  if (!isAuthenticated) {
    router.push(`/login?callbackUrl=/product/${product.slug || productId}`);
    return;
  }
  toggle(productId);
};

  const handleQuickView = () => {
    router.push(`/product/${product.slug || productId}`);
  };

  // Check if product is already in cart
  const isInCart = cartItems.some(item => item.id === productId);

  return (
    <div className="group relative rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Badges */}
      {!product.inStock && (
        <div className="absolute top-3 left-3 z-10">
          <Badge variant="danger">Sold Out</Badge>
        </div>
      )}
      {product.discountPrice && product.discountPrice < product.price && (
        <div className="absolute top-3 right-3 z-10">
          <Badge variant="secondary">
            Sale
          </Badge>
        </div>
      )}
      {product.isPreOrder && (
        <div className="absolute top-3 left-3 z-10">
          <Badge variant="secondary">Pre-order</Badge>
        </div>
      )}

      {/* Image */}
      <div 
        className="relative aspect-square w-full bg-gray-50 overflow-hidden cursor-pointer"
        onClick={handleQuickView}
      >
        {productImage ? (
          <Image
            src={productImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={product.isPreOrder || product.tags?.includes('Best Seller')}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Quick Actions - Show on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
          <div className="flex items-center space-x-2">
            <Button
              size="icon"
              className="text-white hover:bg-gray-100 shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              aria-label="Add to cart"
              disabled={!product.inStock || isAddingToCart}
            >
              {isAddingToCart ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
              ) : isInCart ? (
                <span className="text-green-600">✓</span>
              ) : (
                <ShoppingCartIcon className="w-5 h-5" />
              )}
            </Button>
            <Button
  size="icon"
  className={`shadow-lg ${
    isInWishlist(productId)
      ? 'bg-jify-primary-300 text-white hover:bg-jify-primary-300' 
      : 'bg-gray-500 text-gray-900 hover:bg-gray-100'
  }`}
  onClick={(e) => {
    e.stopPropagation();
    handleWishlistToggle();
  }}
  aria-label={isInWishlist(productId) ? 'Remove from wishlist' : 'Add to wishlist'}
>
  {isInWishlist(productId) ? (
    <HeartSolid className="w-5 h-5" />
  ) : (
    <HeartIcon className="w-5 h-5" />
  )}
</Button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Product name */}
        <h3 
          className="font-semibold text-gray-900 line-clamp-2 h-12 text-sm md:text-base cursor-pointer hover:text-jify-primary-500"
          onClick={handleQuickView}
        >
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mt-2 space-x-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.floor(rating) ? (
                  <StarSolid className="w-4 h-4 text-amber-400" />
                ) : (
                  <StarIcon className="w-4 h-4 text-gray-300" />
                )}
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-1">
            ({reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-baseline">
          {product.discountPrice && product.discountPrice < product.price ? (
            <>
              <span className="text-lg font-bold text-jify-primary-500">
                {formatPrice(product.discountPrice)}
              </span>
              <span className="ml-2 text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
              {product.discountPrice && (
                <span className="ml-2 text-xs font-semibold text-red-500">
                  -{Math.round((1 - product.discountPrice / product.price) * 100)}%
                </span>
              )}
            </>
          ) : (
            <span className="text-lg font-bold text-jify-primary-500">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Product Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {product.tags.slice(0, 2).map((tag, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA Button */}
        <Button
          className={`w-full mt-4 ${
            !product.inStock 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300' 
              : isInCart
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-jify-primary-500 hover:bg-jify-primary-500/90 text-white'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            if (!product.inStock) return;
            if (!isAuthenticated) {
              router.push(`/login?callbackUrl=/product/${product.slug || productId}`);
              return;
            }
            handleAddToCart();
          }}
          size="sm"
          disabled={!product.inStock || isAddingToCart}
        >
          {!product.inStock 
            ? 'Out of Stock' 
            : isInCart
              ? '✓ Added to Cart'
              : product.isPreOrder 
                ? 'Pre-order Now'
                : isAddingToCart
                  ? 'Adding...'
                  : 'Add to Cart'
          }
        </Button>
      </div>
    </div>
  );
};