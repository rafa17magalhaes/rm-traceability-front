import { configureStore } from '@reduxjs/toolkit';
import companiesReducer from './slices/companiesSlice';
import usersReducer from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    companies: companiesReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
