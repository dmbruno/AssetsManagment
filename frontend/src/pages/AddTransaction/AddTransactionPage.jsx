// src/pages/AddTransaction/AddTransactionPage.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import AddAssetForm from "../../components/forms/AddAssetForm";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import CancelButton from "../../components/buttons/CancelButton";
import AssetTopBar from "../../components/layout/AssetTopBar";
import { loadAssets } from "../../features/assets/assetsSlice";
import { loadTransactions } from "../../features/transactions/transactionsSlice";
import './AddTransactionPage.css';

const AddTransactionPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.users.currentUser); // ✅ user actual
    const asset = useSelector(state =>
        state.assets.list.find(a => a.id === Number(id))
    );

    const [formValues, setFormValues] = useState({
        name: "",
        symbol: "",
        quantity: "",
        purchasePrice: "",
        purchaseDate: "",
    });

    useEffect(() => {
        if (asset) {
            setFormValues(prev => ({
                ...prev,
                name: asset.name,
                symbol: asset.symbol
            }));
        }
    }, [asset]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleAdd = async () => {
        if (!currentUser) {
            alert("Usuario no autenticado.");
            return;
        }

        const confirmed = window.confirm(
            `Are you sure you want to add a transaction for "${formValues.symbol}" with quantity ${formValues.quantity} at $${formValues.purchasePrice} per unit?`
        );

        if (!confirmed) return;

        const newTransaction = {
            user_id: currentUser.id,
            asset_id: Number(id),
            quantity: parseFloat(formValues.quantity),
            price: parseFloat(formValues.purchasePrice),
            type: "buy",
            date: formValues.purchaseDate
        };

        

        try {
            const response = await fetch('http://localhost:5001/transacciones/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTransaction)
            });

            if (!response.ok) {
                throw new Error('Error al guardar la transacción');
            }

            

            dispatch(loadTransactions());
            dispatch(loadAssets());

            navigate(`/assets/${id}`);
        } catch (error) {
            console.error("Fallo al agregar transacción:", error);
            alert("Hubo un problema al guardar la transacción.");
        }
    };

    const handleCancel = () => {
        navigate(`/assets/${id}`);
    };

    return (
        <div className="add-transaction-page">
            <div className="add-transaction-body">
                <AssetTopBar symbol={formValues.symbol} />
                <h1>Add Transaction</h1>
                <AddAssetForm
                    onChange={handleChange}
                    values={formValues}
                    showTypeSelect={false}
                    disableIdentityFields={true}
                />
                <div className="add-transaction-buttons">
                    <PrimaryButton text="Add Asset" onClick={handleAdd} />
                    <CancelButton text="Cancel" onClick={handleCancel} />
                </div>
            </div>
        </div>
    );
};

export default AddTransactionPage;