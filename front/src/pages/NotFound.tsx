import React from 'react';

import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleButton = () => {
    navigate('../home');
  };

  return (
    <div>
      <p>Error 404</p>
      <button onClick={handleButton}>Return to home</button>
    </div>
  );
};

export default NotFound;
