// src/components/cards/AssetCard.jsx
import React from "react";
import "./AssetCard.css"; // Assuming you have a CSS file for styling
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from "react-icons/fi";


const AssetCard = ({ id, name, symbol, type, currentValue, quantity, purchasePrice }) => {
  const typeColorClass = {
    stock: "stock",
    bond: "bond",
    crypto: "crypto",
  }[(type || "").toLowerCase()] || "default";

  return (
    <Link to={`/assets/${id}`} className="asset-card-link">
      <div className="asset-card">
        <div className="asset-header-card">
          <div>
            <h3>{symbol}</h3>
            <p className="asset-name">{name}</p>
          </div>
          <span className={`type-badge ${typeColorClass}`}>{type}</span>
          <FiArrowUpRight className="tap-icon" />
          
        </div>

        <div className="asset-details">
          <div className="asset-detail">
            <p className="label">Current Value</p>
            <p className="value">${currentValue}</p>
          </div>
          <div className="asset-detail">
            <p className="label">Quantity</p>
            <p className="value">{quantity}</p>
          </div>
          <div className="asset-detail">
            <p className="label">Purchase Price</p>
            <p className="value">${purchasePrice.toFixed(2)}</p>
          </div>
          <div className="asset-detail">
            <p className="label">Total</p>
            <p className="value">${(currentValue * quantity).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </Link>

  );
};

      export default AssetCard;