import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice ({
  name: 'user',
  initialState,
  reducers: {
    LoginStart: (state) => {
      state.loading = true;
    },
    LoginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    LoginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;

    }
  }
})

export const { LoginStart, LoginSuccess, LoginFailure } = userSlice.actions;

export default userSlice.reducer;