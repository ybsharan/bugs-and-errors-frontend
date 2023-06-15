import React from 'react';
import { BsBell } from 'react-icons/bs';
import { AiOutlineDown } from 'react-icons/ai';

const Header = () => {
  return (
    <nav>
      <div className='navbar'>
        <div className='notification'>
          <BsBell />
        </div>
        <div className='profile'>
          <div className='user'></div>
          <h5>Irfan Musthapa </h5>
          <AiOutlineDown />
        </div>
      </div>
    </nav>
  );
};

export default Header;
