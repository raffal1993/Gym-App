import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SidebarListProps } from 'components/Molecules/Sidebar/SidebarTypes';
import { getLocalStorage, updateLocalStorage } from 'helpers/localStorage';

const getInitialPage = () => {
  const lookingPage = 'mainPage';
  const page = getLocalStorage('pages');
  if (!(lookingPage in page)) return '';
  return page[lookingPage];
};

interface PagesState {
  mainPage: string;
  subPageID: string;
  sidebarList: SidebarListProps[];
}
const initialState: PagesState = {
  mainPage: getInitialPage(),
  subPageID: '',
  sidebarList: [],
};

export const interfaceSlice = createSlice({
  name: 'pages',
  initialState,

  reducers: {
    setMainPage: (state, action: PayloadAction<PagesState['mainPage']>) => {
      state.mainPage = action.payload;

      updateLocalStorage('pages', { mainPage: action.payload });
    },

    setSubPageID: (state, action: PayloadAction<PagesState['subPageID']>) => {
      state.subPageID = action.payload;
    },

    setSidebarList: (state, action: PayloadAction<PagesState['sidebarList']>) => {
      state.sidebarList = action.payload;
    },
  },
});

export const { setMainPage, setSubPageID, setSidebarList } = interfaceSlice.actions;

export default interfaceSlice.reducer;
