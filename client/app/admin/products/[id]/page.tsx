// client/app/admin/products/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { ProductType, WigLaceType, WigLength } from '@jifywigs/shared/enums';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  CloudArrowUpIcon,
  XMarkIcon,
  CheckCircleIcon,
  XCircleIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { useDropzone } from 'react-dropzone';

const categories = [
  'bone_straight', 'curly', 'colored', 'closure', 'frontal', 'accessories', 'tools', 'mens'
];

const wigColors = [
  'Natural Black', 'Jet Black', 'Dark Brown', 'Medium Brown', 'Light Brown',
  'Burgundy', 'Honey Blonde', 'Platinum Blonde', 'Ombre', 'Balayage'
];

interface Product {
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
  tags?: string[] | string; // Fixed: Can be string or string[]
  createdAt: string;
  updatedAt: string;
}

export default function ProductEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/products/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else {
        throw new Error('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Product not found');
      router.push('/admin/products');
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (acceptedFiles) => {
      if (!product) return;
      
      if (acceptedFiles.length === 0) return;

      for (const file of acceptedFiles) {
        // Simulate upload - replace with actual Cloudinary upload
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
        
        // Simulate upload progress
        for (let i = 0; i <= 100; i += 10) {
          setTimeout(() => {
            setUploadProgress(prev => ({ ...prev, [file.name]: i }));
            if (i === 100) {
              // Add placeholder image URL
              const newImageUrl = URL.createObjectURL(file);
              setProduct(prev => prev ? {
                ...prev,
                images: [...prev.images, newImageUrl]
              } : null);
              
              // Remove from progress tracking
              setUploadProgress(prev => {
                const newProgress = { ...prev };
                delete newProgress[file.name];
                return newProgress;
              });
            }
          }, i * 10);
        }
      }
    },
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxSize: 10 * 1024 * 1024,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!product) return;
    
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setProduct(prev => prev ? { ...prev, [name]: checked } : null);
    } else if (type === 'number') {
      setProduct(prev => prev ? { ...prev, [name]: parseFloat(value) || 0 } : null);
    } else {
      setProduct(prev => prev ? { ...prev, [name]: value } : null);
    }
  };

  const removeImage = (index: number) => {
    if (!product) return;
    
    setProduct({
      ...product,
      images: product.images.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    if (product.images.length === 0) {
      alert('Please upload at least one product image');
      return;
    }

    setSaving(true);
    try {
      // Convert tags string to array if needed
      let tagsArray: string[] = [];
      if (product.tags) {
        if (typeof product.tags === 'string') {
          tagsArray = product.tags.split(',').map(tag => tag.trim()).filter(Boolean);
        } else if (Array.isArray(product.tags)) {
          tagsArray = product.tags;
        }
      }

      const productData = {
        ...product,
        tags: tagsArray,
        discountPrice: product.discountPrice && product.discountPrice > 0 ? product.discountPrice : undefined
      };

      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert('Product updated successfully!');
        router.push('/admin/products');
      } else {
        throw new Error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }

    setDeleting(true);
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Product deleted successfully');
        router.push('/admin/products');
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  // Helper function to normalize tags for display
  const getTagsForDisplay = () => {
    if (!product?.tags) return [];
    
    if (Array.isArray(product.tags)) {
      return product.tags;
    }
    
    if (typeof product.tags === 'string') {
      return product.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    }
    
    return [];
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-jify-primary-500"></div>
        <p className="mt-4 text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Product not found</p>
        <Link href="/admin/products" className="mt-4 inline-block">
          <Button variant="outline">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  const displayTags = getTagsForDisplay();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/products" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-2">
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Back to Products
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
          <p className="text-gray-600 mt-1">
            Update product details and specifications
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
            ) : (
              <TrashIcon className="w-4 h-4 mr-2" />
            )}
            Delete Product
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Price</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₦{product.price.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <span className="text-blue-600 font-bold">₦</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Stock</p>
                <p className="text-2xl font-bold text-gray-900">{product.stockCount}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                {product.inStock ? (
                  <CheckCircleIcon className="w-6 h-6 text-green-600" />
                ) : (
                  <XCircleIcon className="w-6 h-6 text-red-600" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="text-2xl font-bold text-gray-900">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
              <Badge variant={product.inStock ? 'success' : 'danger'} className="text-sm">
                {product.inStock ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Created</p>
                <p className="text-lg font-medium text-gray-900">
                  {new Date(product.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <span className="text-gray-600">📅</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Basic Information</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <Input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug *
                </label>
                <Input
                  type="text"
                  name="slug"
                  value={product.slug}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Type *
                </label>
                <select
                  name="type"
                  value={product.type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
                >
                  <option value={ProductType.WIG}>Wig</option>
                  <option value={ProductType.ACCESSORY}>Accessory</option>
                  <option value={ProductType.HAIR_TOOL}>Hair Tool</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description *
              </label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Long Description
              </label>
              <textarea
                name="longDescription"
                value={product.longDescription || ''}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Inventory */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Pricing & Inventory</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₦) *
                </label>
                <Input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Price (₦)
                </label>
                <Input
                  type="number"
                  name="discountPrice"
                  value={product.discountPrice || ''}
                  onChange={handleInputChange}
                  min="0"
                  step="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Count *
                </label>
                <Input
                  type="number"
                  name="stockCount"
                  value={product.stockCount}
                  onChange={handleInputChange}
                  required
                  min="0"
                />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={product.inStock}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-jify-primary-500 focus:ring-jify-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">In Stock</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isPreOrder"
                  checked={product.isPreOrder || false}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-jify-primary-500 focus:ring-jify-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Pre-Order Available</span>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Wig Specifications */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Wig Specifications</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color *
                </label>
                <select
                  name="color"
                  value={product.color}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
                >
                  {wigColors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Length *
                </label>
                <select
                  name="length"
                  value={product.length}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
                >
                  {Object.values(WigLength).map(length => (
                    <option key={length} value={length}>
                      {length.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Density *
                </label>
                <Input
                  type="number"
                  name="density"
                  value={product.density}
                  onChange={handleInputChange}
                  required
                  min="100"
                  step="50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lace Type *
                </label>
                <select
                  name="laceType"
                  value={product.laceType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
                >
                  {Object.values(WigLaceType).map(lace => (
                    <option key={lace} value={lace}>
                      {lace.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Product Images</h2>
            <p className="text-sm text-gray-600">
              {product.images.length} images uploaded
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Upload Area */}
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-jify-primary-500 bg-jify-primary-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input {...getInputProps()} />
              <CloudArrowUpIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">
                {isDragActive ? 'Drop the files here' : 'Drag & drop images here, or click to select'}
              </p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB each</p>
            </div>

            {/* Upload Progress */}
            {Object.keys(uploadProgress).length > 0 && (
              <div className="space-y-2">
                {Object.entries(uploadProgress).map(([filename, progress]) => (
                  <div key={filename} className="flex items-center">
                    <span className="text-xs text-gray-500 mr-2 truncate flex-1">{filename}</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-jify-primary-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 ml-2 w-8">{progress}%</span>
                  </div>
                ))}
              </div>
            )}

            {/* Uploaded Images */}
            {product.images.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Product Images ({product.images.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {product.images.map((url, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border group">
                      <img
                        src={url}
                        alt={`Product image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
                        {index === 0 ? 'Main Image' : `Image ${index + 1}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tags */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Tags & Metadata</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma separated)
              </label>
              <Input
                type="text"
                name="tags"
                value={displayTags.join(', ')}
                onChange={handleInputChange}
                placeholder="e.g., Best Seller, Glueless, HD Lace, New Arrival"
              />
              <p className="mt-1 text-xs text-gray-500">
                Separate tags with commas. Current tags:
              </p>
            </div>
            
            {/* Display current tags */}
            {displayTags.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Current Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {displayTags.map((tag: string, index: number) => (
                    <span 
                      key={index} 
                      className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
          <Link href="/admin/products">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            className="bg-jify-primary-500 hover:bg-jify-primary-600"
            disabled={saving || product.images.length === 0}
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Updating Product...
              </>
            ) : (
              'Update Product'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}