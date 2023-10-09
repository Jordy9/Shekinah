import { createSlice } from '@reduxjs/toolkit';
export const authSlice = createSlice({
name: 'auth',
initialState: {
    checking: true,
    usuarios: [],
    uid: null,
    name: null,
    usuarioActivo: null,
    userActive: ''
},
reducers: {
    onGetUsers: (state, action ) => {
        state.usuarios = action.payload;
    },

    onRegister: (state, action ) => {
        state.uid = action.payload.uid;
        state.name = action.payload.name;
        state.usuarios.push(action.payload.usuario)
        state.usuarioActivo = action.payload.usuario
    },

    onUpdate: (state, action ) => {
        state.usuarios = state.usuarios.map(
            e => (e.id === action.payload.id) ? action.payload : e);
        state.usuarioActivo = action.payload;
    },

    onUpdateUser: (state, action ) => {
        state.usuarios = state.usuarios.map(
            e => (e.id === action.payload.id) ? action.payload : e);
        state.userActive = action.payload;
    },

    onDelete: (state, action ) => {
        state.usuarios = state.usuarios.filter(
            e => e.id !== action.payload.id);
        state.userActive = null;
    },

    onActiveUser: (state, action ) => {
        state.usuarioActivo = action.payload;
    },

    onUserActive: (state, action ) => {
        state.userActive = action.payload;
    },

    onLogout: (state) => {
        state.checking = true;
        state.uid = null;
        state.name = null;
        state.usuarioActivo = null;
    },

    onChecking: (state) => {
        state.checking = false;
    },

    onLogin: (state, action ) => {
        state.checking = false
        state.uid = action.payload.uid;
        state.name = action.payload.name;
    },
}
});
export const { onGetUsers, onRegister, onUpdate, onActiveUser, onLogout, onChecking, onLogin, onUserActive, onDelete, onUpdateUser } = authSlice.actions; 