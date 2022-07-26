import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { UserRoutes } from '../dashBoard/routes/UserRoute';
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
        <Route path="/*" element={ <UserRoutes /> } />
      }

      {
        (authStatus === 'checking')
          &&
        <Route path="/*" element={ <UserRoute /> } />
      }

    </Routes>
  )
}