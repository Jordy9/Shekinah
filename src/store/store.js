import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { preguntasSlice } from './preguntas'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    pg: preguntasSlice.reducer
  },
})