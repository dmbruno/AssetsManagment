// src/features/transactions/TransactionsList.jsx
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadTransactions } from './transactionsSlice'

const TransactionsList = () => {
  const dispatch = useDispatch()
  const { list, status } = useSelector((state) => state.transactions)

  useEffect(() => {
    dispatch(loadTransactions())
  }, [dispatch])

  if (status === 'loading') return <p>Cargando transacciones...</p>
  if (status === 'failed') return <p>Error al cargar transacciones</p>

  return (
    <ul>
      {list.map((t) => (
        <li key={t.id}>
          {t.type.toUpperCase()} - {t.quantity} @ ${t.price} (Asset ID: {t.asset_id})
        </li>
      ))}
    </ul>
  )
}

export default TransactionsList