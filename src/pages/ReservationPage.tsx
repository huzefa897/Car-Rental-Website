import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ReservationForm from '../components/ReservationForm';
import { Car } from 'lucide-react';
import { getSelectedCar, getExpiryList } from '../utils/localStorage';
import { Car as CarType } from '../types';

const ReservationPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState(false);
  const [remainingTime, setRemainingTime] = useState<string | null>(null);

  // Fetch selected car on mount
  useEffect(() => {
    const car = getSelectedCar();
    setSelectedCar(car);
  }, []);

  // Calculate remaining time
  useEffect(() => {
    if (!selectedCar) return;

    const expiryList = getExpiryList();
    const carExpiry = expiryList.find(item => item.carId === selectedCar.id);

    if (carExpiry) {
      const interval = setInterval(() => {
        const timeLeft = carExpiry.expiryTime - Date.now();
        
        if (timeLeft <= 0) {
          setRemainingTime("Available");
          clearInterval(interval);
        } else {
          const minutes = Math.floor(timeLeft / 60000);
          const seconds = Math.floor((timeLeft % 60000) / 1000);
          setRemainingTime(`${minutes}m ${seconds}s`);
        }
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setRemainingTime(null); // No expiry, car is available
    }
  }, [selectedCar]);

  const handleGoBack = () => {
    navigate('/');
  };

  const handleSubmitSuccess = () => {
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
      navigate('/');
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Car Reservation</h1>
            <p className="text-gray-600">Complete your booking details below</p>
          </div>

          {orderSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-6">
              <h3 className="font-semibold">Reservation Successful!</h3>
              <p>Your car has been booked successfully. You will be redirected to the homepage.</p>
            </div>
          )}

          {orderError && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
              <h3 className="font-semibold">Reservation Failed</h3>
              <p>This car is no longer available. Please select another vehicle.</p>
            </div>
          )}

          {/* No Car Selected */}
          {!selectedCar ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <Car size={48} className="mx-auto text-blue-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Car Selected</h2>
              <p className="text-gray-600 mb-6">Please select a car from our collection first.</p>
              <button
                onClick={handleGoBack}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Cars
              </button>
            </div>
          ) : !selectedCar.available ? (
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img 
                    src={selectedCar.imageUrl} 
                    alt={`${selectedCar.brand} ${selectedCar.model}`}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-xl font-semibold mb-1">{selectedCar.brand} {selectedCar.model}</h2>
                  <p className="text-gray-600 mb-4">{selectedCar.description}</p>
                  <div className="flex items-center mb-2">
                    <span className="font-medium mr-2">Type:</span>
                    <span>{selectedCar.type}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Price:</span>
                    <span>${selectedCar.price}/day</span>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold">Car Unavailable</h3>
                    <p>This car is no longer available. Please select another vehicle.</p>
                    {remainingTime && (
                      <div className="mt-2 text-gray-600">
                        Available in: {remainingTime}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleGoBack}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Browse Other Cars
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <img 
                    src={selectedCar.imageUrl} 
                    alt={`${selectedCar.brand} ${selectedCar.model}`}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-xl font-semibold mb-1">{selectedCar.brand} {selectedCar.model}</h2>
                  <p className="text-gray-600 mb-4">{selectedCar.description}</p>
                  <div className="flex items-center mb-2">
                    <span className="font-medium mr-2">Type:</span>
                    <span>{selectedCar.type}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Price:</span>
                    <span>${selectedCar.price}/day</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Reservation Details</h3>
                <ReservationForm 
                  selectedCar={selectedCar}
                  onSubmitSuccess={handleSubmitSuccess}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      <div className="fixed bottom-4 right-4 bg-gray-100 p-4 rounded-lg shadow-lg">
        {remainingTime ? (
          <div>Available in: {remainingTime}</div>
        ) : (
          <div>Car is available</div>
        )}
      </div>
    </div>
  );
};

export default ReservationPage;
