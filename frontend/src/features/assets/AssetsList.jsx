// src/features/assets/AssetsList.jsx
import React from 'react';
import AssetCard from '../../components/cards/AssetCard';
import "./AssetsList.css";

const AssetsList = ({ assets = [] }) => {
  if (assets.length === 0) {
    return (
      <div className="empty-assets">
        <p>📭 No assets match your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="asset-list" style={{ marginBottom: "20px" }}>
      {assets.map((asset) => (
        <div className="asset-fade" key={asset.id}>
          <AssetCard {...asset} />
        </div>
      ))}
    </div>
  );
};

export default AssetsList;