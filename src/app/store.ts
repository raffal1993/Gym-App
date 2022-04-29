import { configureStore } from '@reduxjs/toolkit';
import interfaceReducer from './slices/interfaceSlice';
import userReducer from './slices/userSlice';
import pagesReducer from './slices/pagesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    interface: interfaceReducer,
    pages: pagesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['interface/setModalOpen'],
        ignoredPaths: ['interface.modalContent'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
