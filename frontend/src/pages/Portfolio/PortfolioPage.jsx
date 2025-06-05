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

import PortfolioPieChart from '../../components/details/PortfolioPieChart';

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
          <header className="portfolio-header">
            <div className="portfolio-user-info">
              <h2>Bienvenido, {currentUser.nombre}</h2>
              <p>{currentUser.email}</p>
            </div>
            <div className="portfolio-actions">
              {currentUser.email === 'admin@gmail.com' && (
                <button onClick={handleNavigateToRegister} title="Registrar nuevo usuario">
                  <MdPersonAdd size={22} />
                </button>
              )}
              <button onClick={handleLogout} title="Cerrar sesión">
                <MdLogout size={20} />
              </button>
            </div>
          </header>
        )}
        <PortfolioSummary assets={filteredAssets} />
      </div>
      <div className="portfolio-scrollable-list">
        <section className="portfolio-piechart-section">
          <PortfolioPieChart assets={filteredAssets} />
        </section>
        <AssetFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <AssetsList assets={filteredAssets} />
      </div>
    </div>
  );
};

export default PortfolioPage;