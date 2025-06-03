// src/pages/DeleteAsset/DeleteAssetPage.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DeleteAssetPage.css";

const DeleteAssetPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Simulación de datos mock, reemplazable por una búsqueda real
  const mockAsset = {
    id,
    name: "Apple Inc.",
    symbol: "AAPL",
  };

  const handleConfirmDelete = () => {
    console.log(`✅ Deleted asset with id: ${id}`);
    navigate("/portfolio");
  };

  const handleCancel = () => {
    navigate(-1); // Volver a la página anterior
  };

  return (
    <div className="delete-asset-page">
      <h2>Delete {mockAsset.symbol}</h2>
      <p>Are you sure you want to permanently delete <strong>{mockAsset.name}</strong> from your portfolio?</p>

      <div className="delete-buttons">
        <button className="btn-outline" onClick={handleCancel}>Cancel</button>
        <button className="btn-filled delete" onClick={handleConfirmDelete}>Confirm Delete</button>
      </div>
    </div>
  );
};

export default DeleteAssetPage;