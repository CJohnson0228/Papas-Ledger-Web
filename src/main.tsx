import 'jotai-devtools/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css';
import AppLayout from './layouts/AppLayout.tsx';
import AuthLayout from './layouts/AuthLayout.tsx';
import MainLayout from './layouts/MainLayout.tsx';
import ProtectedRoute from './layouts/ProtectedRoutes.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Splash from './pages/Splash.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<Splash />} />
          <Route element={<AuthLayout />}>
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Register />} />
          </Route>
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path='dashboard' element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
