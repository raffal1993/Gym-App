import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import interfaceReducer from './slices/interfaceSlice';
import userReducer from './slices/userSlice';
import pagesReducer from './slices/pagesSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  interface: interfaceReducer,
  pages: pagesReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['interface/setModalOpen'],
          ignoredPaths: ['interface.modalContent'],
        },
      }),
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
