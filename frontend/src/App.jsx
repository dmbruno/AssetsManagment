// src/App.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import MainLayout from './layout/MainLayout'
import DataLoader from './layout/DataLoader'

import Portfolio from './pages/Portfolio/PortfolioPage'
import AddAssetPage from './pages/AddAsset/AddAssetPage'
import AssetDetailsPage from './pages/AssetDetails/AssetDetailsPage'
import AssetHistoricViewPage from './pages/AssetHistoric/AssetHistoricViewPage'
import SellAssetPage from './pages/SellAsset/SellAssetPage'
import EditAssetPage from './pages/EditAsset/EditAssetPage'
import DeleteAssetPage from './pages/DeleteAsset/DeleteAssetPage'
import AddTransactionPage from './pages/AddTransaction/AddTransactionPage'
import GlobalTransactionHistoryPage from './pages/TransactionHistory/GlobalTransactionHistoryPage'
import EditTransactionPage from './pages/EditTransactions/EditTransactionPage'
import LoginPage from './pages/Login/LoginPage'
import RegisterPage from './pages/Login/RegisterPage'
import UsersListPage from './pages/Users/UsersListPage'
import PrivateRoute from './routes/PrivateRoute'

function App() {
  return (
    <Routes>
      {/* Rutas públicas: NO envueltas por DataLoader ni MainLayout */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/register/:id" element={<RegisterPage />} />

      {/* Rutas privadas: envueltas por DataLoader y MainLayout */}
      <Route element={<DataLoader />}>
        <Route element={<MainLayout />}>
          <Route path="/usuarios" element={<PrivateRoute><UsersListPage /></PrivateRoute>} />
          <Route path="/portfolio" element={<PrivateRoute><Portfolio /></PrivateRoute>} />
          <Route path="/add" element={<PrivateRoute><AddAssetPage /></PrivateRoute>} />
          <Route path="/assets/:id" element={<PrivateRoute><AssetDetailsPage /></PrivateRoute>} />
          <Route path="/assets/:id/historic" element={<PrivateRoute><AssetHistoricViewPage /></PrivateRoute>} />
          <Route path="/assets/:id/sell" element={<PrivateRoute><SellAssetPage /></PrivateRoute>} />
          <Route path="/assets/:id/edit" element={<PrivateRoute><EditAssetPage /></PrivateRoute>} />
          <Route path="/assets/:id/delete" element={<PrivateRoute><DeleteAssetPage /></PrivateRoute>} />
          <Route path="/assets/:id/add" element={<PrivateRoute><AddTransactionPage /></PrivateRoute>} />
          <Route path="/transactions" element={<PrivateRoute><GlobalTransactionHistoryPage /></PrivateRoute>} />
          <Route path="/transactions/:id/edit" element={<PrivateRoute><EditTransactionPage /></PrivateRoute>} />
          <Route path="/" element={<Navigate to="/portfolio" />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App