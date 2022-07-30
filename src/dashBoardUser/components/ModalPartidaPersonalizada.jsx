import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import { obtenerPreguntasJuegoPersonalizado } from '../../store/preguntas/thunk'

export const ModalPartidaPersonalizada = ({ShowModalPartidaP, setShowModalPartidaP}) => {

  const handleClose = () => {
    setShowModalPartidaP(false)
  }

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

  return (
    <Modal size='lg' show={ShowModalPartidaP} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Configura tu partida</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
              <div className="row p-4">
                  <div className="col-4 form-group">
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

                  <div className="col-4 form-group">
                    <label className='text-black'>Dificultad</label>
                    <select {...getFieldProps('dificultad')} style={{border: 'none', borderBottom: '2px solid'}} className = 'form-control'>
                      <option value={undefined}>Seleccione una cantidad</option>
                      <option value="Tierno">Tierno</option>
                      <option value="Medio">Medio</option>
                      <option value="Avanzado">Avanzado</option>
                    </select>
                  </div>

                  <div className="col-4 form-group">
                    <label className='text-black'>Preguntas</label>
                    <select {...getFieldProps('pregunta')} style={{border: 'none', borderBottom: '2px solid'}} className = 'form-control'>
                      <option value={undefined}>Seleccione una cantidad</option>
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
