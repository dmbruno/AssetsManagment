// src/pages/AssetDetails/AssetDetailsPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import AssetTopBar from '../../components/layout/AssetTopBar';
import AssetHeader from '../../components/layout/AssetHeader';
import CurrentPriceCard from '../../components/details/CurrentPriceCard';
import AssetInfoCard from '../../components/details/AssetInfoCard';
import AssetActionButtons from '../../components/details/AssetActionButtons';
import TransactionHistory from '../../components/details/TransactionHistory';

import { selectTransactionsGroupedByAsset, deleteTransaction } from '../../features/transactions/transactionsSlice';
import './AssetDetailsPage.css';

const AssetDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const assetId = Number(id);

  const asset = useSelector(state =>
    state.assets.list.find(asset => asset.id === assetId)
  );

  const transactionsByAsset = useSelector(selectTransactionsGroupedByAsset);
  const transactions = transactionsByAsset[assetId] || [];

  const totalBought = transactions
    .filter(tx => tx.type === 'buy')
    .reduce((sum, tx) => sum + tx.quantity, 0);

  const totalSold = transactions
    .filter(tx => tx.type === 'sell')
    .reduce((sum, tx) => sum + tx.quantity, 0);

  const netQuantity = totalBought - totalSold;

  const totalCost = transactions
    .filter(tx => tx.type === 'buy')
    .reduce((sum, tx) => sum + tx.quantity * tx.price, 0);

  const avgPrice = totalBought > 0 ? totalCost / totalBought : 0;

  const handleEditTransaction = (tx) => {
    navigate(`/transactions/${tx.id}/edit`);
  };

  const handleDeleteTransaction = async (tx) => {
    const confirm = window.confirm("Are you sure you want to delete this transaction?");
    if (confirm) {
      try {
        await dispatch(deleteTransaction(tx.id)).unwrap();
      } catch (err) {
        console.error("Error deleting:", err);
      }
    }
  };

  const handleSell = () => {
    navigate(`/assets/${id}/sell`);
  };

  const handleHistoryClick = () => {
    navigate(`/assets/${asset.id}/historic`);
  };

  const handleAddTransaction = () => {
    navigate(`/assets/${id}/add`);
  };

  if (!asset) return <p>Asset not found</p>;

  return (
    <div className="asset-details-page">
      <div className="asset-fixed-header">
        <AssetTopBar symbol={asset.symbol} />
      </div>
      <div className="prueba">

        <AssetHeader
          name={asset.name}
          symbol={asset.symbol}
          type={asset.type}
        />
        <CurrentPriceCard currentPrice={asset.current_price} assetId={asset.id} />
      </div>
      <div className="asset-scrollable-content">
        <AssetInfoCard
          quantity={netQuantity}
          purchasePrice={avgPrice}
          currentPrice={asset.current_price}
        />
        <AssetActionButtons
          onSell={handleSell}
          onAdd={handleAddTransaction}
          onHistory={handleHistoryClick}
        />
        <TransactionHistory
          transactions={transactions}
          symbol={asset.symbol}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
        />
      </div>
    </div>
  );
};

export default AssetDetailsPage;
