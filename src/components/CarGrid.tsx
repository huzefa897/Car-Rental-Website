import React from 'react';
import { Car } from '../types';
import CarCard from './CarCard';

interface CarGridProps {
  cars: Car[];
  isLoading?: boolean;
}

const CarGrid: React.FC<CarGridProps> = ({ cars, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium text-gray-600">No cars found matching your criteria</h3>
        <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cars.map((car) => (
        <div key={car.id} className="h-full">
          <CarCard car={car} />
        </div>
      ))}
    </div>
  );
};

export default CarGrid;
