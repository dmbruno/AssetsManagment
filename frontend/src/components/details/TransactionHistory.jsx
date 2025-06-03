// src/components/details/TransactionHistory.jsx
import React from "react";
import "./TransactionHistory.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const formatDate = (isoDate) => {
  const localDate = new Date(isoDate + 'T00:00:00');
  return new Intl.DateTimeFormat("es-AR", {
    year: "numeric",
    month: "long",
    day: "2-digit"
  }).format(localDate);
};

const TransactionHistory = ({ transactions, onEdit, onDelete }) => {
  return (
    <div className="transaction-history">
      <h3 className="section-title">Transaction History</h3>
      {[...transactions].reverse().map((tx, index) => {
        const isBuy = tx.type === "buy";
        const icon = isBuy ? "🟢" : "🔴";
        const typeClass = isBuy ? "buy" : "sell";

        return (
          <div className="transaction-card" key={index}>
            <div className="tx-header">
              <span className={`tx-type ${typeClass}`}>
                {icon} {tx.type}
              </span>
              <span className="tx-date">{formatDate(tx.date)}</span>
              <div className="tx-actions">
                <button className="icon-button" onClick={() => onEdit(tx)}><FaEdit /></button>
                <button className="icon-button delete" onClick={() => onDelete(tx)}><FaTrash /></button>
              </div>
            </div>
            <hr />
            <div className="tx-info-row">
              <span className="label muted">Quantity</span>
              <span className="value">
                {tx.quantity} {tx.symbol}
              </span>
            </div>
            <div className="tx-info-row">
              <span className="label muted">Purchase Price</span>
              <span className="value">${tx.price}</span>
            </div>
            <div className="tx-info-row">
              <span className="label muted">Total</span>
              <span className="value">${(tx.quantity * tx.price).toFixed(2)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionHistory;