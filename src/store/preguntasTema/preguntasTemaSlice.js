import { createSlice } from '@reduxjs/toolkit';

export const preguntasTemaSlice = createSlice({
   name: 'preguntasTema',
   initialState: {
    preguntas: null,
    preguntaActiva: null,
    paginacion: null,
    isOpen: false
   },
   reducers: {
        getPreguntas: (state, action ) => {
            state.preguntas = action.payload;
        },

        getIsOpen: (state, action ) => {
            state.isOpen = action.payload;
        },

        paginacion: (state, action ) => {
            state.paginacion = action.payload;
        },
    
        preguntaActiva: (state, action ) => {
            state.preguntaActiva = action.payload;
        },
    
        crearPregunta: (state, action ) => {
            state.preguntas = [...state.preguntas, action.payload];
        },
    
        actualizarPregunta: (state, action ) => {
            state.preguntas = state.preguntas.map(
                e => e._id === action.payload._id ? action.payload : e
            );
        },
    
        eliminarPregunta: (state, action ) => {
            state.preguntas = state.preguntas.filter(
                e => e._id !== action.payload._id
            );
        },
   }
});

// Action creators are generated for each case reducer function
export const { getPreguntas, getIsOpen, crearPregunta, actualizarPregunta, eliminarPregunta, paginacion, preguntaActiva } = preguntasTemaSlice.actions;