import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { loadAssets } from '../../features/assets/assetsSlice';
import './CurrentPriceCard.css';
import { authFetch } from '../../app/api';

const CurrentPriceCard = ({ assetId, currentPrice }) => {
  const [price, setPrice] = useState(currentPrice);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const handleSave = async () => {
    const parsed = parseFloat(price);
    if (isNaN(parsed) || parsed <= 0) {
      alert("Enter a valid positive price");
      return;
    }

    try {
      console.log("📤 Sending price:", parsed);
      const response = await authFetch(`/activos/${assetId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current_price: parsed })
      });

      if (!response.ok) throw new Error("Failed to update");

      dispatch(loadAssets());
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error('Error updating price:', err);
      alert("Failed to save price.");
    }
  };

  return (
    <div className="current-price-card">
      <p className="label">Current Price</p>
      <div className="price-edit-row">
        <div className={`price-input-wrapper ${editing ? 'editing' : ''}`}>
          <span className="currency-symbol">$</span>
          <input
            ref={inputRef}
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={!editing}
            className="price-input"
          />
        </div>

        {!editing ? (
          <button onClick={() => setEditing(true)}>✏️</button>
        ) : (
          <button onClick={handleSave}>💾</button>
        )}

        {saved && <span className="save-confirm">✔️ Guardado</span>}
      </div>
    </div>
  );
};

export default CurrentPriceCard;