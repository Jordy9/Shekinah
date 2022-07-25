import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { InGame } from '../dashBoardUser/pages/InGame'
import { Lobi } from '../dashBoardUser/pages/Lobi'

export const UserRoute = () => {
  return (
    <Routes>
        <Route path='/inGame' element = { <InGame /> } />
        <Route path='/Lobi' element = { <Lobi /> } />

        <Route path='/*' element = {<Navigate to='/Lobi' />} />
    </Routes>
  )
}
