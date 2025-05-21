import React from 'react';
import { Filter } from 'lucide-react';
import { getAllBrands, getAllTypes } from '../data/cars';

interface FiltersProps {
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
  selectedBrand: string | null;
  setSelectedBrand: (brand: string | null) => void;
}

const Filters: React.FC<FiltersProps> = ({
  selectedType,
  setSelectedType,
  selectedBrand,
  setSelectedBrand
}) => {
  const carTypes = getAllTypes();
  const carBrands = getAllBrands();

  return (
    <div className="w-full bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Filter size={18} className="text-blue-600" />
        <h3 className="font-medium">Filters</h3>
      </div>
      
      <div className="space-y-4">
        {/* Type filter */}
        <div>
          <h4 className="text-sm font-medium mb-2">Car Type</h4>
          <div className="flex flex-wrap gap-2">
            {carTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(selectedType === type ? null : type)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedType === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-300 hover:border-blue-500'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Brand filter */}
        <div>
          <h4 className="text-sm font-medium mb-2">Car Brand</h4>
          <div className="flex flex-wrap gap-2">
            {carBrands.map(brand => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedBrand === brand
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-300 hover:border-blue-500'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;