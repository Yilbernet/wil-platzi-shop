import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const email = localStorage.getItem('email_token');
  if (email?.includes('@')) {
    return <Outlet/>
  } else {
    return <Navigate to='/login'/>
  }
}

export default ProtectedRoutes;