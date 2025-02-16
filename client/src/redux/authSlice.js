import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  role: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).role : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      localStorage.setItem('user', JSON.stringify(action.payload)); // Save token and role to localStorage
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      localStorage.removeItem('user'); // Clear localStorage
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
