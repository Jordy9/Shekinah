import React, { useEffect } from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import { obtenerPreguntas } from '../../store/preguntas/thunk'
import { CreateQuestion } from '../pages/CreateQuestion'
import { QuestionList } from '../pages/QuestionList'
import { UserList } from '../pages/UserList'
import { useDispatch } from 'react-redux'
import { InGame } from '../../dashBoardUser/pages/InGame'
import { Lobi } from '../../dashBoardUser/pages/Lobi'
import { obtenerRecord } from '../../store/record/thunk'

export const UserRoute = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(obtenerPreguntas())
    dispatch(obtenerRecord())
  }, [dispatch])
  
  return (
    <Routes>
      {
        (false)
          ?
        <>
          <Route path='/usuarios' element = { <UserList /> } />

          <Route path='/crearPregunta' element = { <CreateQuestion /> } />

          <Route path='/listadoPreguntas' element = { <QuestionList /> } />

          
          <Route path='/*' element = { <Navigate to = '/usuarios' /> } />
        </>
          :
        <>
          <Route path='/inGame' element = { <InGame /> } />
          <Route path='/Lobi' element = { <Lobi /> } />
        </>
      }
    </Routes>
  )
}
