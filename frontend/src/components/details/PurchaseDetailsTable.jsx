// src/components/details/PurchaseDetailsTable.jsx
import React from 'react';
import './PurchaseDetailsTable.css';

const PurchaseDetailsTable = ({ transactions }) => (
  <div className="purchase-details-table">
    <h3>Purchases and sales details</h3>
    <h5 className="subtitle-purchases">All Transactions</h5>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx, i) => {
          const rowClass = tx.type === 'sell' ? 'sell-row' : 'buy-row';
          const total = (tx.price * tx.quantity).toFixed(2);
          const type = tx.type.toUpperCase();

          return (
            <tr key={i} className={rowClass}>
              <td>{tx.date}</td>
              <td>{type}</td>
              <td>${tx.price.toFixed(2)}</td>
              <td>{tx.quantity}</td>
              <td>${total}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default PurchaseDetailsTable;