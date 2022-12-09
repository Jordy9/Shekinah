import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginScreen } from '../dashBoardUser/pages/LoginScreen';
import { Registro } from '../dashBoardUser/pages/Registro';
import { Spinner } from '../Spinner';
import { iniciarAutenticacion, obtenerUsuarios } from '../store/auth/thunk';
import { obtenerPreguntas } from '../store/preguntas/thunk';
import { obtenerRecord } from '../store/record/thunk';
import { AdminRoute } from './AdminRoute';
import { UserRoute } from './UserRoute';

export const AppRouter = () => {

  const dispatch = useDispatch()

  const { uid, usuarioActivo } = useSelector(state => state.auth);

  const token = localStorage.getItem('token')

  useEffect(() => {
    dispatch(obtenerUsuarios())
    dispatch(iniciarAutenticacion())
    dispatch(obtenerPreguntas())
    dispatch(obtenerRecord())
  }, [dispatch])

  useEffect(() => {
    if (usuarioActivo?.tema) {
      if (!localStorage.getItem('tema')) {
        localStorage.setItem('tema', usuarioActivo?.tema)
        localStorage.setItem('selected', usuarioActivo?.selected)
      }
    }
  }, [usuarioActivo])

  if (!!uid && !usuarioActivo) {
    return <Spinner />
  }
  
  return (
    <>
      {
        (!!token)
          ?
        (!uid)
          ?
        <Spinner />
          :
        (usuarioActivo?.role === 'usuario')
          ?
        <UserRoute />
          :
        <AdminRoute />
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