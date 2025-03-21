import { configureStore } from '@reduxjs/toolkit';
import companiesReducer from './slices/companiesSlice';
import usersReducer from './slices/usersSlice';
import resourcesReducer from './slices/resourcesSlice';
import codesReducer from './slices/codesSlice';
import statusesReducer from './slices/statusesSlice';
import eventsReducer from './slices/eventsSlice';
import notificationsReducer from './slices/notificationsSlice';

export const store = configureStore({
  reducer: {
    companies: companiesReducer,
    users: usersReducer,
    resources: resourcesReducer,
    codes: codesReducer,
    statuses: statusesReducer,
    events: eventsReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
