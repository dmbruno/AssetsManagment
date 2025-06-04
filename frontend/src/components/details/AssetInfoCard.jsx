// src/components/details/AssetInfoCard.jsx
import React from "react";
import "./AssetInfoCard.css"; // Asegurate de tener los estilos adecuados

const AssetInfoCard = ({ quantity, purchasePrice, currentPrice }) => {
  // ✅ Cálculo del PnL %
  const pnlPercent =
    purchasePrice && currentPrice
      ? ((currentPrice - purchasePrice) / purchasePrice) * 100
      : 0;

  const isGain = pnlPercent >= 0;
  const pnlClass = isGain ? "positive" : "negative";
  const arrow = isGain ? "▲" : "🔻";

  return (
    <div className="asset-info-card">
      <h3 className="section-title asset-info-title">
        Asset Details
        <span className="asset-info-icon">📊</span>
      </h3>
      <hr className="asset-info-divider" />
      <div className="info-row">
        <span className="label muted">Quantity</span>
        <span className="value">{quantity}</span>
      </div>

      <div className="info-row">
        <span className="label muted">Purchase Price ó PPC</span>
        <span className="value">${purchasePrice?.toFixed(2)}</span>
      </div>

      <div className="info-row">
        <span className="label muted">PnL</span>
        <span className={`value change ${pnlClass}`}>
          {arrow} {Math.abs(pnlPercent).toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

export default AssetInfoCard;