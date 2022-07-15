import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { mount, MountRendererProps, shallow, ShallowRendererProps } from 'enzyme';
import { Provider } from 'react-redux';
import { AppStore, rootReducer, RootState } from 'app/store';
import GlobalThemeProvider from './globalTheme-utils';

interface ReduxOptions {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

interface ShallowRenderOptions extends ReduxOptions, ShallowRendererProps {}
interface MountRenderOptions extends ReduxOptions, MountRendererProps {}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'>, ReduxOptions {}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: rootReducer,
      preloadedState,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ['interface/setModalOpen'],
            ignoredPaths: ['interface.modalContent'],
          },
        }),
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <GlobalThemeProvider>{children}</GlobalThemeProvider>
      </Provider>
    );
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

export function shallowWithProviders(
  ui: React.ReactNode,
  {
    preloadedState = {},
    store = configureStore({
      reducer: rootReducer,
      preloadedState,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ['interface/setModalOpen'],
            ignoredPaths: ['interface.modalContent'],
          },
        }),
    }),
    ...renderOptions
  }: ShallowRenderOptions = {},
) {
  return shallow(
    <Provider store={store}>
      <GlobalThemeProvider>{ui}</GlobalThemeProvider>
    </Provider>,
    { ...renderOptions },
  );
}

export function mountWithProviders(
  ui: React.ReactNode,
  {
    preloadedState = {},
    store = configureStore({
      reducer: rootReducer,
      preloadedState,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ['interface/setModalOpen'],
            ignoredPaths: ['interface.modalContent'],
          },
        }),
    }),
    ...renderOptions
  }: MountRenderOptions = {},
) {
  return mount(
    <Provider store={store}>
      <GlobalThemeProvider>{ui}</GlobalThemeProvider>
    </Provider>,
    { ...renderOptions },
  );
}
