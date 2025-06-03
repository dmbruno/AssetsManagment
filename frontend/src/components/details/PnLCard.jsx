import React from 'react';
import './PnLCard.css';

const PnLCard = ({ currentPrice, avgPurchasePrice, quantity, pnl }) => {
  const pnlColor = pnl >= 0 ? 'green' : 'red';
  const arrow = pnl >= 0 ? '▲' : '🔻';

  return (
    <div className="pnl-card">
      <h3>PnL</h3>
      <div className="pnl-grid">
        <div className="pnl-label">Current Price</div>
        <div className="pnl-label">PPC</div>
        <div className="pnl-label">Net Quantity</div>
        <div className="pnl-label">Unr. PnL</div>

        <div className="pnl-value">${currentPrice.toFixed(2)}</div>
        <div className="pnl-value">${avgPurchasePrice.toFixed(2)}</div>
        <div className="pnl-value">{quantity}</div>
        <div className={`pnl-value ${pnlColor}`}>
          {arrow} ${Math.abs(pnl).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default PnLCard;