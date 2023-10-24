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
import { useDispatch, useSelector } from 'react-redux'
import { obtenerTemas } from '../store/temas/thunk'
import { CualEsTuNivelComponent } from '../dashBoardUser/components/CualEsTuNivelComponent'
import { DialogNextLevel } from '../dashBoardUser/components/DialogNextLevel'

export const AdminRoute = () => {

  const dispatch = useDispatch();

  const { usuarioActivo } = useSelector(state => state.auth);
  
  useEffect(() => {
      
    dispatch(obtenerTemas())

  }, [dispatch])

  return (
    <>
      {
        ( usuarioActivo.isLevel )
          ?
        <Routes>
          <Route path='/TuNivel' element = { <CualEsTuNivelComponent /> } />
          <Route path='/inGame' element = { <InGame /> } />
          <Route path='/*' element = {<Navigate to='/TuNivel' />} />
        </Routes>
          :
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
      }

      {
        ( usuarioActivo?.notifyLevel )
          &&
        <DialogNextLevel
          level={ usuarioActivo?.level }
          show={ usuarioActivo?.notifyLevel }
        />
      }

    </>
  )
}
