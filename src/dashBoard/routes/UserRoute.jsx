import React, { useEffect } from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import { obtenerPreguntas } from '../../store/preguntas/thunk'
import { CreateQuestion } from '../pages/CreateQuestion'
import { QuestionList } from '../pages/QuestionList'
import { UserList } from '../pages/UserList'
import { useDispatch } from 'react-redux'

export const UserRoute = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(obtenerPreguntas())
  }, [dispatch])
  
  return (
    <Routes>
        <Route path='/usuarios' element = { <UserList /> } />

        <Route path='/crearPregunta' element = { <CreateQuestion /> } />

        <Route path='/listadoPreguntas' element = { <QuestionList /> } />

        {/* <Route path='/listadoPreguntas' element = { <QuestionList /> } /> */}
        
        <Route path='/*' element = { <Navigate to = '/usuarios' /> } />
    </Routes>
  )
}
