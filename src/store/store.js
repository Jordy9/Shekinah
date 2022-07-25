import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { preguntasSlice } from './preguntas'
import { recordSlice } from './record/recordSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    pg: preguntasSlice.reducer,
    rc: recordSlice.reducer
  },
})