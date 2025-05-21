import React from 'react';
import { Car } from '../types';
import { useNavigate } from 'react-router-dom';
import { saveSelectedCar } from '../utils/localStorage';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const navigate = useNavigate();

  const handleRentClick = () => {
    saveSelectedCar(car);
    navigate('/reservation');
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:translate-y-[-4px] flex flex-col h-[350px]">
      
      {/* Image Section */}
      <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
        <img 
          src={car.imageUrl} 
          alt={`${car.brand} ${car.model}`} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{car.brand} {car.model}</h3>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            {car.type}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3 flex-1 line-clamp-2">
          {car.description}
        </p>

        <div className="mt-auto flex justify-between items-center">
          <div className="text-blue-600 font-bold">
            ${car.price}
            <span className="text-gray-500 font-normal text-sm">/day</span>
          </div>

          <button
            onClick={handleRentClick}
            disabled={!car.available}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              car.available
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {car.available ? 'Rent Now' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
