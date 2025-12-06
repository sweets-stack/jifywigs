// client/app/admin/products/new/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { ProductType, WigLaceType, WigLength } from '@jifywigs/shared/enums';
import {
  ArrowLeftIcon,
  CloudArrowUpIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useDropzone } from 'react-dropzone';
import Link from 'next/link';

const categories = [
  'bone_straight', 'curly', 'colored', 'closure', 'frontal', 'accessories', 'tools', 'mens'
];

const wigColors = [
  'Natural Black', 'Jet Black', 'Dark Brown', 'Medium Brown', 'Light Brown',
  'Burgundy', 'Honey Blonde', 'Platinum Blonde', 'Ombre', 'Balayage'
];

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    longDescription: '',
    price: 0,
    discountPrice: 0,
    type: ProductType.WIG,
    category: 'bone_straight',
    color: 'Natural Black',
    length: WigLength.LONG,
    density: 150,
    laceType: WigLaceType.FRONTAL,
    inStock: true,
    stockCount: 10,
    isPreOrder: false,
    tags: '',
  });

  // Auto-generate slug from name
  useEffect(() => {
    if (formData.name) {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.name]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (acceptedFiles) => {
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
              setImages(prev => [...prev, URL.createObjectURL(file)]);
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
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (images.length === 0) {
      alert('Please upload at least one product image');
      return;
    }

    setLoading(true);
    try {
      const productData = {
        ...formData,
        images,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        discountPrice: formData.discountPrice > 0 ? formData.discountPrice : undefined
      };

      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert('Product created successfully!');
        router.push('/admin/products');
      } else {
        throw new Error('Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/products" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-2">
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Back to Products
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-600 mt-1">
            Create a new wig or accessory listing
          </p>
        </div>
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
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Premium Bone Straight Glueless Wig"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug *
                </label>
                <Input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                  placeholder="premium-bone-straight-glueless"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
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
                  value={formData.type}
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
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
                placeholder="Brief product description..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Long Description
              </label>
              <textarea
                name="longDescription"
                value={formData.longDescription}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary-500 focus:border-jify-primary-500"
                placeholder="Detailed product specifications, care instructions, etc..."
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
                  value={formData.price}
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
                  value={formData.discountPrice}
                  onChange={handleInputChange}
                  min="0"
                  step="100"
                  placeholder="Leave empty for no discount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Count *
                </label>
                <Input
                  type="number"
                  name="stockCount"
                  value={formData.stockCount}
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
                  checked={formData.inStock}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-jify-primary-500 focus:ring-jify-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">In Stock</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isPreOrder"
                  checked={formData.isPreOrder}
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
                  value={formData.color}
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
                  value={formData.length}
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
                  value={formData.density}
                  onChange={handleInputChange}
                  required
                  min="100"
                  step="50"
                  placeholder="e.g., 150, 180"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lace Type *
                </label>
                <select
                  name="laceType"
                  value={formData.laceType}
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
            <h2 className="text-lg font-semibold">Product Images *</h2>
            <p className="text-sm text-gray-600">Upload at least one image</p>
          </CardHeader>
          <CardContent className="space-y-6">
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
            {images.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Uploaded Images ({images.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {images.map((url, index) => (
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
          <CardContent>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma separated)
              </label>
              <Input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="e.g., Best Seller, Glueless, HD Lace, New Arrival"
              />
              <p className="text-xs text-gray-500 mt-2">
                Add tags to help customers find your product
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end space-x-4">
          <Link href="/admin/products">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            className="bg-jify-primary-500 hover:bg-jify-primary-600"
            disabled={loading || images.length === 0}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating Product...
              </>
            ) : (
              'Create Product'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}