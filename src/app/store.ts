import { configureStore } from '@reduxjs/toolkit';
import interfaceReducer from './slices/interfaceSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    interface: interfaceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
