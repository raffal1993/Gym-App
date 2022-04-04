import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from 'app/store';

interface UserState {
  email: string | null;
  isUserChecked?: boolean;
}

const initialState: UserState = {
  email: null,
  isUserChecked: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.isUserChecked = true;
    },
  },
});

export const { setUserInfo } = userSlice.actions;

// export const selectUser = (state: RootState) => state.user.email;

export default userSlice.reducer;
