// src/app/store.js
import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/users/usersSlice'
import assetsReducer from '../features/assets/assetsSlice'
import transactionsReducer from '../features/transactions/transactionsSlice'


export const store = configureStore({
  reducer: {
    users: usersReducer,
    assets: assetsReducer,
    transactions: transactionsReducer
  }
})