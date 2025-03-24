import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'jotai-devtools/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import AppLayout from './app/AppLayout.tsx';
import MainLayout from './app/MainLayout.tsx';
import Dashboard from './app/pages/dashboard/Dashboard.tsx';
import Ledger from './app/pages/ledger/Ledger.tsx';
import Splash from './app/pages/splash/Splash.tsx';
import ProtectedRoute from './app/ProtectedRoutes.tsx';
import AuthLayout from './authentication/AuthLayout.tsx';
import Login from './authentication/pages/Login.tsx';
import Register from './authentication/pages/Register.tsx';
import './index.css';

gsap.registerPlugin(useGSAP);

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
            <Route path='ledger/:accountID' element={<Ledger />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
