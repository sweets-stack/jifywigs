// client/src/components/shop/FilterBar.tsx
'use client';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface FilterOption {
  label: string;
  value: string;
}

const categories: FilterOption[] = [
  { label: 'Bone Straight', value: 'bone_straight' },
  { label: 'Curly', value: 'curly' },
  { label: 'Colored', value: 'colored' },
  { label: 'Frontal', value: 'frontal' },
  { label: 'Closure', value: 'closure' },
  { label: 'Braided', value: 'braided' },
];

const lengths: FilterOption[] = [
  { label: 'Short (8"-12")', value: 'short' },
  { label: 'Medium (14"-18")', value: 'medium' },
  { label: 'Long (20"-26")', value: 'long' },
  { label: 'Extra Long (28"+)', value: 'extra_long' },
];

const laceTypes: FilterOption[] = [
  { label: 'Frontal', value: 'frontal' },
  { label: 'Closure', value: 'closure' },
  { label: 'Glueless', value: 'glueless' },
  { label: 'Full Lace', value: 'full_lace' },
];

export const FilterBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState({
    category: [] as string[],
    length: [] as string[],
    laceType: [] as string[],
    inStock: true,
    minPrice: 0,
    maxPrice: 100000,
  });

  const toggle = (type: keyof typeof selected, value: string) => {
    if (type === 'inStock') {
      setSelected({ ...selected, inStock: !selected.inStock });
      return;
    }
    const current = selected[type] as string[];
    const newValues = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    setSelected({ ...selected, [type]: newValues });
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-jify-primary font-medium"
      >
        <FunnelIcon className="w-5 h-5 mr-1" />
        Filter & Sort
      </button>

      {isOpen && (
        <div className="mt-4 space-y-6">
          {/* Category */}
          <div>
            <h4 className="font-medium mb-2">Wig Type</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => toggle('category', opt.value)}
                  className={`px-3 py-1.5 text-sm rounded-full border ${
                    selected.category.includes(opt.value)
                      ? 'bg-jify-primary text-white border-jify-primary'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Length */}
          <div>
            <h4 className="font-medium mb-2">Length</h4>
            <div className="grid grid-cols-2 gap-2">
              {lengths.map(opt => (
                <label key={opt.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selected.length.includes(opt.value)}
                    onChange={() => toggle('length', opt.value)}
                    className="rounded text-jify-primary focus:ring-jify-primary"
                  />
                  <span className="ml-2 text-sm">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Lace Type */}
          <div>
            <h4 className="font-medium mb-2">Lace Type</h4>
            <div className="flex flex-wrap gap-2">
              {laceTypes.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => toggle('laceType', opt.value)}
                  className={`px-3 py-1.5 text-sm rounded-full border ${
                    selected.laceType.includes(opt.value)
                      ? 'bg-jify-primary text-white border-jify-primary'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* In Stock */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="inStock"
              checked={selected.inStock}
              onChange={() => toggle('inStock', '')}
              className="rounded text-jify-primary focus:ring-jify-primary"
            />
            <label htmlFor="inStock" className="ml-2 text-sm">
              In Stock Only
            </label>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-medium mb-2">Price Range</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>₦{selected.minPrice.toLocaleString()}</span>
                <span>₦{selected.maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={selected.maxPrice}
                onChange={e => setSelected({ ...selected, maxPrice: Number(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-jify-primary"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setSelected({
                category: [],
                length: [],
                laceType: [],
                inStock: true,
                minPrice: 0,
                maxPrice: 100000,
              })}
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Reset
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 bg-jify-primary text-white px-3 py-2 text-sm rounded-lg hover:bg-jify-primary/90"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};