import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReservationPage from './pages/ReservationPage';
import AddANewCar from './pages/AddANewCar';
import ProtectedRoute from './Routes/ProtectedRoute';
import { useEffect } from 'react';
import { getExpiryList, revertCarAvailability } from './utils/localStorage';

function App() {

  useEffect(() => {
    const expiryList = getExpiryList();
    const now = Date.now();

    expiryList.forEach(({ carId, expiryTime }) => {
      if (expiryTime <= now) {
        revertCarAvailability(carId);
      } else {
        setTimeout(() => {
          revertCarAvailability(carId);
        }, expiryTime - now);
      }
    });
  }, []);
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/reservation" element={<ReservationPage />} />
      <Route
        path="/addACar"
        element={
          <ProtectedRoute>
            <AddANewCar />
          </ProtectedRoute>
        }
      />
    </Routes>
    </Router>
  );
}

export default App;