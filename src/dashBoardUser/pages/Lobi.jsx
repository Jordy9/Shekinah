import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navb } from '../components/Navb';
import { TablaPosiciones } from '../components/TablaPosiciones';

export const Lobi = () => {

  const { record } = useSelector(state => state.rc);

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
      <Navb />
      <div className="row p-4 mt-5">
        <div className="col-12 d-flex justify-content-center">
          <button className='btn text-white' style={{backgroundColor: 'rgba(33,93,59,255)'}}>Jugar partida personalizada</button>
        </div>
      </div>

      <div className="row p-4">
        <div className="col-12">
          <TablaPosiciones />
        </div>
      </div>


      {/* <Button onClick={juego} variant='contained'>obtener</Button>
      <Button onClick={juegoAhora} variant='contained'>Jugar</Button> */}
    </div>
  )
}
