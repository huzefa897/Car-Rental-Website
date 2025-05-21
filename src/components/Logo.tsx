import React from 'react';
import { Car } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2 ">
      <Car size={28} className="text-blue-600" />
      <span className='text-4xl font-bold text-blue-600'>UTS</span>
      <span className=' translate-x-[-8px] translate-y-2 text-[10px] font-bold '>Cars</span>
    </Link>
  );
};

export default Logo;