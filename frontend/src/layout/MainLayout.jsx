// src/layout/MainLayout.jsx
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import FooterNav from '../components/layout/FooterNav';
import { BeatLoader } from 'react-spinners';

import './MainLayout.css';

const MainLayout = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const hideFooter = location.pathname === '/login';
  const [loading, setLoading] = useState(false);

  // Spinner de carga para cualquier cambio de ruta
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  // Escuchamos navegación global desde botones del footer
  useEffect(() => {
    const handleAdd = () => {
      setLoading(true);
      setTimeout(() => {
        navigate('/add');
      }, 600);
    };

    const handleTransactions = () => {
      setLoading(true);
      setTimeout(() => {
        navigate('/transactions');
      }, 600);
    };

    const handlePortfolio = () => {
      setLoading(true);
      setTimeout(() => {
        navigate('/portfolio');
      }, 600);
    };

    window.addEventListener('startAddNavigation', handleAdd);
    window.addEventListener('startTransactionsNavigation', handleTransactions);
    window.addEventListener('startPortfolioNavigation', handlePortfolio);

    return () => {
      window.removeEventListener('startAddNavigation', handleAdd);
      window.removeEventListener('startTransactionsNavigation', handleTransactions);
      window.removeEventListener('startPortfolioNavigation', handlePortfolio); 

    };
  }, [navigate]);

  return (
    <div className="main-layout">
      {loading && (
        <div className="spinner-overlay">
          <BeatLoader color="#5865f2" height={4} width={120} />
        </div>
      )}
      <main>
        <Outlet />
      </main>
      {!hideFooter && <FooterNav />}
    </div>
  );
};

export default MainLayout;