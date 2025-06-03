import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { fetchTransactions, createTransaction, deleteTransactionById } from './transactionsApi';
import { updateTransaction as updateTransactionApi } from './transactionsApi';



export const loadTransactions = createAsyncThunk('transactions/fetchAll', async (_, { getState }) => {
  const userId = getState().users.currentUser?.id;
  return await fetchTransactions(userId);
});

export const addTransaction = createAsyncThunk(
  'transactions/add',
  async (txData, { rejectWithValue }) => {
    try {
      const response = await createTransaction(txData);
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    list: [],
    status: 'idle',
    error: null
  },
  reducers: {
    clearTransactions: (state) => {
      state.list = [];
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(deleteTransaction.fulfilled, (state, action) => {
      state.list = state.list.filter(tx => tx.id !== action.payload);
    })
    .addCase(loadTransactions.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(loadTransactions.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.list = action.payload;
    })
    .addCase(loadTransactions.rejected, (state) => {
      state.status = 'failed';
    })
    .addCase(updateTransaction.fulfilled, (state, action) => {
      const index = state.list.findIndex(tx => tx.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    })
    .addCase(addTransaction.fulfilled, (state, action) => {
      state.list.push(action.payload); 
    });
    
  }
});

// 🔍 Selector agrupado
export const selectTransactionsGroupedByAsset = createSelector(
  state => state.transactions.list,
  (transactions) => {
    const grouped = {};
    transactions.forEach(tx => {
      if (!grouped[tx.asset_id]) {
        grouped[tx.asset_id] = [];
      }
      grouped[tx.asset_id].push(tx);
    });
    return grouped;
  }
);



export const selectTransactionsEnriched = createSelector(
  [state => state.transactions.list, state => state.assets.list],
  (transactions, assets) =>
    transactions.map(tx => {
      const asset = assets.find(a => a.id === tx.asset_id);
      if (!asset) {
        console.warn('Asset not found for transaction', tx);
      }
      return {
        ...tx,
        asset_name: asset?.name || 'Unknown',
        asset_symbol: asset?.symbol || '??',
        asset_type: asset?.type || 'unknown'
      };
    })
  );

  
  
  export const deleteTransaction = createAsyncThunk(
    'transactions/delete',
    async (id, { rejectWithValue }) => {
      try {
        await deleteTransactionById(id);
        return id;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );
  
  
  export const updateTransaction = createAsyncThunk(
    'transactions/update',
    async ({ id, ...data }, { rejectWithValue }) => {
      try {
        const response = await updateTransactionApi(id, data);
        return response;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

  export const selectTransactionsByAsset = (assetId) =>
    createSelector(
      [state => state.transactions.list],
      (transactions) =>
        transactions.filter(tx => tx.asset_id === assetId)
    );
  
  
  export const { clearTransactions } = transactionsSlice.actions;
  export default transactionsSlice.reducer;