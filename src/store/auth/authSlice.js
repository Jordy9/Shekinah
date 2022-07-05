import { createSlice } from '@reduxjs/toolkit';
export const authSlice = createSlice({
name: 'auth',
initialState: {
    status: 'checking',
    usuarios: {},
    errorMessage: null
},
reducers: {
    onChecking: (state, /* action */ ) => {
        state.status = 'checking';
        state.usuarios = {};
        state.errorMessage = undefined;
    },

    onLogin: (state, {payload} ) => {
        state.status = 'authenticated';
        state.usuarios = payload;
        state.errorMessage = undefined;
    },
}
});
export const { onChecking, onLogin } = authSlice.actions; 