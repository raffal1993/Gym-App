import { createSlice } from '@reduxjs/toolkit';

interface InterfaceState {
  isSidebarHide?: boolean;
}

const initialState: InterfaceState = {
  isSidebarHide: false,
};

export const interfaceSlice = createSlice({
  name: 'interface',
  initialState,
  reducers: {
    setSidebarVisibility: (state) => {
      state.isSidebarHide = !state.isSidebarHide;
    },
  },
});

export const { setSidebarVisibility } = interfaceSlice.actions;

export default interfaceSlice.reducer;
