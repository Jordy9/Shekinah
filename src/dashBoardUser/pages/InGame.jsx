import React, { useEffect, useState } from 'react'
import { Cuestionario } from '../components/Cuestionario'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Resultados } from './Resultados'

export const InGame = () => {

  const { record } = useSelector(state => state.rc);

  const { uid } = useSelector(state => state.auth);

  const {pathname} = useLocation()
  
  const navigate = useNavigate()
  
  const recordFiltrado = record?.filter(record => record?.idJugador === uid)
  
  const [showResultados, setShowResultados] = useState(recordFiltrado[0]?.preguntas?.length <= recordFiltrado[0]?.preguntaNo ? true : false)

  useEffect(() => {        
    if (pathname === '/inGame' && recordFiltrado?.length === 0 && !showResultados) {
      navigate('/Lobi')
    }
  }, [recordFiltrado, pathname, navigate])

  return (
    (recordFiltrado?.length !== 0 && !showResultados)
      ?
    <Cuestionario showResultados={showResultados} setShowResultados = {setShowResultados} />
      :
    <Resultados />
  )
}
