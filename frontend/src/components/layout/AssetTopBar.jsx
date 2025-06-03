import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import './AssetTopBar.css';

const AssetTopBar = ({ symbol = true }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    return (
        <div className="asset-top-bar">
            <button onClick={() => navigate(-1)} className="icon-button">
                <FaArrowLeft style={{ fontSize: "18px", color: "black" }}/>
            </button>
            <span className="asset-symbol">{symbol}</span>
            
        </div>
    );
};

export default AssetTopBar;