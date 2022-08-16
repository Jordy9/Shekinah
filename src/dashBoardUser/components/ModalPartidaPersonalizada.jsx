import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { obtenerPreguntasJuegoPersonalizado, obtenerPreguntasPorId } from '../../store/preguntas/thunk'

export const ModalPartidaPersonalizada = ({ShowModalPartidaP, setShowModalPartidaP}) => {

  const handleClose = () => {
    setShowModalPartidaP(false)
  }

  const { paginacion } = useSelector(state => state.pg);

  const dispatch = useDispatch();

  const {handleSubmit, resetForm, getFieldProps, touched, errors} = useFormik({
    initialValues: {
        categoria:  false,
        dificultad: false,
        pregunta:   false
    },
    enableReinitialize: true,
    onSubmit: ({categoria, dificultad, pregunta}) => {
        dispatch(obtenerPreguntasJuegoPersonalizado(categoria, dificultad, pregunta))

        resetForm({
          categoria:  false,
          dificultad: false,
          pregunta:   false
        })
    },
    validationSchema: Yup.object({

    })
  })

  const [formId, setFormId] = useState('')

  const submitt = () => {
    dispatch(obtenerPreguntasPorId(formId))
  }

  const [showPregunta, setShowPregunta] = useState(false)

  return (
    <Modal size='lg' show={ShowModalPartidaP} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Configura tu partida</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <button type='button' className='btn btn-primary' style={{backgroundColor: 'rgba(33,93,59,255)'}} onClick={() => setShowPregunta(!showPregunta)}>
              {(!showPregunta) ? 'Partida por Rango o Id' : 'Partida personalizada'}
            </button>
            {
              (!showPregunta)
                ?
              <>
                <div className="row p-4">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                      <label className='text-black'>Categoría</label>
                      <select {...getFieldProps('categoria')} style={{border: 'none', borderBottom: '2px solid'}} className = 'form-control'>
                        <option value={undefined}>Seleccione una categoría</option>
                        <option value="Pentateuco">Pentateuco</option>
                        <option value="Histórico">Histórico</option>
                        <option value="Sapienciales">Sapienciales</option>
                        <option value="Proféticos">Proféticos</option>
                        <option value="Epístola">Epístola</option>
                      </select>
                    </div>

                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                      <label className='text-black'>Dificultad</label>
                      <select {...getFieldProps('dificultad')} style={{border: 'none', borderBottom: '2px solid'}} className = 'form-control'>
                        <option value={undefined}>Seleccione la dificultad</option>
                        <option value="Tierno">Tierno</option>
                        <option value="Medio">Medio</option>
                        <option value="Avanzado">Avanzado</option>
                      </select>
                    </div>

                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 form-group">
                      <label className='text-black'>Preguntas</label>
                      <select {...getFieldProps('pregunta')} style={{border: 'none', borderBottom: '2px solid'}} className = 'form-control'>
                        <option value={undefined}>Cantidad</option>
                        <option value="1">1</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                      </select>
                    </div>
                </div>

                <div className="row p-4">
                  <div className="col-12 form-group">
                    <button type='submit' style={{backgroundColor: 'rgba(33,93,59,255)', color: 'white'}} className='btn form-control'>
                      Jugar partida personalizada
                    </button>
                  </div>
                </div>
              </>
                :
              <>
                <h3>Para pruebas</h3>
                <h6>Si desea buscar por rango siga esta sintaxis: 1-5 o 100-110</h6>
                <h6>Si desea buscar por ids especificos siga esta sintaxis: 1,5,7,15,20</h6>
                <div className="row p-4">
                    {/* <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 form-group"> */}
                      <label className='text-black'>Id de la pregunta</label>
                        <div className='col-12'>
                          <input type="text" value={formId} onChange = {(e) => setFormId(e.target.value)} className = 'form-control text-black' />
                        </div>
                    {/* </div> */}
                </div>

                <div className="row p-4">
                  <div className="col-12 form-group">
                    <button type='button' onClick={submitt} style={{backgroundColor: 'rgba(33,93,59,255)', color: 'white'}} className='btn form-control'>
                      Jugar partida con id
                    </button>
                  </div>
                </div>
              </>
            }

          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{backgroundColor: 'rgba(33,93,59,255)'}} onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
  )
}
