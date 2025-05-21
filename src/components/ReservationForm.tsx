import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, FormData } from '../types';
import { saveFormData, clearFormData, getFormData, updateCarAvailability } from '../utils/localStorage';

interface ReservationFormProps {
  selectedCar: Car;
  onSubmitSuccess: () => void;
}

interface FormErrors {
  customerName?: string;
  phoneNumber?: string;
  email?: string;
  driverLicense?: string;
  startDate?: string;
  rentalPeriod?: string;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ 
  selectedCar,
  onSubmitSuccess
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    phoneNumber: '',
    email: '',
    driverLicense: '',
    startDate: '',
    rentalPeriod: 1
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [totalPrice, setTotalPrice] = useState(selectedCar.price);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // Load saved form data if exists
  useEffect(() => {
    const savedData = getFormData();
    if (savedData) {
      setFormData(savedData);
      validateForm({...savedData});
    }
  }, []);
  
  // Calculate total price whenever rental period changes
  useEffect(() => {
    setTotalPrice(selectedCar.price * formData.rentalPeriod);
  }, [formData.rentalPeriod, selectedCar.price]);
  
  const validateForm = (data: FormData) => {
    const newErrors: FormErrors = {};
    let valid = true;
    
    // Validate customer name
    if (!data.customerName.trim()) {
      newErrors.customerName = 'Name is required';
      valid = false;
    }
    
    // Validate phone number (simple format check)
    if (!data.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
      valid = false;
    } else if (!/^\d{10}$/.test(data.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Enter a valid 10-digit phone number';
      valid = false;
    }
    
    // Validate email
    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Enter a valid email address';
      valid = false;
    }
    
    // Validate driver's license
    if (!data.driverLicense.trim()) {
      newErrors.driverLicense = 'Driver\'s license is required';
      valid = false;
    }
    
    // Validate start date
    if (!data.startDate) {
      newErrors.startDate = 'Start date is required';
      valid = false;
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(data.startDate);
      if (selectedDate < today) {
        newErrors.startDate = 'Start date cannot be in the past';
        valid = false;
      }
    }
    
    // Validate rental period
    if (data.rentalPeriod < 1 || data.rentalPeriod > 30) {
      newErrors.rentalPeriod = 'Rental period must be between 1 and 30 days';
      valid = false;
    }
    
    setErrors(newErrors);
    setIsFormValid(valid);
    return valid;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: name === 'rentalPeriod' ? parseInt(value) : value
    };
    
    setFormData(updatedFormData);
    saveFormData(updatedFormData);
    validateForm(updatedFormData);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
  
    if (validateForm(formData)) {
      setIsSubmitting(true);
  
      try {
        // Calculate the expiry time (e.g., 5 minutes for testing)
        const rentalEndTime = new Date();
        rentalEndTime.setMinutes(rentalEndTime.getMinutes() + formData.rentalPeriod);
  
        updateCarAvailability(selectedCar.id, false, rentalEndTime.getTime());
  
        clearFormData();
        onSubmitSuccess();
  
      } catch (error) {
        setSubmitError(error instanceof Error ? error.message : 'Reservation failed.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  const handleCancel = () => {
    navigate('/');
    clearFormData();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
          <p className="font-medium">Reservation Failed</p>
          <p>{submitError}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Name */}
        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.customerName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.customerName && (
            <p className="mt-1 text-sm text-red-600">{errors.customerName}</p>
          )}
        </div>
        
        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
          )}
        </div>
        
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        
        {/* Driver's License */}
        <div>
          <label htmlFor="driverLicense" className="block text-sm font-medium text-gray-700 mb-1">
            Driver's License Number
          </label>
          <input
            type="text"
            id="driverLicense"
            name="driverLicense"
            value={formData.driverLicense}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.driverLicense ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.driverLicense && (
            <p className="mt-1 text-sm text-red-600">{errors.driverLicense}</p>
          )}
        </div>
        
        {/* Start Date */}
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.startDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.startDate && (
            <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
          )}
        </div>
        
        {/* Rental Period */}
        <div>
          <label htmlFor="rentalPeriod" className="block text-sm font-medium text-gray-700 mb-1">
            Rental Period (Days)
          </label>
          <input
            type="number"
            id="rentalPeriod"
            name="rentalPeriod"
            value={formData.rentalPeriod}
            onChange={handleChange}
            min="1"
            max="30"
            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.rentalPeriod ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.rentalPeriod && (
            <p className="mt-1 text-sm text-red-600">{errors.rentalPeriod}</p>
          )}
        </div>
      </div>
      
      {/* Total Price */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="font-medium">Total Price:</span>
          <span className="text-xl font-semibold text-blue-700">${totalPrice.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {formData.rentalPeriod} {formData.rentalPeriod === 1 ? 'day' : 'days'} × ${selectedCar.price.toFixed(2)}/day
        </p>
      </div>
      
      {/* Form Actions */}
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`px-4 py-2 rounded-lg text-white font-medium ${
            isFormValid && !isSubmitting
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? 'Processing...' : 'Complete Reservation'}
        </button>
      </div>
    </form>
  );
};

export default ReservationForm;