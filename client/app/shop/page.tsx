'use client'

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { IProduct } from '@jifywigs/shared/types';
import { ProductCard } from '@/components/shop/ProductCard';
import { MobileFilters } from '@/components/shop/MobileFilters';
import { FilterSidebar } from '@/components/shop/FilterSidebar';
import {
  Search,
  LayoutGrid,
  LayoutList,
  Filter,
  RefreshCw,
  X,
  Flame,
  Truck,
  Clock,
  BadgePercent,
  Package,
  Palette,
  Ruler,
  Users,
  Gem,
  Wand2,
  Scissors,
  Star,
  Sparkles
} from 'lucide-react';

// Categories with Lucide icons
const categories = [
  { id: 'bone_straight', name: 'Bone Straight', icon: <Wand2 className="w-4 h-4" /> },
  { id: 'curly', name: 'Curly', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'colored', name: 'Colored', icon: <Palette className="w-4 h-4" /> },
  { id: 'braided', name: 'Braided', icon: <Scissors className="w-4 h-4" /> },
  { id: 'mens', name: 'Men\'s Hair', icon: <Users className="w-4 h-4" /> },
  { id: 'accessories', name: 'Accessories', icon: <Gem className="w-4 h-4" /> },
  { id: 'tools', name: 'Hair Tools', icon: <Scissors className="w-4 h-4" /> },
  { id: 'glueless', name: 'Glueless', icon: <Package className="w-4 h-4" /> },
];

const laceTypes = [
  { id: 'frontal', name: 'Frontal', description: 'Full hairline' },
  { id: 'closure', name: 'Closure', description: 'Center part only' },
  { id: 'full_lace', name: 'Full Lace', description: 'Entire cap' },
  { id: 'glueless', name: 'Glueless', description: 'No glue needed' },
];

const densities = [
  { id: '130', name: '130%', description: 'Light & natural' },
  { id: '150', name: '150%', description: 'Medium fullness' },
  { id: '180', name: '180%', description: 'Full & voluminous' },
  { id: '200', name: '200%', description: 'Extra full' },
];

const lengths = [
  { id: 'short', name: 'Short', range: '10-14"' },
  { id: 'medium', name: 'Medium', range: '16-20"' },
  { id: 'long', name: 'Long', range: '22-26"' },
  { id: 'extra_long', name: 'Extra Long', range: '28"+' },
];

const colors = [
  { id: 'natural_black', name: 'Natural Black', hex: '#000000' },
  { id: 'dark_brown', name: 'Dark Brown', hex: '#3C2F2F' },
  { id: 'light_brown', name: 'Light Brown', hex: '#8B4513' },
  { id: 'blonde', name: 'Blonde', hex: '#F5DEB3' },
  { id: 'balayage', name: 'Balayage', hex: 'linear-gradient(45deg, #8B4513, #F5DEB3)' },
  { id: 'highlights', name: 'Highlights', hex: 'linear-gradient(45deg, #3C2F2F, #8B4513)' },
];

const wigTypes = [
  { id: 'wig', name: 'Full Wig' },
  { id: 'closure_wig', name: 'Closure Wig' },
  { id: 'frontal_wig', name: 'Frontal Wig' },
  { id: 'u_part', name: 'U-Part Wig' },
  { id: 'headband', name: 'Headband Wig' },
];

const priceRanges = [
  { id: 'budget', name: 'Budget', min: 0, max: 25000 },
  { id: 'mid', name: 'Mid-Range', min: 25001, max: 50000 },
  { id: 'premium', name: 'Premium', min: 50001, max: 100000 },
  { id: 'luxury', name: 'Luxury', min: 100001, max: 200000 },
];

