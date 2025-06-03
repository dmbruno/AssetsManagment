import React from "react";
import { useSelector } from "react-redux";
import "./PortfolioSummary.css";

const PortfolioSummary = () => {
  const rawAssets = useSelector((state) => state.assets.list);
  const assets = rawAssets.filter((a) => a.quantity > 0);
  

  const totalCurrentValue = assets.reduce(
    (acc, a) => acc + (a.current_price || 0) * (a.quantity || 0),
    0
  );

  const totalInvestedValue = assets.reduce(
    (acc, a) => acc + (a.purchasePrice || 0) * (a.quantity || 0),
    0
  );

  const difference = totalCurrentValue - totalInvestedValue;

  const percentageChange =
    totalInvestedValue > 0
      ? (difference / totalInvestedValue) * 100
      : 0;

  const isPositive = percentageChange >= 0;

  const counts = {
    stock: assets.filter((a) => a.type === "stock").length,
    bond: assets.filter((a) => a.type === "bond").length,
    crypto: assets.filter((a) => a.type === "crypto").length,
  };

  return (
    <div className="portfolio-summary">
      <div className="summary-header">
        <h2>Portfolio Summary</h2>
        <span>{assets.length} assets</span>
      </div>

      <div className="total-value">
        <p>Total Value</p>
        <h1>${totalCurrentValue.toFixed(2)}</h1>
        <div className="conteiner-change">
          <span className={`change ${isPositive ? "positive" : "negative"}`}>
            {isPositive ? "▲" : "▼"} {percentageChange.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="distribution">
        <div><span className="dot stock" /> Stocks: {counts.stock}</div>
        <div><span className="dot bond" /> Bonds: {counts.bond}</div>
        <div><span className="dot crypto" /> Crypto: {counts.crypto}</div>
      </div>
    </div>
  );
};

export default PortfolioSummary;