import React from 'react';

const PrevArrow = ({ onClick }) => (
  <div className="prev-arrow" onClick={onClick}>
    {/* Add your custom previous arrow content here */}
    <img
        src="/icons/left.svg"
        alt="Next"
        style={{ width: '24px', height: '24px' }} // Adjust the width and height as needed
      />
  </div>
);

export default PrevArrow;
