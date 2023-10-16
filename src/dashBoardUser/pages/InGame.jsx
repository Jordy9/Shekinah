import React, { useEffect, useState } from 'react'
import { Cuestionario } from '../components/Cuestionario'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Resultados } from './Resultados'

export const InGame = () => {

  const { record } = useSelector(state => state.rc);

  const {pathname} = useLocation()
  
  const navigate = useNavigate()
    
  const [showResultados, setShowResultados] = useState(record?.preguntas?.length <= record?.preguntaNo ? true : false)

  useEffect(() => {
    if (pathname === '/inGame' && !record && !showResultados) {
      navigate('/Lobi')
    }
  }, [record, pathname, navigate])

  return (
    ( record && !showResultados )
      ?
    <Cuestionario showResultados={showResultados} setShowResultados = {setShowResultados} />
      :
    <Resultados />
  )
}
