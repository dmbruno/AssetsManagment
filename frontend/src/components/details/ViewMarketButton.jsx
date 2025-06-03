import React from 'react';
import './ViewMarketButton.css';

const ViewMarketButton = ({ text, onClick }) => (
  <div className='conteiner-button-view-market'>
    <button className="view-market-button" onClick={onClick}>
      {text}
    </button>
  </div>
);

export default ViewMarketButton;