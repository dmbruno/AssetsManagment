import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthRedirect = () => {
  const currentUser = useSelector(state => state.users.currentUser);
  if (currentUser) {
    return <Navigate to="/portfolio" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AuthRedirect;
