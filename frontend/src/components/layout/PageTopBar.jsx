// PageTopBar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import './PageTopBar.css';

const PageTopBar = ({ title }) => {
  const navigate = useNavigate();

  return (
    <header className="page-top-bar-clean">
      <button onClick={() => navigate(-1)} className="icon-button-clean" aria-label="Back">
        <FaChevronLeft />
      </button>
      <h1 className="page-title-clean">{title}</h1>
      <span className="icon-placeholder-clean" />
    </header>
  );
};

export default PageTopBar;