// src/pages/EditTransaction/EditTransactionPage.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import AddAssetForm from "../../components/forms/AddAssetForm";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import CancelButton from "../../components/buttons/CancelButton";
import AssetTopBar from "../../components/layout/AssetTopBar";
import { loadAssets } from "../../features/assets/assetsSlice";
import { loadTransactions } from "../../features/transactions/transactionsSlice";
import { authFetch } from "../../utils/authFetch"; // Asegúrate de importar authFetch

const EditTransactionPage = () => {
    const { id } = useParams(); // id de la transacción
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const transaction = useSelector(state =>
        state.transactions.list.find(tx => tx.id === Number(id))
    );

    const asset = useSelector(state =>
        state.assets.list.find(a => a.id === transaction?.asset_id)
    );

    const [formValues, setFormValues] = useState({
        name: "",
        symbol: "",
        quantity: "",
        purchasePrice: "",
        purchaseDate: ""
    });

    useEffect(() => {
        if (transaction && asset) {
            setFormValues({
                name: asset.name,
                symbol: asset.symbol,
                quantity: transaction.quantity,
                purchasePrice: transaction.price,
                purchaseDate: transaction.date.slice(0, 10) // formato yyyy-mm-dd
            });
        }
    }, [transaction, asset]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        const updated = {
            ...transaction,
            quantity: parseFloat(formValues.quantity),
            price: parseFloat(formValues.purchasePrice),
            date: formValues.purchaseDate
        };

        try {
            const response = await authFetch(`/transacciones/${transaction.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updated)
            });

            if (!response.ok) throw new Error('Failed to update');

            await dispatch(loadTransactions());
            await dispatch(loadAssets());

            navigate(`/assets/${transaction.asset_id}`);
        } catch (error) {
            console.error("❌ Error al actualizar:", error);
            alert("No se pudo actualizar la transacción.");
        }
    };

    const handleCancel = () => {
        navigate(`/assets/${transaction.asset_id}`);
    };

    if (!transaction || !asset) return <p>Loading...</p>;

    return (
        <div className="add-transaction-page">
            <div className="add-transaction-body">
                <AssetTopBar symbol={formValues.symbol} />
                <h1>Edit Transaction</h1>
                <AddAssetForm
                    onChange={handleChange}
                    values={formValues}
                    showTypeSelect={false}
                    disableIdentityFields={true}
                />
                <div className="add-transaction-buttons">
                    <PrimaryButton text="Update" onClick={handleUpdate} />
                    <CancelButton text="Cancel" onClick={handleCancel} />
                </div>
            </div>
        </div>
    );
};

export default EditTransactionPage;