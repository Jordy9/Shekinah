import { createSlice } from '@reduxjs/toolkit';
export const preguntasSlice = createSlice({
name: 'preguntas',
initialState: {
    preguntas: null,
    preguntasTema: null,
    preguntasGame: null,
    preguntaActiva: null,
    paginacion: null
},
reducers: {
    getPreguntas: (state, action ) => {
        state.preguntas = action.payload;
    },

    getPreguntasTema: (state, action ) => {
        state.preguntasTema = action.payload;
    },

    getPreguntasGame: (state, action ) => {
        state.preguntasGame = action.payload;
    },

    paginacion: (state, action ) => {
        state.paginacion = action.payload;
    },

    preguntaActiva: (state, action ) => {
        state.preguntaActiva = action.payload;
    },

    crearPreguntaActiva: (state, action ) => {
        state.preguntas = [...state.preguntas, action.payload];
    },

    actualizarPreguntaActiva: (state, action ) => {
        state.preguntas = state.preguntas.map(
            e => e._id === action.payload._id ? action.payload : e
        );
    },

    eliminarPreguntaActiva: (state, action ) => {
        state.preguntas = state.preguntas.filter(
            e => e._id !== action.payload._id
        );
    },
}
});
export const { getPreguntas, getPreguntasTema, getPreguntasGame, paginacion, preguntaActiva, crearPreguntaActiva, actualizarPreguntaActiva, eliminarPreguntaActiva } = preguntasSlice.actions;