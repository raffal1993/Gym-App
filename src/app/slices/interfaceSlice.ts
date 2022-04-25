import { createSlice } from '@reduxjs/toolkit';

interface InterfaceState {
  isSidebarHide?: boolean;
  isAddModeOn: boolean;
}

const initialState: InterfaceState = {
  isSidebarHide: false,
  isAddModeOn: false,
};

export const interfaceSlice = createSlice({
  name: 'interface',
  initialState,
  reducers: {
    setSidebarVisibility: (state) => {
      state.isSidebarHide = !state.isSidebarHide;
    },
    setAddMode: (state) => {
      state.isAddModeOn = !state.isAddModeOn;
    },
  },
});

export const { setSidebarVisibility, setAddMode } = interfaceSlice.actions;

export default interfaceSlice.reducer;
