import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { TableQuestion } from '../dashBoard/components/TableQuestion'
import { CreateQuestion } from '../dashBoard/pages/CreateQuestion'
import { UserList } from '../dashBoard/pages/UserList'
import { InGame } from '../dashBoardUser/pages/InGame'
import { Lobi } from '../dashBoardUser/pages/Lobi'
import { Perfil } from '../dashBoardUser/pages/Perfil'

export const UserRoute = () => {

  return (
    <Routes>

      <Route path='/Lobi' element = { <Lobi /> } />

      <Route path='/Perfil' element = { <Perfil /> } />

      <Route path='/inGame' element = { <InGame /> } />

      <Route path='/usuarios' element = { <UserList /> } />

      <Route path='/crearPregunta' element = { <CreateQuestion /> } />

      <Route path='/listadoPreguntas' element = { <TableQuestion /> } />

      <Route path='/*' element = {<Navigate to='/Lobi' />} />

    </Routes>
  )
}
