import { authFetch } from '../../app/api';

export async function fetchTransactions(Id) {
  const response = await authFetch(`/transacciones?user_id=${Id}`);
  if (!response.ok) {
    throw new Error('Error al obtener transacciones');
  }

  const txData = await response.json();
  
  return txData;
}

export async function createTransaction(data) {
  const response = await authFetch('/transacciones', {
    method: 'POST',
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Error al agregar transacción');
  }
  return await response.json();
}

export async function deleteTransactionById(id) {
  const response = await authFetch(`/transacciones/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Error al eliminar la transacción');
  }

  return true;
}

export async function updateTransaction(id, data) {
  const response = await authFetch(`/transacciones/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Error updating transaction');
  }

  return await response.json();
}