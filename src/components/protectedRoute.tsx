import React from 'react'
import { Navigate, useNavigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children, isAuthorized }) {
    if (isAuthorized != true) { 
        const location = useLocation();
        localStorage.setItem('lastPage', location.pathname)
        return (
            <Navigate to="/login" replace></Navigate>
        );
    }
    return children
};