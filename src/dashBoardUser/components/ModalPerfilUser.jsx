import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import user from '../../heroes/user.webp'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { iniciarActualizacion } from '../../store/auth/thunk';
import { ModalCambPass } from './ModalCambPass';
// import { obtenerPreguntasJuegoPersonalizado } from '../../store/preguntas/thunk'

export const ModalPerfilUser = ({ShowModal, setShowModal}) => {

  const handleClose = () => {
    setShowModal(false)
  }

  const dispatch = useDispatch();

  const { usuarioActivo } = useSelector(state => state.auth);

  const {handleSubmit, resetForm, getFieldProps, touched, errors} = useFormik({
    initialValues: {
      name:  usuarioActivo?.name,
      lastName: usuarioActivo?.lastName,
      email:   usuarioActivo?.email,
    },
    enableReinitialize: true,
    onSubmit: ({name, lastName, email}) => {
        dispatch(iniciarActualizacion(usuarioActivo?.id, name, lastName, email.toLowerCase(), usuarioActivo?.password, usuarioActivo?.role))

        resetForm({
          name:  usuarioActivo?.name,
          lastName: usuarioActivo?.lastName,
          email:   usuarioActivo?.email,
        })
    },
    validationSchema: Yup.object({
      name: Yup.string()
                    .max(50, 'Debe de tener 50 caracteres o menos')
                    .min(3, 'Debe de tener 3 caracteres o más')
                    .required('Requerido'),
      lastName: Yup.string()
                    .max(50, 'Debe de tener 50 caracteres o menos')
                    .min(3, 'Debe de tener 3 caracteres o más')
                    .required('Requerido'),
      email: Yup.string()
                    .email('La dirección de email no es válida')
                    .required('Requerido'),
    })
  })

  const [showModalPass, setShowModalPass] = useState(false)

  return (
    <Modal fullscreen show={ShowModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Información personal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
              <div className="row p-4">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 shadow" style={{borderRadius: '20px'}}>
                  <div className='d-flex justify-content-center mx-auto my-2' style={{width: '250px', height: '250px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                      <img src={user} className='img-fluid' alt="" />
                  </div>
                  
                  <form onSubmit={handleSubmit} className='p-4'>
                    <div className="row my-5">
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 form-group">
                        <label className='text-black'>Nombre</label>
                        <input type="text" {...getFieldProps('name')} placeholder='Juan' style={{border: 'none', borderBottom: '2px solid'}} className = 'form-control text-black' />
                        {touched.name && errors.name && <span style={{color: 'red'}}>{errors.name}</span>}
                      </div>

                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 form-group">
                        <label className='text-black'>Apellido</label>
                        <input type="text" {...getFieldProps('lastName')} placeholder='Apellido' style={{border: 'none', borderBottom: '2px solid'}} className = 'form-control text-black' />
                        {touched.lastName && errors.lastName && <span style={{color: 'red'}}>{errors.lastName}</span>}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8 form-group">
                        <label className='text-black'>Correo electrónico</label>
                        <input type="text" {...getFieldProps('email')} placeholder='Ejemplo@gmail.com' style={{border: 'none', borderBottom: '2px solid'}} className = 'form-control text-black' />
                        {touched.email && errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
                      </div>

                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                        <label className='text-black'>Imagen</label>
                        <button type='button' className='btn text-white form-control' style={{backgroundColor: 'rgba(33,93,59,255)'}}>Imagen</button>
                      </div>
                    </div>

                    <button onClick={() => setShowModalPass(true)} type='button' className='btn text-white form-control' style={{backgroundColor: 'rgba(33,93,59,255)'}}>Cambiar contraseña</button>

                    <button type='submit' className='btn text-white form-control my-2' style={{backgroundColor: 'rgba(33,93,59,255)'}}>Guardar</button>
                  </form>
                </div>

                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8 p-4 shadow" style={{borderRadius: '20px'}}>
                  <h4 className='text-center text-black'><strong>Información de las partidas</strong></h4>

                  <div className="row my-4 p-4">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                      <h4 className='text-black'>Aciertos: {usuarioActivo?.juego?.aciertos || 0}</h4>
                    </div>

                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                      <h4 className='text-black'>Racha mas alta: {usuarioActivo?.juego?.racha || 0}</h4>
                    </div>

                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                      <h4 className='text-black'>Total de puntos: {usuarioActivo?.juego?.puntos || 0}</h4>
                    </div>
                  </div>

                  <hr />

                  <div className="row">
                    <h4 className='text-black text-center'><strong>Preguntas por reforzar</strong></h4>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 p-4" style={{borderRadius: '20px', maxHeight: '300px', overflow: 'auto'}}>
                      {
                        usuarioActivo?.juego?.reforzar?.map(reforzar => {
                          return (
                            <h5 className='text-black shadow p-4' style={{borderRadius: '20px', maxHeight: '150px', overflowY: 'auto'}}>{reforzar?.pregunta}</h5>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{backgroundColor: 'rgba(33,93,59,255)'}} onClick={handleClose}>
            Jugar partida con preguntas por reforzar
          </Button>
        </Modal.Footer>

        <ModalCambPass showModalPass = {showModalPass} setShowModalPass = {setShowModalPass} />
      </Modal>
  )
}
