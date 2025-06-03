// src/pages/Portfolio/PortfolioPage.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { MdLogout, MdPersonAdd } from 'react-icons/md';

import { logoutUser } from '../../features/users/usersSlice';
import { clearAssets } from '../../features/assets/assetsSlice';
import { clearTransactions } from '../../features/transactions/transactionsSlice';

import PortfolioSummary from '../../components/details/PortfolioSummary';
import AssetFilters from '../../components/details/AssetFilters';
import AssetsList from '../../features/assets/AssetsList';

import './PortfolioPage.css';

const PortfolioPage = () => {
  const currentUser = useSelector(state => state.users.currentUser);
  const allAssets = useSelector(state => state.assets.list);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const filteredAssets = allAssets
    .filter(asset => asset.quantity > 0)
    .filter(asset => {
      const matchesType =
        activeFilter === 'All' ||
        (activeFilter === 'Stocks' && asset.type.toLowerCase() === 'stock') ||
        (activeFilter === 'Bonds' && asset.type.toLowerCase() === 'bond') ||
        (activeFilter === 'Crypto' && asset.type.toLowerCase() === 'crypto');

      const matchesSearch =
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.symbol.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesType && matchesSearch;
    });

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearAssets());
    dispatch(clearTransactions());
    navigate('/login');
  };

  const handleNavigateToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="portfolio-container">
      <div className="portfolio-header-fixed">
        {currentUser && (
          <div className="portfolio-user-greeting">
            <div className="portfolio-user-header">
              <div className="portfolio-user-info">
                <h2 className="portfolio-user-name">Bienvenido, {currentUser.nombre}</h2>
                <p className="portfolio-user-email">{currentUser.email}</p>
              </div>
              <div className="portfolio-user-actions">
                {currentUser.email === 'admin@gmail.com' && (
                  <button className="portfolio-register-btn" onClick={handleNavigateToRegister} title="Registrar nuevo usuario">
                    <MdPersonAdd size={24} className="portfolio-register-icon" />
                  </button>
                )}
                <button className="portfolio-logout-btn" onClick={handleLogout} title="Cerrar sesión">
                  <MdLogout size={22} className="portfolio-logout-icon" />
                </button>
              </div>
            </div>
          </div>
        )}

        <PortfolioSummary assets={filteredAssets} />
        <AssetFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </div>

      <div className="portfolio-scrollable-list">
        <AssetsList assets={filteredAssets} />
      </div>
    </div>
  );
};

export default PortfolioPage;