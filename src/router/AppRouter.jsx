import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginScreen } from '../dashBoardUser/pages/LoginScreen';
import { Registro } from '../dashBoardUser/pages/Registro';
import { Spinner } from '../Spinner';
import { iniciarAutenticacion, obtenerUsuarios } from '../store/auth/thunk';
import { obtenerPreguntas } from '../store/preguntas/thunk';
import { obtenerRecord } from '../store/record/thunk';
import { UserRoute } from './UserRoute';

export const AppRouter = () => {

  const dispatch = useDispatch()

  const { uid } = useSelector(state => state.auth);

  const token = localStorage.getItem('token')

  useEffect(() => {
    dispatch(obtenerUsuarios())
    dispatch(iniciarAutenticacion())
    dispatch(obtenerPreguntas())
    dispatch(obtenerRecord())
  }, [dispatch])
  
  return (
    <>
      {
        (!!token)
          ?
        (!uid)
          ?
        <Spinner />
          :
        <UserRoute />
          :
        <Routes>
          <Route path='/Login' element = { <LoginScreen /> } />
          <Route path='/Registro' element = { <Registro /> } />
          <Route path='/*' element = {<Navigate to='/Login' />} />
        </Routes>
      }
    </>
  )
}