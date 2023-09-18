import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { preguntasSlice } from './preguntas'
import { recordSlice } from './record/recordSlice'
import { temasSlice } from './temas/temasSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    pg: preguntasSlice.reducer,
    rc: recordSlice.reducer,
    tm: temasSlice.reducer,
  },
})