import React, { useEffect } from 'react'
import { Cuestionario } from '../components/Cuestionario'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

export const InGame = () => {

  const { record } = useSelector(state => state.rc);

  const { uid } = useSelector(state => state.auth);

  const {pathname} = useLocation()

  const navigate = useNavigate()

  const recordFiltrado = record?.filter(record => record?.idJugador === uid)
  
  useEffect(() => {        
    if (pathname === '/inGame' && recordFiltrado?.length === 0) {
      navigate('/Lobi')
    }
  }, [recordFiltrado, pathname])

  return (
    (recordFiltrado?.length !== 0)
      &&
    <Cuestionario />
  )
}
