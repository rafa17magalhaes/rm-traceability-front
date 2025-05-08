import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import companiesReducer from './slices/companiesSlice';
import usersReducer from './slices/usersSlice';
import resourcesReducer from './slices/resourcesSlice';
import codesReducer from './slices/codesSlice';
import statusesReducer from './slices/statusesSlice';
import eventsReducer from './slices/eventsSlice';
import notificationsReducer from './slices/notificationsSlice';
import permissionsReducer from './slices/permissionsSlice';
import chatReducer from './slices/chatSlice';

const rootReducer = combineReducers({
  companies: companiesReducer,
  users: usersReducer,
  resources: resourcesReducer,
  codes: codesReducer,
  statuses: statusesReducer,
  events: eventsReducer,
  notifications: notificationsReducer,
  permissions: permissionsReducer,
  chat: chatReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
