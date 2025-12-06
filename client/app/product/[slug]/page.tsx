"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeftIcon, 
  HeartIcon, 
  ShoppingCartIcon, 
  StarIcon as StarOutlineIcon,
  StarIcon as StarSolidIcon,
  ShareIcon, 
  ChevronRightIcon,
  CameraIcon,
  SparklesIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/shop/ProductCard";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { IProduct, IReview } from "@jifywigs/shared/types";
import { ProductType, WigLaceType, WigLength } from "@jifywigs/shared/enums";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggle: toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specifications" | "reviews">("description");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/slug/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        }
      } catch (error) {
        console.error("Fetch product error:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/products/slug/${slug}/reviews`);
        if (res.ok) {
          const data = await res.json();
          setReviews(data.reviews || []);
        }
      } catch (error) {
        console.error("Fetch reviews error:", error);
      }
    };

    if (slug) {
      fetchProduct();
      fetchReviews();
    }
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    const item = {
      id: product._id!,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.images[0],
    };
    addToCart(item, quantity);
    router.push("/cart");
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    toggleWishlist(product._id!);
  };

  const handleQuantityChange = (newQty: number) => {
    if (newQty < 1) return;
    if (product && newQty <= product.stockCount) {
      setQuantity(newQty);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-jify-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <Button onClick={() => router.push("/shop")}>Browse Wigs</Button>
        </div>
      </div>
    );
  }

  const finalPrice = product.discountPrice || product.price;
  const savings = product.price - finalPrice;
  const inWishlist = isInWishlist(product._id!);

  return (
    <div className="min-h-screen bg-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li><Link href="/" className="hover:text-jify-primary-500">Home</Link></li>
          <ChevronRightIcon className="w-4 h-4" />
          <li><Link href="/shop" className="hover:text-jify-primary-500">Shop</Link></li>
          <ChevronRightIcon className="w-4 h-4" />
          <li className="text-gray-900 truncate max-w-xs">{product.name}</li>
        </ol>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
          <div className="flex flex-col-reverse">
            <div className="mt-6 w-full overflow-x-auto pb-4">
              <div className="flex space-x-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 rounded-md overflow-hidden ${selectedImageIndex === index ? 'ring-2 ring-jify-primary-500' : 'ring-1 ring-gray-200'}`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={product.images[selectedImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <div className="mt-3 flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < Math.floor(product.rating || 0) ? (
                          <StarSolidIcon className="w-5 h-5 text-yellow-400" />
                        ) : i < (product.rating || 0) ? (
                          <StarSolidIcon className="w-5 h-5 text-yellow-400 opacity-50" />
                        ) : (
                          <StarOutlineIcon className="w-5 h-5 text-gray-300" />
                        )}
                      </span>
                    ))}
                  </div>
                  <p className="ml-2 text-sm text-gray-500">
                    {(product.rating || 0).toFixed(1)} ({product.reviewCount || 0} reviews)
                  </p>
                </div>
              </div>
              <button
                className="p-2 text-gray-400 hover:text-gray-500"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: product.name, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
              >
                <ShareIcon className="w-6 h-6" />
              </button>
            </div>

            {product.tags && product.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {product.tags.map((tag, i) => (
                  <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-jify-primary-100 text-jify-primary-700">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6">
              <div className="flex items-center">
                {product.discountPrice ? (
                  <>
                    <p className="text-4xl font-bold text-gray-900">₦{finalPrice.toLocaleString()}</p>
                    <p className="ml-4 text-2xl text-gray-500 line-through">₦{product.price.toLocaleString()}</p>
                    <span className="ml-4 bg-red-100 text-red-800 text-sm font-semibold px-2.5 py-0.5 rounded">
                      Save ₦{savings.toLocaleString()}
                    </span>
                  </>
                ) : (
                  <p className="text-4xl font-bold text-gray-900">₦{finalPrice.toLocaleString()}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                {product.inStock ? (
                  <span className="flex items-center text-green-600">
                    <SparklesIcon className="w-5 h-5 mr-1.5" />
                    In Stock ({product.stockCount} available)
                  </span>
                ) : (
                  <span className="flex items-center text-red-600">
                    <svg className="w-5 h-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            <div className="mt-8">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg w-32">
                <button
                  className="w-10 h-10 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max={product.stockCount}
                  value={quantity}
                  onChange={(e) => handleQuantityChange(Number(e.target.value))}
                  className="w-full text-center py-2 px-1 border-0 focus:ring-0 text-gray-900"
                />
                <button
                  className="w-10 h-10 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stockCount}
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                className="flex-1 bg-jify-primary-500 hover:bg-jify-primary-600 py-4"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCartIcon className="w-5 h-5 mr-2" />
                {product.inStock ? 'Add to Cart' : 'Notify When Available'}
              </Button>
              <Button
                variant="outline"
                className={`flex-1 py-4 ${inWishlist ? 'border-red-500 text-red-500' : ''}`}
                onClick={handleToggleWishlist}
              >
                <HeartIcon className={`w-5 h-5 mr-2 ${inWishlist ? 'fill-current text-red-500' : ''}`} />
                {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery & Returns</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Free delivery on orders over ₦50,000</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>1-3 business days delivery in Lagos</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>7-day return policy for unused items</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'description', name: 'Description' },
                { id: 'specifications', name: 'Specifications' },
                { id: 'reviews', name: `Reviews (${product.reviewCount || 0})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-jify-primary-500 text-jify-primary-500'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab(tab.id as any)}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-10">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h2>
                <p className="text-gray-600">{product.description}</p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="divide-y divide-gray-200">
                      <tr><td className="px-6 py-4 font-medium text-gray-900 w-1/3">Type</td><td className="px-6 py-4">{product.type}</td></tr>
                      <tr><td className="px-6 py-4 font-medium text-gray-900 w-1/3">Category</td><td className="px-6 py-4">{product.category}</td></tr>
                      <tr><td className="px-6 py-4 font-medium text-gray-900 w-1/3">Lace</td><td className="px-6 py-4">{product.laceType}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="mb-8">
                  <div className="text-5xl font-bold text-gray-900">{(product.rating || 0).toFixed(1)}</div>
                </div>
                <div className="space-y-8">
                  {reviews.map((review) => (
                    <div key={review._id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-jify-primary-400 to-jify-primary-600 flex items-center justify-center text-white font-bold">
                            {review.userName.split(' ').map(n => n[0]).join('')}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <span key={i}>
                                {i < review.rating ? (
                                  <StarSolidIcon className="w-5 h-5 text-yellow-400" />
                                ) : (
                                  <StarOutlineIcon className="w-5 h-5 text-gray-300" />
                                )}
                              </span>
                            ))}
                          </div>
                          <p className="mt-2 text-gray-600">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}