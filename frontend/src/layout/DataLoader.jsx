import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAssets, clearAssets } from '../features/assets/assetsSlice';
import { loadTransactions, clearTransactions } from '../features/transactions/transactionsSlice';
import { Outlet } from 'react-router-dom';
import FooterNav from '../components/layout/FooterNav';

const DataLoader = () => {
  const dispatch = useDispatch();
  const assetsStatus = useSelector((state) => state.assets.status);
  const txStatus = useSelector((state) => state.transactions.status);
  const currentUser = useSelector((state) => state.users.currentUser);

  useEffect(() => {
    if (!currentUser) return;

    // Limpiar datos viejos al cambiar de usuario
    dispatch(clearAssets());
    dispatch(clearTransactions());

    // Volver a cargar los datos correctos del usuario logueado
    dispatch(loadAssets());
    dispatch(loadTransactions());
  }, [currentUser, dispatch]);

  const isLoading = assetsStatus !== 'succeeded' || txStatus !== 'succeeded';

  if (!currentUser) {
    return <p style={{ textAlign: 'center' }}>Por favor inicia sesión para continuar.</p>;
  }

  if (assetsStatus === 'failed' || txStatus === 'failed') {
    return (
      <div style={{ textAlign: 'center', color: 'red' }}>
        <p>❌ Error al cargar datos. Verifica tu conexión o vuelve a iniciar sesión.</p>
        <button onClick={() => { dispatch(loadAssets()); dispatch(loadTransactions()); }}>
          Reintentar
        </button>
      </div>
    );
  }

  if (isLoading) return <p style={{ textAlign: 'center' }}>🔄 Cargando datos...</p>;

  return (
    <div className="main-layout">
      <Outlet />
      <FooterNav />
    </div>
  );
};

export default DataLoader;