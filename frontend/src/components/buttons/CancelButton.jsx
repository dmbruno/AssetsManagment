// src/components/buttons/CancelButton.jsx
import React from "react";
import "./Button.css";

const CancelButton = ({ text, onClick, className = "" }) => (
  <button className={`cancel-button ${className}`} onClick={onClick}>
    {text}
  </button>
);

export default CancelButton;