import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedStore = () => {

    const userSlice = useSelector(store => store.userSlice);

    if (userSlice.role==='admin') {
        return <Outlet />
    } else {
        return <Navigate to='/login' />
    }
}

export default ProtectedStore;