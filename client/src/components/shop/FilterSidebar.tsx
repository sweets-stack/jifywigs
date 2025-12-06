'use client';

import { 
  TagIcon,
  CheckCircleIcon,
  TruckIcon,
  ClockIcon,
  RefreshCw,
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
  Star
} from 'lucide-react';

interface FilterSidebarProps {
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

export function FilterSidebar({
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
}: FilterSidebarProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <button
          onClick={resetFilters}
          className="text-sm font-medium text-jify-primary-600 hover:text-jify-primary-500 flex items-center gap-1"
        >
          <RefreshCw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* Quick Filters */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Filters</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleCheckboxChange('sale')}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm ${filters.sale ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            <BadgePercent className="w-4 h-4" />
            On Sale
          </button>
          <button
            onClick={() => handleCheckboxChange('bestSeller')}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm ${filters.bestSeller ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            <Flame className="w-4 h-4" />
            Best Sellers
          </button>
          <button
            onClick={() => handleCheckboxChange('preOrder')}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm ${filters.preOrder ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            <Clock className="w-4 h-4" />
            Pre-Order
          </button>
          <button
            onClick={() => handleCheckboxChange('expressDelivery')}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm ${filters.expressDelivery ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            <Truck className="w-4 h-4" />
            Fast Delivery
          </button>
        </div>
      </div>

      {/* Category */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleFilterChange('category', filters.category === category.id ? '' : category.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${filters.category === category.id ? 'bg-jify-primary-50 text-jify-primary-700 border border-jify-primary-200' : 'hover:bg-gray-50'}`}
            >
              <span className="text-jify-primary-500">{category.icon}</span>
              <span className="text-sm">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map(range => (
            <div key={range.id} className="flex items-center">
              <input
                id={`price-${range.id}`}
                name="priceRange"
                type="radio"
                checked={filters.priceRange === range.id}
                onChange={() => handleFilterChange('priceRange', range.id)}
                className="h-4 w-4 border-gray-300 text-jify-primary-500 focus:ring-jify-primary-500"
              />
              <label htmlFor={`price-${range.id}`} className="ml-3 text-sm text-gray-700 flex justify-between w-full">
                <span>{range.name}</span>
                <span className="text-gray-500">₦{range.min.toLocaleString()} - ₦{range.max.toLocaleString()}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Lace Type */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Lace Type</h3>
        <div className="space-y-2">
          {laceTypes.map(lace => (
            <button
              key={lace.id}
              onClick={() => handleFilterChange('lace', filters.lace === lace.id ? '' : lace.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left ${filters.lace === lace.id ? 'bg-jify-primary-50 text-jify-primary-700 border border-jify-primary-200' : 'hover:bg-gray-50'}`}
            >
              <span className="text-sm font-medium">{lace.name}</span>
              <span className="text-xs text-gray-500">{lace.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Length */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Length</h3>
        <div className="space-y-2">
          {lengths.map(length => (
            <div key={length.id} className="flex items-center">
              <input
                id={`length-${length.id}`}
                name="length"
                type="radio"
                checked={filters.length === length.id}
                onChange={() => handleFilterChange('length', length.id)}
                className="h-4 w-4 border-gray-300 text-jify-primary-500 focus:ring-jify-primary-500"
              />
              <label htmlFor={`length-${length.id}`} className="ml-3 text-sm text-gray-700 flex justify-between w-full">
                <span>{length.name}</span>
                <span className="text-gray-500">{length.range}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Density */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Density</h3>
        <div className="space-y-2">
          {densities.map(density => (
            <div key={density.id} className="flex items-center">
              <input
                id={`density-${density.id}`}
                name="density"
                type="radio"
                checked={filters.density === density.id}
                onChange={() => handleFilterChange('density', density.id)}
                className="h-4 w-4 border-gray-300 text-jify-primary-500 focus:ring-jify-primary-500"
              />
              <label htmlFor={`density-${density.id}`} className="ml-3 text-sm text-gray-700 flex justify-between w-full">
                <span>{density.name}</span>
                <span className="text-gray-500">{density.description}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Color */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
        <div className="grid grid-cols-4 gap-2">
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
      </div>

      {/* Availability */}
      <div className="space-y-3">
        <div className="flex items-center">
          <input
            id="inStock"
            name="inStock"
            type="checkbox"
            checked={filters.inStock}
            onChange={() => handleCheckboxChange('inStock')}
            className="h-4 w-4 border-gray-300 text-jify-primary-500 rounded focus:ring-jify-primary-500"
          />
          <label htmlFor="inStock" className="ml-3 text-sm text-gray-700 flex items-center gap-2">
            <Package className="w-4 h-4 text-green-500" />
            In Stock Only
          </label>
        </div>
      </div>
    </div>
  );
}