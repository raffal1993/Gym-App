import { createSlice } from '@reduxjs/toolkit';
import { ReactElement } from 'react';

interface InterfaceState {
  isSidebarHide?: boolean;
  isAddModeOn: boolean;
  isModalOpen: boolean;
  modalContent: ReactElement | null;
}

const initialState: InterfaceState = {
  isSidebarHide: false,
  isAddModeOn: false,
  isModalOpen: false,
  modalContent: null,
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
    setModalClose: (state) => {
      state.isModalOpen = false;
      state.modalContent === null;
    },
    setModalOpen: (state, action) => {
      state.isModalOpen = true;
      state.modalContent = action.payload;
    },
  },
});

export const { setSidebarVisibility, setAddMode, setModalOpen, setModalClose } =
  interfaceSlice.actions;

export default interfaceSlice.reducer;
