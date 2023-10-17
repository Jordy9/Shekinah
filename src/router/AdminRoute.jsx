import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CreateQuestion } from '../dashBoard/pages/CreateQuestion'
import { QuestionList } from '../dashBoard/pages/QuestionList'
import { UserList } from '../dashBoard/pages/UserList'
import { InGame } from '../dashBoardUser/pages/InGame'
import { Lobi } from '../dashBoardUser/pages/Lobi'
import { Perfil } from '../dashBoardUser/pages/Perfil'
import { Temas } from '../dashBoardUser/components/Temas'
import { PreguntasParaTema } from '../dashBoard/components/PreguntasParaTema'
import { useDispatch } from 'react-redux'
import { obtenerTemas } from '../store/temas/thunk'

export const AdminRoute = () => {

  const dispatch = useDispatch();

  useEffect(() => {
      
    dispatch(obtenerTemas())

  }, [dispatch])

  return (
    <Routes>

      <Route path='/Lobi' element = { <Lobi /> } />

      <Route path='/Perfil' element = { <Perfil /> } />

      <Route path='/inGame' element = { <InGame /> } />

      <Route path='/usuarios' element = { <UserList /> } />

      <Route path='/crearPregunta' element = { <CreateQuestion /> } />

      <Route path='/listadoPreguntas' element = { <QuestionList /> } />

      <Route path='/temas' element = { <Temas /> } />

      <Route path='/preguntasTema' element = { <PreguntasParaTema /> } />

      <Route path='/*' element = {<Navigate to='/Lobi' />} />

    </Routes>
  )
}
