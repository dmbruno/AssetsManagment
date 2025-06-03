// src/pages/SellAsset/SellAssetPage.jsx
import React, { useState, useMemo } from 'react';
import './SellAssetPage.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadAssets } from '../../features/assets/assetsSlice';
import { loadTransactions } from '../../features/transactions/transactionsSlice';
import AssetTopBar from '../../components/layout/AssetTopBar';
import AssetHeader from '../../components/layout/AssetHeader';

import { selectTransactionsByAsset } from '../../features/transactions/transactionsSlice';

const SellAssetPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const assetId = Number(id);
  const asset = useSelector(state =>
    state.assets.list.find(a => a.id === assetId)
  );

  const transactions = useSelector(selectTransactionsByAsset(assetId));

  const currentUser = useSelector(state => state.users.currentUser); // ✅ obtener el usuario actual

  const availableQuantity = useMemo(() => {
    return transactions.reduce((acc, tx) => {
      return tx.type === 'buy'
        ? acc + tx.quantity
        : acc - tx.quantity;
    }, 0);
  }, [transactions]);

  const [formData, setFormData] = useState({
    quantity: '',
    price: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSell = async () => {
    const saleQty = parseFloat(formData.quantity);
    const salePrice = parseFloat(formData.price);

    if (saleQty > availableQuantity) {
      alert("You can't sell more than you own!");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to sell ${saleQty} units of ${asset.symbol} at $${salePrice} per unit?`
    );

    if (!confirmed) return;

    const tx = {
      user_id: currentUser.id, // ✅ ahora usa el usuario real
      asset_id: assetId,
      quantity: saleQty,
      price: salePrice,
      type: "sell",
      date: new Date(formData.date).toISOString().split("T")[0]
    };

    try {
      const response = await fetch('/transacciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tx)
      });

      if (!response.ok) throw new Error("Failed to save transaction");

      await dispatch(loadTransactions());
      await dispatch(loadAssets());

      navigate(`/assets/${assetId}`);
    } catch (err) {
      console.error("Error saving sell:", err);
      alert("Hubo un error al registrar la venta.");
    }
  };

  const handleCancel = () => {
    setFormData({ quantity: '', price: '', date: '' });
    navigate(-1);
  };

  if (!asset) return <p>Asset not found</p>;

  return (
    <div className="sell-asset-container">
      <AssetTopBar name={asset.name} symbol={asset.symbol} type={asset.type} />
      <AssetHeader
        name={asset.name}
        symbol={asset.symbol}
        type={asset.type}
      />
      <div className="asset-summary">
        <div>
          <h2>{asset.symbol}</h2>
          <p className="muted">{asset.name}</p>
          <p className="available-info">Available: {availableQuantity} Units</p>
        </div>
        <span className={`badge ${asset.type}`}>{asset.type}</span>
      </div>

      <div className="sell-form">
        <label>
          Quantity to Sell
          <input
            type="number"
            name="quantity"
            placeholder={`Max: ${availableQuantity}`}
            value={formData.quantity}
            onChange={handleChange}
          />
        </label>

        <label>
          Sale Price (per unit)
          <input
            type="number"
            name="price"
            placeholder="e.g. 100"
            value={formData.price}
            onChange={handleChange}
          />
        </label>

        <label>
          Sale Date
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className='action-buttons-sale'>
        <button className="btn-filled confirm-btn" onClick={handleSell}>Confirm Sale</button>
        <button className="btn-outline cancel-btn" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default SellAssetPage;