export interface Car {
  id: string;
  brand: string;
  model: string;
  type: string;
  description: string;
  price: number;
  imageUrl: string;
  available: boolean;
}

export type CarType = 'Sedan' | 'SUV' | 'Wagon' | 'Hatchback' | 'Convertible';

export interface RentalOrder {
  carId: string;
  customerName: string;
  phoneNumber: string;
  email: string;
  driverLicense: string;
  startDate: string;
  rentalPeriod: number;
  totalPrice: number;
}

export interface FormData {
  customerName: string;
  phoneNumber: string;
  email: string;
  driverLicense: string;
  startDate: string;
  rentalPeriod: number;
}