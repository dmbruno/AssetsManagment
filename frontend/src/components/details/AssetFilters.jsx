// src/components/ui/AssetFilters.jsx
import React from 'react';
import './AssetFilters.css';

const filters = ['All', 'Stocks', 'Bonds', 'Crypto'];

const AssetFilters = ({ searchTerm, setSearchTerm, activeFilter, setActiveFilter }) => {
  return (
    <div className="asset-filters-container">
      <input
        className="search-input"
        type="text"
        placeholder="Search assets..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="filters-row">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${activeFilter === filter ? 'active' : ''} ${filter.toLowerCase()}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AssetFilters;