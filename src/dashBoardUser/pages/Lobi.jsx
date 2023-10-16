import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TablaPosiciones } from '../components/TablaPosiciones';
import { DashBoardLayaout } from '../layaout/DashBoardLayaout';

export const Lobi = () => {

  const { record } = useSelector(state => state.rc);

  const {pathname} = useLocation()

  const navigate = useNavigate()
  
  useEffect(() => {
    if ( record ) {
      navigate('/inGame')
    }
    
    if ( pathname === '/inGame' && !record ) {
      navigate('/Lobi')
    }
  }, [record, pathname])
  
  return (
    <DashBoardLayaout>
      <TablaPosiciones />
    </DashBoardLayaout>
  )
}
