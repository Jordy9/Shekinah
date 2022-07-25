import React, { useEffect } from 'react'
import { Cuestionario } from '../components/Cuestionario'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

export const InGame = () => {

  const { record } = useSelector(state => state.rc);

  const {pathname} = useLocation()

  const navigate = useNavigate()
  
  useEffect(() => {        
    if (pathname === '/inGame' && record?.length === 0) {
      navigate('/Lobi')
    }
  }, [record, pathname])

  return (
    // <DashBoardLayaout>
    (record[0]?.preguntaNo + 1)
      &&
    <Cuestionario />
    // </DashBoardLayaout>
  )
}
