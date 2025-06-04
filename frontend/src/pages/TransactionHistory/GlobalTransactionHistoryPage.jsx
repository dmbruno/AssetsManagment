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

  const handleExportToCSV = () => {
    // Separador compatible con Excel/Sheets en español
    const SEP = ';';
    // Encabezado de usuario como comentario (puedes quitar estas líneas si lo prefieres)
    const userInfo = [
      `# User: ${currentUser?.name || currentUser?.email || ''}`,
      `# Email: ${currentUser?.email || ''}`,
      ''
    ];
    // Encabezados de la tabla de transacciones
    const headers = ['Date', 'Type', 'Symbol', 'Quantity', 'Price'];
    // Filas de datos de transacciones
    const rows = filteredTx.map(tx => [
      tx.date,
      tx.type.toUpperCase(),
      tx.asset_symbol,
      tx.quantity,
      tx.price
    ]);

    // --- Acumulados por asset ---
    // Agrupar transacciones por asset_symbol
    const assetMap = {};
    userTx.forEach(tx => {
      const symbol = tx.asset_symbol;
      if (!assetMap[symbol]) {
        assetMap[symbol] = {
          symbol,
          totalQuantity: 0,
          totalInvested: 0,
          totalBuyQuantity: 0,
          totalBuyAmount: 0,
          totalSellQuantity: 0,
          totalSellAmount: 0,
          lastPrice: 0
        };
      }
      if (tx.type === 'buy') {
        assetMap[symbol].totalQuantity += tx.quantity;
        assetMap[symbol].totalInvested += tx.quantity * tx.price;
        assetMap[symbol].totalBuyQuantity += tx.quantity;
        assetMap[symbol].totalBuyAmount += tx.quantity * tx.price;
      } else if (tx.type === 'sell') {
        assetMap[symbol].totalQuantity -= tx.quantity;
        assetMap[symbol].totalSellQuantity += tx.quantity;
        assetMap[symbol].totalSellAmount += tx.quantity * tx.price;
      }
      assetMap[symbol].lastPrice = tx.price; // Último precio registrado
    });
    // Calcular acumulados
    const assetSummaryHeaders = ['Symbol', 'Total Quantity', 'Total Invested', 'Avg Buy Price', 'Current Value', 'PNL'];
    const assetSummaryRows = Object.values(assetMap).map(asset => {
      const avgBuyPrice = asset.totalBuyQuantity > 0 ? (asset.totalBuyAmount / asset.totalBuyQuantity) : 0;
      const currentValue = asset.totalQuantity * asset.lastPrice;
      const pnl = currentValue + asset.totalSellAmount - asset.totalBuyAmount;
      return [
        asset.symbol,
        asset.totalQuantity,
        asset.totalBuyAmount.toFixed(2),
        avgBuyPrice.toFixed(2),
        currentValue.toFixed(2),
        pnl.toFixed(2)
      ];
    });

    // Construir el CSV final con punto y coma como separador
    const csvContent = [
      ...userInfo,
      headers.join(SEP),
      ...rows.map(row => row.join(SEP)),
      '',
      '# Asset summaries',
      assetSummaryHeaders.join(SEP),
      ...assetSummaryRows.map(row => row.join(SEP))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'transactions_and_assets.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
        {[{type: 'All', className: 'all'}, {type: 'Buy', className: 'buy'}, {type: 'Sell', className: 'sell'}].map(({type, className}) => (
          <button
            key={type}
            className={`type-filter-button ${className} ${transactionTypeFilter === type ? `active ${className}` : ''}`}
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
          text="CoinMarketCap ↗️"
          onClick={() => window.open('https://coinmarketcap.com', '_blank')}
        />
        <CancelButton className="btn-outline" text="Export to Sheets 📤" onClick={handleExportToCSV} />
      </div>
    </div>
  );
};

export default GlobalTransactionHistoryPage;