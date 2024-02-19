import React from 'react';
import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


import Login from './pages/Login/login.tsx';
import Callback from './pages/Login/callback.tsx';
import Saldo from './pages/SaldoTrans/saldoTrans.tsx';
import {supabase} from './components/client.js';
import ProtectedRoute from './components/protectedRoute.tsx';

const App = () => {

    const [isAuthorized, setAuthorized] = useState(JSON.parse(sessionStorage.getItem('authorized') || 'false'));

    supabase.auth.onAuthStateChange((event, session) => {
        console.log(event, session)
        if(event === 'SIGNED_IN'){
            sessionStorage.setItem('authorized','true')
            setAuthorized(true)
        }else if(event === 'SIGNED_OUT'){
            sessionStorage.setItem('authorized','false')
            setAuthorized(false)
        }
    })

    useEffect(() => {
        function handleStorage() {
            console.log(sessionStorage.getItem('authorized'));
            setAuthorized(JSON.parse(sessionStorage.getItem('authorized') || 'false'))
        }
        window.addEventListener('storage', handleStorage);
        return () => {
            window.removeEventListener('storage', handleStorage);
        }
    },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to={'/login'} replace />}/>
        <Route path='/login' element={<Login isAuthorized={isAuthorized}/>}/>
        <Route path='/saldo' element={<ProtectedRoute isAuthorized={isAuthorized} children={<Saldo/>}/>}/>
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>
    </BrowserRouter>
  );
};

const container = document.getElementById('main');
const root = createRoot(container);
root.render(<App/>);