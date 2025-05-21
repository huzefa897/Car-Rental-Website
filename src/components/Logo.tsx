import React from 'react';
import { Car } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2 ">
      <Car size={28} className="text-blue-600" />
      <span className='text-2xl font-bold text-blue-400'><span className='text-red-600 text-4xl'>S</span>ALEEM<span className='text-4xl text-red-600'>T</span>OURIST</span>
      {/* <span className=' translate-x-[-8px] translate-y-2 text-[10px] font-bold '></span> */}
    </Link>
  );
};

export default Logo;