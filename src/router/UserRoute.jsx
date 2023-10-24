import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { InGame } from '../dashBoardUser/pages/InGame'
import { Lobi } from '../dashBoardUser/pages/Lobi'
import { Perfil } from '../dashBoardUser/pages/Perfil'
import { CualEsTuNivelComponent } from '../dashBoardUser/components/CualEsTuNivelComponent'
import { useSelector } from 'react-redux'
import { DialogNextLevel } from '../dashBoardUser/components/DialogNextLevel'

export const UserRoute = () => {

  const { usuarioActivo } = useSelector(state => state.auth);

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

          <Route path='/TuNivel' element = { <CualEsTuNivelComponent /> } />

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
