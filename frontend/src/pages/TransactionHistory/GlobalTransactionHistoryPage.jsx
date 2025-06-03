// src/pages/Transactions/GlobalTransactionHistoryPage.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PageTopBar from '../../components/layout/PageTopBar';
import AssetFilters from '../../components/details/AssetFilters';
import { selectTransactionsEnriched } from '../../features/transactions/transactionsSlice';
import './GlobalTransactionHistoryPage.css';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import CancelButton from '../../components/buttons/CancelButton';

const GlobalTransactionHistoryPage = () => {
  const currentUser = useSelector(state => state.users.currentUser); // ✅
  const allTx = useSelector(selectTransactionsEnriched);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('All');

  // ✅ Filtrar por user_id actual
  const userTx = allTx.filter(tx => tx.user_id === currentUser?.id);

  const filteredTx = userTx.filter(tx => {
    const typeMap = {
      All: null,
      Stocks: 'stock',
      Bonds: 'bond',
      Crypto: 'crypto'
    };

    const matchesType = !typeMap[activeFilter] || tx.asset_type === typeMap[activeFilter];

    const matchesSearch =
      searchTerm.trim() === '' ||
      (tx.asset_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.asset_symbol?.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesTransactionType =
      transactionTypeFilter === 'All' ||
      tx.type.toLowerCase() === transactionTypeFilter.toLowerCase();

    return matchesType && matchesSearch && matchesTransactionType;
  });

  return (
    <div className="global-transactions-page">
      <PageTopBar title="All Transactions" />

      <div className="transaction-filters">
        <AssetFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </div>

      <div className="transaction-type-filters">
        {['All', 'Buy', 'Sell'].map(type => (
          <button
            key={type}
            className={`type-filter-button ${transactionTypeFilter === type ? `active ${type.toLowerCase()}` : ''}`}
            onClick={() => setTransactionTypeFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="transaction-table-container">
        <div className="transaction-table-scroll">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Symbol</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredTx.map(tx => (
                <tr key={tx.id}>
                  <td className={tx.type === 'buy' ? 'buy' : 'sell'}>{tx.date}</td>
                  <td className={tx.type === 'buy' ? 'buy' : 'sell'}>{tx.type.toUpperCase()}</td>
                  <td>{tx.asset_symbol}</td>
                  <td>{tx.quantity}</td>
                  <td className={tx.type === 'buy' ? 'buy' : 'sell'}>${tx.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="footer-buttons">
        <PrimaryButton
          text="View on CoinMarketCap ↗️"
          onClick={() => window.open('https://coinmarketcap.com', '_blank')}
        />
        <CancelButton className="btn-outline" text="Export to Google Sheets 📤" />
      </div>
    </div>
  );
};

export default GlobalTransactionHistoryPage;