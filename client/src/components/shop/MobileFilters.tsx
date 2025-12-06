'use client';

import { X, Filter, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface MobileFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: any;
  handleFilterChange: (key: string, value: any) => void;
  handleCheckboxChange: (key: string) => void;
  resetFilters: () => void;
  categories: any[];
  laceTypes: any[];
  densities: any[];
  lengths: any[];
  colors: any[];
  wigTypes: any[];
  priceRanges: any[];
}

export function MobileFilters({
  isOpen,
  onClose,
  filters,
  handleFilterChange,
  handleCheckboxChange,
  resetFilters,
  categories,
  laceTypes,
  densities,
  lengths,
  colors,
  wigTypes,
  priceRanges
}: MobileFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['quick', 'category']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={resetFilters}
              className="text-sm font-medium text-jify-primary-600 hover:text-jify-primary-500 flex items-center gap-1 px-3 py-1"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          {/* Quick Filters */}
          <div className="border-b pb-4">
            <button
              onClick={() => toggleSection('quick')}
              className="flex items-center justify-between w-full text-left py-2"
            >
              <h3 className="text-sm font-medium text-gray-900">Quick Filters</h3>
              {expandedSections.includes('quick') ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {expandedSections.includes('quick') && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleCheckboxChange('sale')}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm ${filters.sale ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-gray-100 text-gray-700'}`}
                >
                  On Sale
                </button>
                <button
                  onClick={() => handleCheckboxChange('bestSeller')}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm ${filters.bestSeller ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' : 'bg-gray-100 text-gray-700'}`}
                >
                  Best Sellers
                </button>
                <button
                  onClick={() => handleCheckboxChange('preOrder')}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm ${filters.preOrder ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-gray-100 text-gray-700'}`}
                >
                  Pre-Order
                </button>
                <button
                  onClick={() => handleCheckboxChange('expressDelivery')}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm ${filters.expressDelivery ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-700'}`}
                >
                  Fast Delivery
                </button>
              </div>
            )}
          </div>

          {/* Category */}
          <div className="border-b pb-4">
            <button
              onClick={() => toggleSection('category')}
              className="flex items-center justify-between w-full text-left py-2"
            >
              <h3 className="text-sm font-medium text-gray-900">Category</h3>
              {expandedSections.includes('category') ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {expandedSections.includes('category') && (
              <div className="mt-3 space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => handleFilterChange('category', filters.category === category.id ? '' : category.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${filters.category === category.id ? 'bg-jify-primary-50 text-jify-primary-700 border border-jify-primary-200' : 'hover:bg-gray-50'}`}
                  >
                    <span className="text-jify-primary-500">
                      {category.icon}
                    </span>
                    <span className="text-sm">{category.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div className="border-b pb-4">
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full text-left py-2"
            >
              <h3 className="text-sm font-medium text-gray-900">Price Range</h3>
              {expandedSections.includes('price') ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {expandedSections.includes('price') && (
              <div className="mt-3 space-y-2">
                {priceRanges.map(range => (
                  <div key={range.id} className="flex items-center">
                    <input
                      id={`mobile-price-${range.id}`}
                      name="priceRange"
                      type="radio"
                      checked={filters.priceRange === range.id}
                      onChange={() => handleFilterChange('priceRange', range.id)}
                      className="h-4 w-4 border-gray-300 text-jify-primary-500"
                    />
                    <label htmlFor={`mobile-price-${range.id}`} className="ml-3 text-sm text-gray-700 flex justify-between w-full">
                      <span>{range.name}</span>
                      <span className="text-gray-500">₦{range.min.toLocaleString()} - ₦{range.max.toLocaleString()}</span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Lace Type */}
          <div className="border-b pb-4">
            <button
              onClick={() => toggleSection('lace')}
              className="flex items-center justify-between w-full text-left py-2"
            >
              <h3 className="text-sm font-medium text-gray-900">Lace Type</h3>
              {expandedSections.includes('lace') ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {expandedSections.includes('lace') && (
              <div className="mt-3 space-y-2">
                {laceTypes.map(lace => (
                  <div key={lace.id} className="flex items-center">
                    <input
                      id={`mobile-lace-${lace.id}`}
                      name="lace"
                      type="radio"
                      checked={filters.lace === lace.id}
                      onChange={() => handleFilterChange('lace', lace.id)}
                      className="h-4 w-4 border-gray-300 text-jify-primary-500"
                    />
                    <label htmlFor={`mobile-lace-${lace.id}`} className="ml-3 text-sm text-gray-700 flex justify-between w-full">
                      <span>{lace.name}</span>
                      <span className="text-xs text-gray-500">{lace.description}</span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Length */}
          <div className="border-b pb-4">
            <button
              onClick={() => toggleSection('length')}
              className="flex items-center justify-between w-full text-left py-2"
            >
              <h3 className="text-sm font-medium text-gray-900">Length</h3>
              {expandedSections.includes('length') ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {expandedSections.includes('length') && (
              <div className="mt-3 space-y-2">
                {lengths.map(length => (
                  <div key={length.id} className="flex items-center">
                    <input
                      id={`mobile-length-${length.id}`}
                      name="length"
                      type="radio"
                      checked={filters.length === length.id}
                      onChange={() => handleFilterChange('length', length.id)}
                      className="h-4 w-4 border-gray-300 text-jify-primary-500"
                    />
                    <label htmlFor={`mobile-length-${length.id}`} className="ml-3 text-sm text-gray-700 flex justify-between w-full">
                      <span>{length.name}</span>
                      <span className="text-gray-500">{length.range}</span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Density */}
          <div className="border-b pb-4">
            <button
              onClick={() => toggleSection('density')}
              className="flex items-center justify-between w-full text-left py-2"
            >
              <h3 className="text-sm font-medium text-gray-900">Density</h3>
              {expandedSections.includes('density') ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {expandedSections.includes('density') && (
              <div className="mt-3 space-y-2">
                {densities.map(density => (
                  <div key={density.id} className="flex items-center">
                    <input
                      id={`mobile-density-${density.id}`}
                      name="density"
                      type="radio"
                      checked={filters.density === density.id}
                      onChange={() => handleFilterChange('density', density.id)}
                      className="h-4 w-4 border-gray-300 text-jify-primary-500"
                    />
                    <label htmlFor={`mobile-density-${density.id}`} className="ml-3 text-sm text-gray-700 flex justify-between w-full">
                      <span>{density.name}</span>
                      <span className="text-gray-500">{density.description}</span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Color */}
          <div className="border-b pb-4">
            <button
              onClick={() => toggleSection('color')}
              className="flex items-center justify-between w-full text-left py-2"
            >
              <h3 className="text-sm font-medium text-gray-900">Color</h3>
              {expandedSections.includes('color') ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {expandedSections.includes('color') && (
              <div className="mt-3 grid grid-cols-4 gap-2">
                {colors.map(color => (
                  <button
                    key={color.id}
                    onClick={() => handleFilterChange('color', filters.color === color.id ? '' : color.id)}
                    className={`h-8 rounded-lg border ${filters.color === color.id ? 'ring-2 ring-jify-primary-500 ring-offset-1' : ''}`}
                    style={{ 
                      background: color.hex.includes('gradient') ? color.hex : color.hex,
                      borderColor: filters.color === color.id ? '#f502a0' : '#e5e7eb'
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Availability */}
          <div>
            <div className="flex items-center py-2">
              <input
                id="mobile-inStock"
                name="inStock"
                type="checkbox"
                checked={filters.inStock}
                onChange={() => handleCheckboxChange('inStock')}
                className="h-4 w-4 border-gray-300 text-jify-primary-500 rounded"
              />
              <label htmlFor="mobile-inStock" className="ml-3 text-sm text-gray-700">
                In Stock Only
              </label>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t p-4">
          <button
            onClick={onClose}
            className="w-full bg-jify-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-jify-primary/90 transition-colors"
          >
            Apply Filters ({Object.entries(filters).filter(([k, v]) => {
              if (k === 'inStock' && v === true) return false;
              if (k === 'priceMin' && v === 0) return false;
              if (k === 'priceMax' && v === 200000) return false;
              if (typeof v === 'boolean') return v;
              if (typeof v === 'string') return v !== '';
              return false;
            }).length})
          </button>
        </div>
      </div>
    </div>
  );
}