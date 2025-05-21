import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBox from '../components/SearchBox';
import Filters from '../components/Filters';
import CarGrid from '../components/CarGrid';
import { searchCars } from '../data/cars';
import { Car } from '../types';

const HomePage: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load cars on mount and when filters/search change
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const results = searchCars(searchValue, selectedType, selectedBrand);
      setCars(results);
      setIsLoading(false);
    }, 300);
  }, [searchValue, selectedType, selectedBrand]);

  const handleSearch = (keyword: string) => {
    setSearchValue(keyword);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-8xl 
text-gray 
tracking-tighter 
text-balance font-bold mb-2">Find Your Perfect Ride</h1>
            <p className="text-gray-600">Explore our collection of premium vehicles for your daily needs</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-64 flex-shrink-0">
              <Filters
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
              />
            </div>
            
            <div className="flex-1">
              <div className="mb-6">
                <SearchBox 
                  onSearch={handleSearch} 
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              </div>
              
              <CarGrid cars={cars} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;