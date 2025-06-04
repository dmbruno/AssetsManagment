import React from 'react';
import './PnLCard.css';

const PnLCard = ({ currentPrice, avgPurchasePrice, quantity, pnl }) => {
  const pnlColor = pnl >= 0 ? 'green' : 'red';
  const arrow = pnl >= 0 ? '▲' : '🔻';

  return (
    <div className="pnl-card">
      <div className="pnl-title-row">
        <h3 className="pnl-title">PnL</h3>
        <span className="pnl-title-icon" role="img" aria-label="PnL">📈</span>
      </div>
      <hr className="pnl-divider" />
      <div className="pnl-grid">
        <div className="pnl-label">Current Price</div>
        <div className="pnl-label">PPC</div>
        <div className="pnl-label">Net Quantity</div>
        <div className="pnl-label">Unr. PnL</div>

        <div className="pnl-value pnl-value-main">${currentPrice.toFixed(2)}</div>
        <div className="pnl-value pnl-value-main">${avgPurchasePrice.toFixed(2)}</div>
        <div className="pnl-value pnl-value-main">{quantity}</div>
        <div className={`pnl-value pnl-badge ${pnlColor}`}>
          <span className="pnl-arrow">{arrow}</span>
          ${Math.abs(pnl).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default PnLCard;