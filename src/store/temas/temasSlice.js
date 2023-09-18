import { createSlice } from '@reduxjs/toolkit';

export const temasSlice = createSlice({
   name: 'temas',
   initialState: {
      temas: [],
      temaActivo: null,
      paginacion: null,
      isOpen: false
   },
   reducers: {
      getTemasInit: (state, action ) => {
         state.temas = action.payload;
      },
      getTemas: (state, action ) => {
         state.temas.push(action.payload);
      },
      createTemas: (state, action ) => {
         state.temas.push(action.payload);
      },
      getTemaActivo: (state, action ) => {
         state.temaActivo = action.payload;
      },
      getIsOpen: (state, action ) => {
         state.isOpen = action.payload;
      },
      paginacion: (state, action ) => {
         state.paginacion = action.payload;
      },
      actualizarTemaActivo: (state, action ) => {
         state.temas = state.temas.map(
            e => e._id === action.payload._id ? action.payload : e
         );

         state.temaActivo = action.payload
      },
     eliminarTemaActivo: (state, action ) => {
         state.temas = state.temas.filter(
            e => e._id !== action.payload._id
         );
      },
 
   }
});


// Action creators are generated for each case reducer function
export const { getTemasInit, getTemas, createTemas, getTemaActivo, getIsOpen, paginacion, actualizarTemaActivo, eliminarTemaActivo } = temasSlice.actions;