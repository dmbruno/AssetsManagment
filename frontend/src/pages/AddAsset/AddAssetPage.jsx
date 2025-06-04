// src/pages/AddAsset/AddAssetPage.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddAssetForm from "../../components/forms/AddAssetForm";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import CancelButton from "../../components/buttons/CancelButton";
import PageTopBar from "../../components/layout/PageTopBar";
import { loadAssets } from "../../features/assets/assetsSlice";
import { loadTransactions } from "../../features/transactions/transactionsSlice";
import "./AddAssetPage.css";

const AddAssetPage = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    symbol: "",
    type: "stock",
    quantity: "",
    purchasePrice: "",
    purchaseDate: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.users.currentUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = async () => {
    if (!currentUser) {
      alert("Usuario no autenticado.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to add the asset "${formValues.name}" (${formValues.symbol}) with quantity ${formValues.quantity}?`
    );

    if (!confirmed) return;

    try {
      const assetResponse = await authFetch("/activos/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: currentUser.id,  // ✅ dinámico
          name: formValues.name,
          symbol: formValues.symbol,
          type: formValues.type,
          current_price: parseFloat(formValues.purchasePrice),
        }),
      });

      if (!assetResponse.ok) throw new Error("Error al crear el activo");
      const asset = await assetResponse.json();

      const txResponse = await authFetch("/transacciones/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: currentUser.id,  // ✅ dinámico
          asset_id: asset.id,
          quantity: parseFloat(formValues.quantity),
          price: parseFloat(formValues.purchasePrice),
          type: "buy",
          date: formValues.purchaseDate,
        }),
      });

      if (!txResponse.ok) throw new Error("Error al registrar transacción");

      await dispatch(loadAssets()).unwrap();
      await dispatch(loadTransactions()).unwrap();

      navigate("/portfolio");
    } catch (err) {
      console.error("❌ Error al agregar activo:", err);
      alert("Error al guardar activo.");
    }
  };

  const handleCancel = () => {
    navigate("/portfolio");
  };

  return (
    <div className="add-asset-container">
      <PageTopBar title="Add Asset" />

      <div className="page-scrollable-content">
        <AddAssetForm
          onChange={handleChange}
          values={formValues}
          showTypeSelect={true}
          disableIdentityFields={false}
        />

        <div className="add-asset-buttons">
          <PrimaryButton text="Add Asset" onClick={handleAdd} />
          <CancelButton text="Cancel" onClick={handleCancel} />
        </div>
      </div>
    </div>
  );
};

export default AddAssetPage;