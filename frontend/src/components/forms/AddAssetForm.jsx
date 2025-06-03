// src/components/forms/AddAssetForm.jsx
import React from "react";
import "./AddAssetForm.css";

const AddAssetForm = ({ values, onChange, showTypeSelect = false , disableIdentityFields=false }) => {
  const disableName = !!values.name && values.name.trim().length > 0;
  const disableSymbol = !!values.symbol && values.symbol.trim().length > 0;

  return (
    <form className="add-asset-form">
      <h2>Basic Information</h2>

      <label>
        Name
        <input
          type="text"
          name="name"
          placeholder="e.g. Apple Inc"
          value={values.name}
          onChange={onChange}
          disabled={disableIdentityFields}
        />
      </label>

      <label>
        Symbol
        <input
          type="text"
          name="symbol"
          placeholder="e.g. AAPL"
          value={values.symbol}
          onChange={onChange}
          disabled={disableIdentityFields}
        />
      </label>

      {showTypeSelect && (
        <label>
          Type
          <select
            name="type"
            value={values.type}
            onChange={onChange}
            required
            className={`select-type ${values.type}`} 
          >
            <option value="stock">Stock</option>
            <option value="crypto">Crypto</option>
            <option value="bond">Bond</option>
          </select>
        </label>
      )}

      <label>
        Quantity
        <input
          type="number"
          name="quantity"
          placeholder="e.g. 10"
          value={values.quantity}
          onChange={onChange}
          required
          min="0"
        />
      </label>

      <label>
        Purchase Price (per unit)
        <input
          type="number"
          name="purchasePrice"
          placeholder="e.g. 150.50"
          value={values.purchasePrice}
          onChange={onChange}
          required
          min="0"
        />
      </label>

      <label>
        Purchase Date
        <input
          type="date"
          name="purchaseDate"
          value={values.purchaseDate}
          onChange={onChange}
          required
        />
      </label>
    </form>
  );
};

export default AddAssetForm;