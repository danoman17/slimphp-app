import { configureStore } from '@reduxjs/toolkit';
import { authSlice, ventasSlice } from './';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ventas: ventasSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});