export default function ShopPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    lace: searchParams.get('lace') || '',
    density: searchParams.get('density') || '',
    length: searchParams.get('length') || '',
    color: searchParams.get('color') || '',
    wigType: searchParams.get('wigType') || '',
    priceRange: searchParams.get('priceRange') || '',
    priceMin: searchParams.get('price_min') ? Number(searchParams.get('price_min')) : 0,
    priceMax: searchParams.get('price_max') ? Number(searchParams.get('price_max')) : 200000,
    sale: searchParams.get('sale') === 'true',
    inStock: searchParams.get('inStock') !== 'false',
    preOrder: searchParams.get('preOrder') === 'true',
    bestSeller: searchParams.get('bestSeller') === 'true',
    expressDelivery: searchParams.get('express') === 'true',
  });

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sort, setSort] = useState(searchParams.get('sort') || 'featured');
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  // Fetch real products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log('Fetching products from Express API...');
        
        const res = await fetch('http://localhost:3001/api/products', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        const data = await res.json();
        
        if (!res.ok) {
          console.warn('Express API returned non-ok status:', res.status);
          console.warn('Response:', data);
          setProducts([]);
        } else {
          console.log(`Fetched ${data.length} products from Express`);
          setProducts(data);
        }
        
      } catch (err) {
        console.error('Error fetching products from Express:', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.search) params.set('search', filters.search);
    if (filters.category) params.set('category', filters.category);
    if (filters.lace) params.set('lace', filters.lace);
    if (filters.density) params.set('density', filters.density);
    if (filters.length) params.set('length', filters.length);
    if (filters.color) params.set('color', filters.color);
    if (filters.wigType) params.set('wigType', filters.wigType);
    if (filters.priceRange) params.set('priceRange', filters.priceRange);
    if (filters.priceMin > 0) params.set('price_min', filters.priceMin.toString());
    if (filters.priceMax < 200000) params.set('price_max', filters.priceMax.toString());
    if (filters.sale) params.set('sale', 'true');
    if (filters.preOrder) params.set('preOrder', 'true');
    if (filters.bestSeller) params.set('bestSeller', 'true');
    if (filters.expressDelivery) params.set('express', 'true');
    if (!filters.inStock) params.set('inStock', 'false');
    if (sort !== 'featured') params.set('sort', sort);
    
    router.push(`/shop?${params.toString()}`, { scroll: false });
  }, [filters, sort, router]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = products.filter(product => {
      if (filters.search && 
          !product.name.toLowerCase().includes(filters.search.toLowerCase()) &&
          !product.description.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      if (filters.category) {
        const backendCategory = filters.category.replace('-', '_');
        if (product.category !== backendCategory) {
          return false;
        }
      }
      
      if (filters.lace && product.laceType !== filters.lace) {
        return false;
      }
      
      if (filters.density && product.density !== Number(filters.density)) {
        return false;
      }
      
      if (filters.length && product.length !== filters.length) {
        return false;
      }
      
      if (filters.color && product.color.toLowerCase() !== filters.color.replace('_', ' ').toLowerCase()) {
        return false;
      }
      
      if (filters.wigType && product.type !== filters.wigType) {
        return false;
      }
      
      if (filters.priceRange) {
        const range = priceRanges.find(r => r.id === filters.priceRange);
        if (range) {
          const price = product.discountPrice || product.price;
          if (price < range.min || price > range.max) {
            return false;
          }
        }
      }
      
      const price = product.discountPrice || product.price;
      if (price < filters.priceMin || price > filters.priceMax) {
        return false;
      }
      
      if (filters.sale && !product.discountPrice) return false;
      
      if (filters.inStock && !product.inStock) return false;
      
      if (filters.preOrder && !product.isPreOrder) return false;
      
      if (filters.bestSeller && !product.tags?.includes('Best Seller')) return false;
      
      if (filters.expressDelivery && !product.tags?.includes('Express Delivery')) {
        return false;
      }
      
      return true;
    });

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'popular':
        result.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'featured':
      default:
        result.sort((a, b) => {
          const aScore = 
            (a.tags?.includes('Best Seller') ? 2 : 0) +
            (a.discountPrice ? 1.5 : 0) +
            (a.rating || 0) * 0.5;
          const bScore = 
            (b.tags?.includes('Best Seller') ? 2 : 0) +
            (b.discountPrice ? 1.5 : 0) +
            (b.rating || 0) * 0.5;
          return bScore - aScore;
        });
        break;
    }

    return result;
  }, [products, filters, sort]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleCheckboxChange = (key: string) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key as keyof typeof filters] }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      category: '',
      lace: '',
      density: '',
      length: '',
      color: '',
      wigType: '',
      priceRange: '',
      priceMin: 0,
      priceMax: 200000,
      sale: false,
      inStock: true,
      preOrder: false,
      bestSeller: false,
      expressDelivery: false,
    });
  };

  // Apply price range when selected
  useEffect(() => {
    if (filters.priceRange) {
      const range = priceRanges.find(r => r.id === filters.priceRange);
      if (range) {
        setFilters(prev => ({
          ...prev,
          priceMin: range.min,
          priceMax: range.max
        }));
      }
    }
  }, [filters.priceRange]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Products</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-jify-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  // Active filter count
  const activeFilterCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'priceMin' && value === 0) return false;
    if (key === 'priceMax' && value === 200000) return false;
    if (key === 'inStock' && value === true) return false;
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value !== '';
    return false;
  }).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-jify-primary-50 to-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Wig Collection</h1>
              <p className="mt-2 text-lg text-gray-600">
                Discover {products.length} premium wigs for every style
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className="relative flex-1 md:flex-none md:w-64">
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full rounded-md border-0 py-2.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-jify-primary-500 sm:text-sm sm:leading-6"
                    placeholder="Search wigs, colors, styles..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                
                <button
                  type="button"
                  className="md:hidden p-2 text-gray-400 hover:text-gray-500 relative"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <Filter className="h-5 w-5" />
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-jify-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="block rounded-md border-0 py-2.5 pl-2  text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-jify-primary-500 sm:text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="popular">Most Popular</option>
                  <option value="name-asc">Name: A-Z</option>
                  <option value="name-desc">Name: Z-A</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active filters chips */}
          {activeFilterCount > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {Object.entries(filters).map(([key, value]) => {
                if (key === 'priceMin' && value === 0) return null;
                if (key === 'priceMax' && value === 200000) return null;
                if (key === 'inStock' && value === true) return null;
                if (!value) return null;
                
                let displayText = '';
                
                if (key === 'category') {
                  const cat = categories.find(c => c.id === value);
                  displayText = cat ? `Category: ${cat.name}` : '';
                } else if (key === 'lace') {
                  const lace = laceTypes.find(l => l.id === value);
                  displayText = lace ? `Lace: ${lace.name}` : '';
                } else if (key === 'density') {
                  const density = densities.find(d => d.id === value);
                  displayText = density ? `Density: ${density.name}` : '';
                } else if (key === 'length') {
                  const len = lengths.find(l => l.id === value);
                  displayText = len ? `Length: ${len.name}` : '';
                } else if (key === 'color') {
                  const col = colors.find(c => c.id === value);
                  displayText = col ? `Color: ${col.name}` : '';
                } else if (key === 'wigType') {
                  const type = wigTypes.find(t => t.id === value);
                  displayText = type ? `Type: ${type.name}` : '';
                } else if (key === 'priceRange') {
                  const range = priceRanges.find(r => r.id === value);
                  displayText = range ? `Price: ${range.name}` : '';
                } else if (key === 'priceMin' || key === 'priceMax') {
                  displayText = `Price: ₦${value.toLocaleString()}`;
                } else if (key === 'sale') {
                  displayText = 'On Sale';
                } else if (key === 'preOrder') {
                  displayText = 'Pre-Order';
                } else if (key === 'bestSeller') {
                  displayText = 'Best Sellers';
                } else if (key === 'expressDelivery') {
                  displayText = 'Express Delivery';
                } else if (key === 'search') {
                  displayText = `Search: "${value}"`;
                }
                
                if (!displayText) return null;
                
                return (
                  <span
                    key={key}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-jify-primary-100 text-jify-primary-700"
                  >
                    {displayText}
                    <button
                      onClick={() => handleFilterChange(key, key === 'priceMin' ? 0 : key === 'priceMax' ? 200000 : '')}
                      className="ml-1 text-jify-primary-500 hover:text-jify-primary-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                );
              })}
              <button
                onClick={resetFilters}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                Clear all
              </button>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:w-80">
            <FilterSidebar
              filters={filters}
              handleFilterChange={handleFilterChange}
              handleCheckboxChange={handleCheckboxChange}
              resetFilters={resetFilters}
              categories={categories}
              laceTypes={laceTypes}
              densities={densities}
              lengths={lengths}
              colors={colors}
              wigTypes={wigTypes}
              priceRanges={priceRanges}
            />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{filteredProducts.length}</span> of <span className="font-semibold">{products.length}</span> products
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">View:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setView('grid')}
                    className={`px-3 py-1 rounded flex items-center gap-1 ${view === 'grid' ? 'bg-white shadow-sm' : ''}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                    Grid
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className={`px-3 py-1 rounded flex items-center gap-1 ${view === 'list' ? 'bg-white shadow-sm' : ''}`}
                  >
                    <LayoutList className="w-4 h-4" />
                    List
                  </button>
                </div>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  We couldn't find any products matching your filters. Try adjusting your search or filters.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={resetFilters} variant="outline" className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Clear All Filters
                  </Button>
                  <Button onClick={() => handleFilterChange('search', '')} className="flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Browse All Products
                  </Button>
                </div>
              </div>
            ) : view === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    tags={product.tags || []}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <div key={product._id} className="bg-white rounded-xl shadow-sm p-4 flex gap-4 hover:shadow-md transition-shadow">
                    <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <img 
                        src={product.images?.[0] || '/images/placeholder.jpg'} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                        </div>
                        <div className="text-right">
                          {product.discountPrice ? (
                            <>
                              <span className="text-lg font-bold text-jify-primary">
                                ₦{product.discountPrice.toLocaleString()}
                              </span>
                              <span className="ml-2 text-sm text-gray-500 line-through">
                                ₦{product.price.toLocaleString()}
                              </span>
                            </>
                          ) : (
                            <span className="text-lg font-bold text-jify-primary">
                              ₦{product.price.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {product.rating?.toFixed(1) || '4.5'} ({product.reviewCount || 0})
                          </span>
                          <span>•</span>
                          <span>{product.length}</span>
                          <span>•</span>
                          <span>{product.density}% density</span>
                          <span>•</span>
                          <span className={`px-2 py-0.5 rounded-full flex items-center gap-1 ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            <Package className="w-3 h-3" />
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                        <Button size="sm" className="bg-jify-primary hover:bg-jify-primary/90">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Sidebar */}
      <MobileFilters
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        filters={filters}
        handleFilterChange={handleFilterChange}
        handleCheckboxChange={handleCheckboxChange}
        resetFilters={resetFilters}
        categories={categories}
        laceTypes={laceTypes}
        densities={densities}
        lengths={lengths}
        colors={colors}
        wigTypes={wigTypes}
        priceRanges={priceRanges}
      />
    </div>
  );
}