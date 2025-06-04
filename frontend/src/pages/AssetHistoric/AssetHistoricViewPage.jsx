// src/pages/AssetHistoricViewPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AssetTopBar from '../../components/layout/AssetTopBar';
import AssetHeader from '../../components/layout/AssetHeader';
import CurrentPriceCard from '../../components/details/CurrentPriceCard';
import PurchaseDetailsTable from '../../components/details/PurchaseDetailsTable';
import PnLCard from '../../components/details/PnLCard';
import ViewMarketButton from '../../components/details/ViewMarketButton';

import { selectTransactionsGroupedByAsset } from '../../features/transactions/transactionsSlice';
import './AssetHistoricViewPage.css';



const AssetHistoricViewPage = () => {
  const { id } = useParams();
  const assetId = Number(id);
  
  

  const asset = useSelector(state =>
    state.assets.list.find(a => a.id === assetId)
  );

  const transactionsByAsset = useSelector(selectTransactionsGroupedByAsset);
  const assetTxs = transactionsByAsset[assetId] || [];

  const purchases = assetTxs.filter(tx => tx.type === 'buy');

  const totalQuantity = purchases.reduce((sum, p) => sum + p.quantity, 0);
  const totalCost = purchases.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const avgPrice = totalQuantity > 0 ? totalCost / totalQuantity : 0;

  const totalSellQuantity = assetTxs
    .filter(tx => tx.type === 'sell')
    .reduce((sum, s) => sum + s.quantity, 0);

  const netQuantity = totalQuantity - totalSellQuantity;
  const pnl = (asset?.current_price - avgPrice) * netQuantity;

  if (!asset) return <p>Asset not found</p>;

  return (
    <div className="asset-historic-page">
      <div className="scrollable-content">
        <AssetTopBar symbol={asset.symbol} />
        <AssetHeader
          name={asset.name}
          symbol={asset.symbol}
          type={asset.type}
        />
        <CurrentPriceCard assetId={asset.id} currentPrice={asset.current_price} />
        <PurchaseDetailsTable transactions={assetTxs} />
        <PnLCard
          currentPrice={asset.current_price}
          avgPurchasePrice={avgPrice}
          quantity={netQuantity}
          pnl={pnl}
        />
        <div className="view-market-button-container">
          <ViewMarketButton
            text="CoinMarketCap ↗️"
            onClick={() => window.open('https://coinmarketcap.com', '_blank')}
          />
        </div>
      </div>
    </div>
  );
};

export default AssetHistoricViewPage;