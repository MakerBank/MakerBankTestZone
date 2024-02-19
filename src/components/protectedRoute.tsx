import React from 'react'
import { Navigate, useNavigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children, isAuthorized }) {
    const location = useLocation();
    if (isAuthorized != true) { 
        localStorage.setItem('lastPage', location.pathname)
        return (
            <Navigate to="/login" replace></Navigate>
        );
    }
    return children
};