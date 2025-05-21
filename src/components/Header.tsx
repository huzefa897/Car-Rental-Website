import React from 'react';
import Logo from './Logo';
import { ClipboardCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Login from "./Login";
const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />
       <div className='flex gap-4 px-4 py-4'>
        <Link 
          to="/AddACar" 
          className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
        >
          <ClipboardCheck size={20} />
          <span className="font-medium">Add a new Car</span>
        </Link>
        
        <Link 
          to="/reservation" 
          className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
        >
          <ClipboardCheck size={20} />
          <span className="font-medium">Reservation</span>
        </Link>
        <Login />
        </div>
      </div>
    </header>
  );
};

export default Header;