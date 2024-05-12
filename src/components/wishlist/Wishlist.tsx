import React, { useState } from 'react';
import './wishlist.scss';

const Wishlist: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="wishlist">
      <button className={isClicked ? 'clicked' : ''} onClick={handleClick}>
        Wishlist
      </button>
    </div>
  );
};

export default Wishlist;
