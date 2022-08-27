import { RootState, state } from 'app/store';
import { PreloadedState } from '@reduxjs/toolkit';

export const mockedReduxState = ({
  interfaceState,
  pagesState,
  userState,
}: {
  interfaceState?: Partial<PreloadedState<RootState>['interface']>;
  pagesState?: Partial<PreloadedState<RootState>['pages']>;
  userState?: Partial<PreloadedState<RootState>['user']>;
} = {}) => {
  return {
    ...state,
    interface: { ...state.interface, ...interfaceState },
    pages: { ...state.pages, ...pagesState },
    user: { ...state.user, ...userState },
  };
};
