import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import './PortfolioPieChart.css';

Chart.register(ArcElement, Tooltip, Legend);

const COLORS = {
  Stock: '#2563eb',
  Bond: '#059669',
  Crypto: '#a21caf',
};

function getDistribution(assets) {
  const total = assets.reduce((sum, a) => sum + a.current_price * a.quantity, 0);
  const groups = { Stock: 0, Bond: 0, Crypto: 0 };
  assets.forEach(a => {
    const type = a.type.charAt(0).toUpperCase() + a.type.slice(1).toLowerCase();
    if (groups[type] !== undefined) {
      groups[type] += a.current_price * a.quantity;
    }
  });
  return {
    labels: Object.keys(groups),
    values: Object.values(groups),
    percentages: Object.values(groups).map(v => total ? (v / total * 100).toFixed(1) : 0),
    colors: Object.keys(groups).map(type => COLORS[type]),
  };
}

const PortfolioPieChart = ({ assets }) => {
  const { labels, values, percentages, colors } = getDistribution(assets);
  const data = {
    labels: labels.map((l, i) => `${l} (${percentages[i]}%)`),
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="portfolio-pie-chart horizontal-card">
      <div className="piechart-left">
        <Pie
          data={data}
          options={{
            plugins: { legend: { display: false } },
            maintainAspectRatio: false,
            responsive: true,
          }}
          width={110}
          height={110}
        />
      </div>
      <div className="piechart-legend">
        {labels.map((label, i) => (
          <div className="legend-item" key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              className="legend-color"
              style={{ backgroundColor: colors[i] }}
            ></span>
            <span className="legend-label" style={{ fontSize: 13 }}>{label}</span>
            <span className="legend-percent" style={{ fontSize: 13 }}>{percentages[i]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioPieChart;
