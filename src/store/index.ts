import { configureStore } from '@reduxjs/toolkit';
import companiesReducer from './slices/companiesSlice';
import usersReducer from './slices/usersSlice';
import resourcesReducer from './slices/resourcesSlice';

export const store = configureStore({
  reducer: {
    companies: companiesReducer,
    users: usersReducer,
    resources: resourcesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
