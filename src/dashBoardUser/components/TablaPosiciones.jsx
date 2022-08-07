import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import user from '../../heroes/user.webp'
import { useResponsive } from '../../hooks/useResponsive'
import { obtenerPreguntasJuego } from '../../store/preguntas/thunk'
import { ModalPartidaPersonalizada } from './ModalPartidaPersonalizada'
import { ModalPerfilUser } from './ModalPerfilUser'
import { TablaSpreedList } from './TablaSpreedList'

export const TablaPosiciones = () => {

    const dispatch = useDispatch();

    const { usuarioActivo } = useSelector(state => state.auth);

    const [ShowModal, setShowModal] = useState(false)

    const [ShowModalPartidaP, setShowModalPartidaP] = useState(false)

    const comenzarJuegoRapido = () => {
        dispatch(obtenerPreguntasJuego())
    }

    const [respWidth] = useResponsive()

  return (
    <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-8 col-xxl-8 mx-auto">

            <div className='table-responsive shadow p-4' style={{borderTopLeftRadius: '35px', borderTopRightRadius: '10px', height: '500px', backgroundColor: 'white'}}>
                <div style={{justifyContent: 'space-between', flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
                    <h4 className='text-center text-black'>Top 10</h4>
                    <div onClick={() => setShowModal(true)} style={{justifyContent: 'space-between', flexDirection: 'row', display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                        <div className='d-flex justify-content-center mx-2' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                            <img src={user} className='img-fluid' alt="" />
                        </div>
                        <h4 className='text-center text-black my-auto'>{usuarioActivo?.name} {usuarioActivo?.lastName}</h4>
                    </div>
                </div>
                <table className="table borderless">
                    <thead>
                        <tr>
                            <th scope="col">Imagen</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Puntos</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TablaSpreedList />
                    </tbody>
                </table>

            </div>
            <div className="p-4" style={{borderBottomLeftRadius: '35px', borderBottomRightRadius: '35px', backgroundColor: 'white', justifyContent: 'space-between', display: 'flex'}}>
                <button onClick={() => setShowModalPartidaP(true)} className='btn text-white' style={{backgroundColor: 'rgba(33,93,59,255)'}}>{(respWidth >= 992) ? 'Configurar partida personalizada' : 'Personalizada'}</button>
                <button onClick={comenzarJuegoRapido} className='btn text-white' style={{backgroundColor: 'rgba(33,93,59,255)'}}>{(respWidth >= 992) ? 'Jugar partida rapida' : 'Jugar'}</button>
            </div>
        </div>

        <ModalPerfilUser ShowModal = {ShowModal} setShowModal = {setShowModal} />
        <ModalPartidaPersonalizada ShowModalPartidaP = {ShowModalPartidaP} setShowModalPartidaP = {setShowModalPartidaP} />
    </div>
  )
}
