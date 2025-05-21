import React, { useState, useEffect } from "react";
import { Car } from "../types";
import { getNextId } from "../utils/getNextId";

interface AddCarFormProps {
  onSubmit: (car: Car) => void;
}

const AddCarForm: React.FC<AddCarFormProps> = ({ onSubmit }) => {
  const [carData, setCarData] = useState<Car>({
    id: getNextId(),
    brand: "",
    model: "",
    type: "",
    description: "",
    price: 0,
    imageUrl: "",
    available: false,
  });

  useEffect(() => {
    setCarData({ ...carData, id: getNextId() });
  }, [carData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: name === "price" ? Number(value) : value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarData({ ...carData, available: e.target.checked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(carData);

    // Reset form with new ID
    setCarData({
      id: getNextId(),
      brand: "",
      model: "",
      type: "",
      description: "",
      price: 0,
      imageUrl: "",
      available: false,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Add a New Car</h2>

      <div className="mb-4">
        <label className="block mb-2">ID (Auto-Generated)</label>
        <input
          type="text"
          name="id"
          value={carData.id}
          readOnly
          className="border border-gray-300 p-2 w-full bg-gray-100"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Brand</label>
        <input
          type="text"
          name="brand"
          value={carData.brand}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Model</label>
        <input
          type="text"
          name="model"
          value={carData.model}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Type</label>
        <input
          type="text"
          name="type"
          value={carData.type}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Description</label>
        <textarea
          name="description"
          value={carData.description}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Price</label>
        <input
          type="number"
          name="price"
          value={carData.price}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Image URL</label>
        <input
          type="text"
          name="imageUrl"
          value={carData.imageUrl}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full"
        />
      </div>

      <div className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          name="available"
          checked={carData.available}
          onChange={handleCheckboxChange}
        />
        <label>Available</label>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Car
      </button>
    </form>
  );
};

export default AddCarForm;
