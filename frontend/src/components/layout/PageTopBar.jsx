// src/components/layout/PageTopBar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import './PageTopBar.css';

const PageTopBar = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="page-top-bar">
      <button onClick={() => navigate(-1)} className="icon-button">
        <FaArrowLeft style={{ fontSize: "18px", color: "black"}} />
      </button>
      <span className="page-title">{title}</span>
      <span className="icon-placeholder" />
    </div>
  );
};

export default PageTopBar;