import React from 'react';

const NextArrow = ({ onClick }) => (
  <div className="next-arrow" onClick={onClick}>
    {/* Add your custom next arrow content here */}
    <span>
      <img
        src="/icons/right.svg"
        alt="Next"
        style={{ width: '24px', height: '24px' }} // Adjust the width and height as needed
      />
    </span>
  </div>
);

export default NextArrow;
