// src/features/users/usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchUsers } from './usersApi'

export const loadUsers = createAsyncThunk('users/fetchAll', fetchUsers)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    status: 'idle'
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload
    },
    logoutUser: (state) => {
      state.currentUser = null
      localStorage.removeItem('currentUser');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
      })
      .addCase(loadUsers.rejected, (state) => {
        state.status = 'failed'
      })
  }
})

export const { setCurrentUser, logoutUser } = usersSlice.actions
export default usersSlice.reducer