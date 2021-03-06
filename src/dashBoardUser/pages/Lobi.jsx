import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navb } from '../components/Navb';
import { TablaPosiciones } from '../components/TablaPosiciones';
import { ModalPartidaPersonalizada } from '../components/ModalPartidaPersonalizada';

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

  const [ShowModalPartidaP, setShowModalPartidaP] = useState(false)
  
  return (
    <div>
      <Navb />
      <div className="row p-4 mt-5">
        <div className="col-12 d-flex justify-content-center">
          <button onClick={() => setShowModalPartidaP(true)} className='btn text-white' style={{backgroundColor: 'rgba(33,93,59,255)'}}>Jugar partida personalizada</button>
        </div>
      </div>

      <div className="row p-4">
        <div className="col-12">
          <TablaPosiciones />
        </div>
      </div>

      <ModalPartidaPersonalizada ShowModalPartidaP = {ShowModalPartidaP} setShowModalPartidaP = {setShowModalPartidaP} />
    </div>
  )
}
