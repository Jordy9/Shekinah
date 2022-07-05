import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { UserRoute } from '../dashBoard/routes/UserRoute';
import { obtenerUsuarios } from '../store/auth/thunk';

export const AppRouter = () => {

  const authStatus = 'checking'

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(obtenerUsuarios())
  }, [dispatch])
  
  return (
    <Routes>

      {
        (authStatus === 'not-authenticated')

          ?<Route path="/auth/*" element={ <AuthRoutes /> } />
          :<Route path="/*" element={ <UserRoute /> } />
      }

      <Route path='/*' element = {<Navigate to='/auth/login' />} />


    </Routes>
  )
}