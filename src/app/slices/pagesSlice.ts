import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const getInitialPage = (page: string) => {
  if (window.location.pathname === '/dashboard') return '';
  return JSON.parse(localStorage.getItem('pages') || '')[page];
};

interface PagesState {
  mainPage?: string;
  subPage?: string;
}
const initialState: PagesState = {
  mainPage: getInitialPage('mainPage'),
  subPage: getInitialPage('subPage'),
};

export const interfaceSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    setPages: (state, action: PayloadAction<PagesState>) => {
      action.payload.mainPage && (state.mainPage = action.payload.mainPage);
      action.payload.subPage && (state.subPage = action.payload.subPage);

      localStorage.setItem(
        'pages',
        JSON.stringify({
          mainPage: action.payload.mainPage || state.mainPage,
          subPage: action.payload.subPage || state.subPage,
        }),
      );
    },
  },
});

export const { setPages } = interfaceSlice.actions;

export default interfaceSlice.reducer;
