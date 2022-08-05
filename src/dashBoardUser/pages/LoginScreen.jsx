import React, { useState } from 'react'
import { Navb } from '../components/Navb';
import { ModalPartidaPersonalizada } from '../components/ModalPartidaPersonalizada';
import { Login } from '../components/Login';
import { useSelector } from 'react-redux';

export const LoginScreen = () => {

  const [ShowModalPartidaP, setShowModalPartidaP] = useState(false)

  const { uid } = useSelector(state => state.auth);
  
  return (
    <div>
      <Navb />
      {
        (uid)
          &&
        <div className="row p-4 mt-5">
          <div className="col-12 d-flex justify-content-center">
            <button onClick={() => setShowModalPartidaP(true)} className='btn text-white' style={{backgroundColor: 'rgba(33,93,59,255)'}}>Configurar partida personalizada</button>
          </div>
        </div>
      }

      <div className="row p-4 my-5">
        <div className="col-12">
          <Login />
        </div>
      </div>

      <ModalPartidaPersonalizada ShowModalPartidaP = {ShowModalPartidaP} setShowModalPartidaP = {setShowModalPartidaP} />
    </div>
  )
}
