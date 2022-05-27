import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SidebarListProps } from 'components/Molecules/Sidebar/SidebarTypes';
import { getLocalStorage, updateLocalStorage } from 'helpers/localStorage';

const getInitialPage = (page: string) => {
  if (window.location.pathname === '/dashboard') return '';
  return getLocalStorage('pages', page) || '';
};

interface PagesState {
  mainPage?: string;
  subPageID?: string;
  sidebarList?: SidebarListProps[] | [];
}
const initialState: PagesState = {
  mainPage: getInitialPage('mainPage'),
  subPageID: getInitialPage('subPageID'),
  sidebarList: [],
};

export const interfaceSlice = createSlice({
  name: 'pages',
  initialState,

  reducers: {
    setMainPage: (state, action: PayloadAction<typeof initialState.mainPage>) => {
      state.mainPage = action.payload;

      updateLocalStorage('pages', { mainPage: action.payload });
    },

    setSubPageID: (state, action: PayloadAction<typeof initialState.subPageID>) => {
      state.subPageID = action.payload;

      updateLocalStorage('pages', { subPageID: action.payload });
    },

    setSidebarList: (state, action: PayloadAction<typeof initialState.sidebarList>) => {
      state.sidebarList = action.payload;
    },
  },
});

export const { setMainPage, setSubPageID, setSidebarList } = interfaceSlice.actions;

export default interfaceSlice.reducer;
