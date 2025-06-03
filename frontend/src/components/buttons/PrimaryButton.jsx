// src/components/buttons/PrimaryButton.jsx
import React from "react";
import "./Button.css";

const PrimaryButton = ({ text, onClick, className = "" }) => (
  <button className={`primary-button ${className}`} onClick={onClick}>
    {text}
  </button>
);

export default PrimaryButton;