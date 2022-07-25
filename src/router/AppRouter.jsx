import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { obtenerUsuarios } from '../store/auth/thunk';
import { obtenerPreguntas } from '../store/preguntas/thunk';
import { obtenerRecord } from '../store/record/thunk';
import { UserRoute } from './UserRoute';

export const AppRouter = () => {

  const authStatus = 'checking'

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(obtenerPreguntas())
    dispatch(obtenerRecord())
  }, [dispatch])
  
  return (
    <Routes>

      {
        (authStatus === 'not-authenticated')
          &&
        <Route path="/auth/*" element={ <AuthRoutes /> } />
      }

      {
        (authStatus === 'checking')
          &&
        <Route path="/*" element={ <UserRoute /> } />
      }

    </Routes>
  )
}