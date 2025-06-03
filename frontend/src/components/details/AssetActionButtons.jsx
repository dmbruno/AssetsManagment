// src/components/details/AssetActionButtons.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./AssetActionButtons.css";

const AssetActionButtons = ({ onSell, onAdd, onHistory }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div className="asset-action-buttons">
      <button
        className="btn-outline"
        onClick={() => setTimeout(onSell, 200)}
      >
        Sell Assets
      </button>
      <button
        className="btn-filled"
        onClick={() => setTimeout(onAdd, 200)}  // ⏱️ Delay de 100ms
      >
        Add Asset To Portfolio
      </button>
      <button
        className="btn-filled"
        onClick={() => setTimeout(onHistory, 200)}
      >
        Historic View
      </button>
    </div>
  );
};

export default AssetActionButtons;