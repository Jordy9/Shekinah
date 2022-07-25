import { Button } from '@mui/material'
import React from 'react'
import { obtenerPreguntasJuego } from '../../store/preguntas/thunk';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { crearRecord } from '../../store/record/thunk';
import { useLocation, useNavigate } from 'react-router-dom';

export const Lobi = () => {

  const dispatch = useDispatch();

  const { preguntasGame } = useSelector(state => state.pg);

  const { record } = useSelector(state => state.rc);

  const { uid } = useSelector(state => state.auth);

  const juego = () => {
    dispatch(obtenerPreguntasJuego())
  }

  const juegoAhora = () => {
    dispatch(crearRecord(uid, 0, preguntasGame, 0))
  }

  const {pathname} = useLocation()

  const navigate = useNavigate()
  
  useEffect(() => {
    if (record?.length !== 0) {
      navigate('/inGame')
    }
    
    if (pathname === '/inGame' && record?.length === 0) {
      navigate('/Lobi')
    }
  }, [record, pathname])
  
  return (
    <div>
      <Button onClick={juego} variant='contained'>obtener</Button>
      <Button onClick={juegoAhora} variant='contained'>Jugar</Button>
    </div>
  )
}
