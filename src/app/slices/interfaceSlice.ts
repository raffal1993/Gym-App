import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReactElement } from 'react';

interface InterfaceState {
  isSidebarHide: boolean;
  isEditModeOn: boolean;
  isModalOpen: boolean;
  modalContent: ReactElement | null;
}

const initialState: InterfaceState = {
  isSidebarHide: false,
  isEditModeOn: false,
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
    setEditMode: (state, action: PayloadAction<InterfaceState['isEditModeOn']>) => {
      state.isEditModeOn = action.payload;
    },
    setModalClose: (state) => {
      state.isModalOpen = false;
      state.modalContent === null;
    },
    setModalOpen: (state, action: PayloadAction<InterfaceState['modalContent']>) => {
      state.isModalOpen = true;
      state.modalContent = action.payload;
    },
  },
});

export const { setSidebarVisibility, setEditMode, setModalOpen, setModalClose } =
  interfaceSlice.actions;

export default interfaceSlice.reducer;
