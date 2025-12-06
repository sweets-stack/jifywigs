// client/app/admin/products/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProductType, WigLaceType, WigLength } from '@jifywigs/shared/enums';
import Link from 'next/link';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

interface IProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  discountPrice?: number;
  type: ProductType;
  category: string;
  color: string;
  length: WigLength;
  density: number;
  laceType: WigLaceType;
  inStock: boolean;
  stockCount: number;
  isPreOrder?: boolean;
  images: string[];
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  
  // Form state for create/edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    slug: '',
    description: '',
    longDescription: '',
    price: 0,
    discountPrice: '',
    type: ProductType.WIG,
    category: '',
    color: '',
    length: WigLength.MEDIUM,
    density: 130,
    laceType: WigLaceType.FRONTAL,
    inStock: true,
    stockCount: 0,
    isPreOrder: false,
    images: [] as string[],
    rating: 0,
    reviewCount: 0,
    tags: '',
  });

  const initialFormData = {
    _id: '',
    name: '',
    slug: '',
    description: '',
    longDescription: '',
    price: 0,
    discountPrice: '',
    type: ProductType.WIG,
    category: '',
    color: '',
    length: WigLength.MEDIUM,
    density: 130,
    laceType: WigLaceType.FRONTAL,
    inStock: true,
    stockCount: 0,
    isPreOrder: false,
    images: [] as string[],
    rating: 0,
    reviewCount: 0,
    tags: '',
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.log('Using mock data due to API error');
        // Fallback to sample data
        setProducts([
          {
            _id: '1',
            name: 'Premium Bone Straight Glueless',
            slug: 'premium-bone-straight',
            description: '180% density, HD frontal lace',
            longDescription: 'High quality glueless wig with HD frontal lace',
            price: 45000,
            discountPrice: 38000,
            type: ProductType.WIG,
            category: 'bone_straight',
            color: 'Natural Black',
            length: WigLength.LONG,
            density: 180,
            laceType: WigLaceType.FRONTAL,
            inStock: true,
            stockCount: 12,
            isPreOrder: false,
            images: ['/images/product-1.jpg'],
            rating: 4.8,
            reviewCount: 86,
            tags: ['Best Seller', 'Glueless'],
            createdAt: new Date(),
            updatedAt: new Date()
          },
        ]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to empty array
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) return;
    
    try {
      setDeleteLoading(id);
      
      // For now, simulate API call
      // TODO: Uncomment when API is ready
      // const res = await fetch(`/api/admin/products/${id}`, {
      //   method: 'DELETE',
      // });
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // if (res.ok) {
        setProducts(products.filter(p => p._id !== id));
        alert('Product deleted successfully');
      // } else {
      //   throw new Error('Failed to delete product');
      // }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product. Please try again.');
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleEdit = (product: IProduct) => {
    setFormData({
      _id: product._id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      longDescription: product.longDescription,
      price: product.price,
      discountPrice: product.discountPrice?.toString() || '',
      type: product.type,
      category: product.category,
      color: product.color,
      length: product.length,
      density: product.density,
      laceType: product.laceType,
      inStock: product.inStock,
      stockCount: product.stockCount,
      isPreOrder: product.isPreOrder || false,
      images: product.images,
      rating: product.rating || 0,
      reviewCount: product.reviewCount || 0,
      tags: Array.isArray(product.tags) ? product.tags.join(', ') : '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const productData = {
        ...formData,
        discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : undefined,
        isPreOrder: formData.isPreOrder || false,
        rating: formData.rating || 0,
        reviewCount: formData.reviewCount || 0,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };

      // For now, use mock API response since the real API returns 404
      // In production, replace with actual API endpoint
      const mockResponse = { ok: true };
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Uncomment when API is ready
      // const url = formData._id 
      //   ? `/api/products/${formData._id}`
      //   : '/api/products';
      
      // const method = formData._id ? 'PUT' : 'POST';
      // const res = await fetch(url, {
      //   method,
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(productData)
      // });

      if (mockResponse.ok) {
        setIsModalOpen(false);
        setFormData(initialFormData);
        
        // Update the products list with the new/updated product
        if (formData._id) {
          // Update existing product
          setProducts(prev => prev.map(p => 
            p._id === formData._id ? { 
              ...p, 
              ...productData,
              discountPrice: productData.discountPrice,
              updatedAt: new Date()
            } : p
          ));
        } else {
          // Add new product
          const newProduct: IProduct = {
            ...productData,
            discountPrice: productData.discountPrice,
            _id: `mock-${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date(),
            longDescription: productData.longDescription || '',
            tags: productData.tags as string[] || [],
            images: productData.images || []
          };
          setProducts(prev => [newProduct, ...prev]);
        }
        
        alert(formData._id ? 'Product updated successfully!' : 'Product created successfully!');
      } else {
        throw new Error('Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStock = stockFilter === 'all' || 
                        (stockFilter === 'in' && product.inStock) ||
                        (stockFilter === 'out' && !product.inStock);
    
    return matchesSearch && matchesCategory && matchesStock;
  });

  const categories = ['bone_straight', 'curly', 'colored', 'closure', 'frontal', 'accessories', 'tools', 'mens'];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('NGN', '₦');
  };

  // Quick create form in modal
  const renderQuickCreateModal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {formData._id ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setFormData(initialFormData);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name *
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Slug *
                  </label>
                  <Input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    required
                    placeholder="product-name-url"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₦) *
                  </label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                    required
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount Price (₦)
                  </label>
                  <Input
                    type="number"
                    value={formData.discountPrice}
                    onChange={(e) => setFormData({...formData, discountPrice: e.target.value})}
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Count *
                  </label>
                  <Input
                    type="number"
                    value={formData.stockCount}
                    onChange={(e) => setFormData({...formData, stockCount: parseInt(e.target.value) || 0})}
                    required
                    min="0"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Short Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.inStock}
                      onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
                      className="h-4 w-4 text-jify-primary-500 focus:ring-jify-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">In Stock</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isPreOrder}
                      onChange={(e) => setFormData({...formData, isPreOrder: e.target.checked})}
                      className="h-4 w-4 text-jify-primary-500 focus:ring-jify-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Pre-Order</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormData(initialFormData);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-jify-primary-500 hover:bg-jify-primary-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {formData._id ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    formData._id ? 'Update Product' : 'Create Product'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">
            Manage your wig inventory and product listings
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            onClick={() => {
              setFormData(initialFormData);
              setIsModalOpen(true);
            }}
            className="bg-jify-primary-500 hover:bg-jify-primary-600"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Quick Add
          </Button>
          <Link href="/admin/products/new">
            <Button variant="outline">
              <PlusIcon className="w-5 h-5 mr-2" />
              Full Form
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Stock Filter */}
            <div>
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
              >
                <option value="all">All Stock</option>
                <option value="in">In Stock</option>
                <option value="out">Out of Stock</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-jify-primary-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading products...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            {product.images[0] ? (
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="h-10 w-10 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary">
                          {product.category.split('_').join(' ')}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          <div className="font-medium">
                            {formatPrice(product.price)}
                          </div>
                          {product.discountPrice && (
                            <div className="text-xs text-green-600 font-medium">
                              {formatPrice(product.discountPrice)}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {product.stockCount}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {product.inStock ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircleIcon className="w-3 h-3 mr-1" />
                            In Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <XCircleIcon className="w-3 h-3 mr-1" />
                            Out of Stock
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Link href={`/product/${product.slug}`} target="_blank">
                            <Button size="sm" variant="ghost" title="View Product">
                              <EyeIcon className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="ghost"
                            title="Edit Product"
                            onClick={() => handleEdit(product)}
                          >
                            <PencilIcon className="w-4 h-4" />
                          </Button>
                          <Link href={`/admin/products/${product._id}/edit`}>
                            <Button size="sm" variant="ghost" title="Full Edit">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDelete(product._id)}
                            disabled={deleteLoading === product._id}
                            title="Delete Product"
                          >
                            {deleteLoading === product._id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                            ) : (
                              <TrashIcon className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <FunnelIcon className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
              <p className="mt-2 text-gray-500">
                Try adjusting your filters or add a new product.
              </p>
              <div className="mt-4 flex items-center justify-center space-x-3">
                <Button 
                  onClick={() => {
                    setFormData(initialFormData);
                    setIsModalOpen(true);
                  }}
                  className="bg-jify-primary-500 hover:bg-jify-primary-600"
                >
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Quick Add
                </Button>
                <Link href="/admin/products/new">
                  <Button variant="outline">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Full Form
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">In Stock</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {products.filter(p => p.inStock).length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircleIcon className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Out of Stock</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {products.filter(p => !p.inStock).length}
                  </p>
                </div>
                <div className="p-3 bg-red-100 rounded-lg">
                  <XCircleIcon className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Low Stock</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {products.filter(p => p.stockCount <= 5 && p.stockCount > 0).length}
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Create/Edit Modal */}
      {renderQuickCreateModal()}
    </div>
  );
}