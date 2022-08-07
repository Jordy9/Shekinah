import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navb } from '../components/Navb';
import { TablaPosiciones } from '../components/TablaPosiciones';

export const Lobi = () => {

  const { record } = useSelector(state => state.rc);

  const { uid } = useSelector(state => state.auth);

  const {pathname} = useLocation()

  const navigate = useNavigate()

  const recordFiltrado = record?.filter(record => record?.idJugador === uid)
  
  useEffect(() => {
    if (recordFiltrado?.length !== 0) {
      navigate('/inGame')
    }
    
    if (pathname === '/inGame' && recordFiltrado?.length === 0) {
      navigate('/Lobi')
    }
  }, [recordFiltrado, pathname])
  
  return (
    <div>
      <Navb />

      <div className="row p-4 mt-5">
        <div className="col-12">
          <TablaPosiciones />
        </div>
      </div>
    </div>
  )
}
