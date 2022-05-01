import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SidebarListProps } from 'components/Molecules/Sidebar/SidebarProps';
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
    setMainPage: (state, action: PayloadAction<PagesState>) => {
      state.mainPage = action.payload.mainPage;

      updateLocalStorage('pages', { mainPage: action.payload.mainPage });
    },

    setSubPageID: (state, action: PayloadAction<PagesState>) => {
      state.subPageID = action.payload.subPageID;

      updateLocalStorage('pages', { subPageID: action.payload.subPageID });
    },

    setSidebarList: (state, action: PayloadAction<PagesState>) => {
      state.sidebarList = action.payload.sidebarList;
    },
  },
});

export const { setMainPage, setSubPageID, setSidebarList } = interfaceSlice.actions;

export default interfaceSlice.reducer;
