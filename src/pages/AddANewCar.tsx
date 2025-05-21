import React from 'react';
import Header from "../components/Header";
import AddCarForm from "../components/AddCarForm";
import { Car } from "../types";
import { cars } from "../data/cars";

const AddANewCar: React.FC = () => {
  const handleAddCar = (newCar: Car) => {
    console.log("New Car Added:", newCar);
    cars.push(newCar);
    console.log("Updated Cars List:", cars);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <AddCarForm onSubmit={handleAddCar} />
        </div>
      </main>
    </div>
  );
};

export default AddANewCar;
