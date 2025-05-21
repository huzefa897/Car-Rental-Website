import { Car, FormData } from '../types';

// Save selected car to localStorage
export const saveSelectedCar = (car: Car): void => {
  localStorage.setItem('selectedCar', JSON.stringify(car));
};

// Get selected car from localStorage
export const getSelectedCar = (): Car | null => {
  const savedCar = localStorage.getItem('selectedCar');
  return savedCar ? JSON.parse(savedCar) : null;
};

// Save form data to localStorage
export const saveFormData = (formData: FormData): void => {
  localStorage.setItem('formData', JSON.stringify(formData));
};

// Get form data from localStorage
export const getFormData = (): FormData | null => {
  const savedData = localStorage.getItem('formData');
  return savedData ? JSON.parse(savedData) : null;
};

// Clear form data from localStorage
export const clearFormData = (): void => {
  localStorage.removeItem('formData');
};

// Update car availability with expiry time
export const updateCarAvailability = (carId: string, available: boolean, expiryTime?: number): void => {
  const carsData = localStorage.getItem('carsData');
  if (carsData) {
    const cars: Car[] = JSON.parse(carsData);

    const updatedCars = cars.map((car) =>
      car.id === carId ? { ...car, available } : car
    );

    localStorage.setItem('carsData', JSON.stringify(updatedCars));

    // If an expiry time is provided, set a timer to revert availability
    if (expiryTime && !available) {
      const expiryData = {
        carId,
        expiryTime,
      };

      const expiryList = getExpiryList();
      expiryList.push(expiryData);
      localStorage.setItem('expiryList', JSON.stringify(expiryList));

      setTimeout(() => {
        revertCarAvailability(carId);
      }, expiryTime - Date.now());
    }
  }
};

// Get expiry list from localStorage
export const getExpiryList = (): { carId: string; expiryTime: number }[] => {
  const expiryList = localStorage.getItem('expiryList');
  return expiryList ? JSON.parse(expiryList) : [];
};

// Revert car availability to true
export const revertCarAvailability = (carId: string): void => {
  const carsData = localStorage.getItem('carsData');
  if (carsData) {
    const cars: Car[] = JSON.parse(carsData);
    const updatedCars = cars.map((car) =>
      car.id === carId ? { ...car, available: true } : car
    );
    localStorage.setItem('carsData', JSON.stringify(updatedCars));

    // Remove from expiry list
    const expiryList = getExpiryList().filter((item) => item.carId !== carId);
    localStorage.setItem('expiryList', JSON.stringify(expiryList));
  }
};
