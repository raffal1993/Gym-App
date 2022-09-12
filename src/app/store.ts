import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import { handleOnMainPageChange } from './subscribe';
import interfaceReducer from './slices/interfaceSlice';
import userReducer from './slices/userSlice';
import pagesReducer from './slices/pagesSlice';
import foodReducer from './slices/foodSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  interface: interfaceReducer,
  pages: pagesReducer,
  food: foodReducer,
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

export const store = setupStore();

export type Store = typeof store;

store.subscribe(() => handleOnMainPageChange(store));

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
