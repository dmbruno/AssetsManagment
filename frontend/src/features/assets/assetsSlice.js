import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAssets } from './assetsApi';

// 🔄 Acción asincrónica para cargar los activos del usuario actual
export const loadAssets = createAsyncThunk(
  'assets/fetchAll',
  async (_, { getState }) => {
    const userId = getState().users.currentUser?.id;
    return await fetchAssets(userId);
  }
);

const assetsSlice = createSlice({
  name: 'assets',
  initialState: {
    list: [],
    status: 'idle'
  },
  reducers: {
    clearAssets: (state) => {
      state.list = [];
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAssets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadAssets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(loadAssets.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

// ✅ Exportaciones necesarias
export const { clearAssets } = assetsSlice.actions;
export default assetsSlice.reducer;