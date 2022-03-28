import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from 'app/store';

interface UserState {
  email: null | string;
}

const initialState: UserState = {
  email: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { setUserEmail } = userSlice.actions;

// export const selectUser = (state: RootState) => state.user.email;

export default userSlice.reducer;
