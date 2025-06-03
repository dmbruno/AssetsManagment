// src/pages/EditAsset/EditAssetPage.jsx
import React, { useState, useEffect } from "react";
import AddAssetForm from "../../components/forms/AddAssetForm";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import CancelButton from "../../components/buttons/CancelButton";
import AssetTopBar from "../../components/layout/AssetTopBar";
import "./EditAssetPage.css"; // ✅ IMPORTAR
import { useNavigate, useParams } from "react-router-dom";

const EditAssetPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formValues, setFormValues] = useState({
        name: "",
        symbol: "",
        quantity: "",
        purchasePrice: "",
        purchaseDate: "",
    });

    useEffect(() => {
        // Simular carga de datos existentes
        const existingAsset = {
            id,
            name: "Apple Inc.",
            symbol: "AAPL",
            quantity: 10,
            purchasePrice: 150.0,
            purchaseDate: "2025-04-01",
        };
        setFormValues(existingAsset);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        console.log("Edited asset:", formValues);
        navigate(`/assets/${id}`);
    };

    const handleCancel = () => {
        navigate(`/assets/${id}`);
    };

    return (
        <div className="edit-asset-page">
            <div className="edit-asset-header">
                <AssetTopBar symbol={formValues.symbol} showActions={false} />
            </div>

            <div className="edit-asset-form">
                <AddAssetForm values={formValues} onChange={handleChange} />
            </div>
            <div className="buttons-container-summary">
                <PrimaryButton label="Save Changes" onClick={handleSave} />
                <CancelButton label="Cancel" onClick={handleCancel} />
            </div>
        </div>
    );
};

export default EditAssetPage;