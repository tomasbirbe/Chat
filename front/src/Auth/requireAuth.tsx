import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import authContext from '../../authContext';

const requireAuth: any = ({ children }: { children: any }) => {
  const auth = useContext(authContext);
  if (!auth?.isLogged) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default requireAuth;
