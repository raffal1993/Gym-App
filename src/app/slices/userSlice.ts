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
    setUser: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
