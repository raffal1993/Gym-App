import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email?: string | null;
}

const initialState: UserState = {
  email: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserEmail: (state, action: PayloadAction<UserState['email']>) => {
      state.email = action.payload;
    },
  },
});

export const { setUserEmail } = userSlice.actions;

export default userSlice.reducer;
