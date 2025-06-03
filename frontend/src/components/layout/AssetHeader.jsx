// src/components/details/AssetHeader.jsx
import React from "react";
import "./AssetHeader.css";

const AssetHeader = ({ name, symbol, type }) => {
  const typeColorClass = {
    stock: "stock",
    bond: "bond",
    crypto: "crypto",
  }[(type || "").toLowerCase()] || "default";

  return (
    <div className="asset-header-container">
      <div className="asset-header-1">
        <h2 className="symbol">{symbol}</h2>
        <p className="name">{name}</p>
      </div>
      <span className={`type-badge ${typeColorClass}`}>{type}</span>
    </div>
  );
};

export default AssetHeader;