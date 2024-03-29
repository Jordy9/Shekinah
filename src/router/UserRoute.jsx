import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { InGame } from '../dashBoardUser/pages/InGame'
import { Lobi } from '../dashBoardUser/pages/Lobi'
import { Perfil } from '../dashBoardUser/pages/Perfil'

export const UserRoute = () => {

  return (
    <Routes>

      <Route path='/Lobi' element = { <Lobi /> } />

      <Route path='/Perfil' element = { <Perfil /> } />

      <Route path='/inGame' element = { <InGame /> } />

      <Route path='/*' element = {<Navigate to='/Lobi' />} />

    </Routes>
  )
}
