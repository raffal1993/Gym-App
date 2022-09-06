import { RootState, state } from 'app/store';
import { PreloadedState } from '@reduxjs/toolkit';

export const mockedReduxState = ({
  interfaceState,
  pagesState,
  userState,
  foodState,
}: {
  interfaceState?: Partial<PreloadedState<RootState>['interface']>;
  pagesState?: Partial<PreloadedState<RootState>['pages']>;
  userState?: Partial<PreloadedState<RootState>['user']>;
  foodState?: Partial<PreloadedState<RootState>['food']>;
} = {}) => {
  return {
    ...state,
    interface: { ...state.interface, ...interfaceState },
    pages: { ...state.pages, ...pagesState },
    user: { ...state.user, ...userState },
    food: { ...state.food, ...foodState },
  };
};
