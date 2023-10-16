import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { jugarPreguntasPorTema, obtenerPreguntasJuegoPersonalizado, obtenerPreguntasPorId } from '../../store/preguntas/thunk'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { useResponsive } from '../../hooks/useResponsive';
import { ConfigurationComponents } from './ConfigurationComponents';
import { PreguntasTema } from './PreguntasTema';
import { ButtonComponents } from './ButtonComponents';

export const DialogPartidaPersonalizada = ({ShowDialogPartidaP, setShowDialogPartidaP}) => {

  const handleClose = () => {
    setShowDialogPartidaP(false)
  }

  const { usuarioActivo } = useSelector(state => state.auth);

  const { temas, preguntasTema } = useSelector(state => state.tm);

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

  const [showPreguntaTema, setShowPreguntaTema] = useState(false)

  const Categoria = [
    {value: 'Pentateuco', label: 'Pentateuco'}, 
    {value: 'Histórico', label : 'Histórico'},
    {value: 'Sapienciales', label: 'Sapienciales'}, 
    {value: 'Proféticos', label: 'Proféticos'}, 
    {value: 'Epístola', label: 'Epístola'}
  ]

  const Dificultad = [
    {value: 'Tierno', label: 'Tierno'}, 
    {value: 'Medio', label : 'Medio'},
    {value: 'Avanzado', label: 'Avanzado'}, 
  ]

  const Preguntas = [
    {value: '1', label: '1'}, 
    {value: '5', label : '5'},
    {value: '10', label: '10'}, 
    {value: '15', label: '15'}, 
  ]

  const handleButton = () => {
    document.getElementById('buttonSubmitPartidaPersonalizada').click()
  }

  const [preguntasTOGame, setPreguntasTOGame] = useState([])

  const handleJugarPorTemas = () => {

    if ( preguntasTOGame.length === 0 ) return

    dispatch( jugarPreguntasPorTema(preguntasTOGame) )
  }

  const [ respWidth ] = useResponsive();

  const message = ( respWidth > 600 ) ? 'Partida por Rango o Id' : 'Rango o Id'

  const message2 = ( respWidth > 600 ) ? 'Partida personalizada' : 'Personalizada'

  return (
    <Dialog
      open={ShowDialogPartidaP}
      fullWidth
      maxWidth = 'sm'
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      scroll={'paper'}
    >
        <DialogTitle id="alert-dialog-title">
          <Typography variant = 'h5' textAlign={'center'} >Configura tu partida</Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid display={ 'flex' } justifyContent={ 'space-between' }>
              {
                (usuarioActivo?.role === 'administrador')
                  &&
                <Button variant = 'contained' type='button' onClick={() => {
                  setShowPreguntaTema(false)
                  setShowPregunta(!showPregunta)
                }}>
                  {(!showPregunta) ? message : message2 }
                </Button>
              }
              {
                (usuarioActivo?.role === 'administrador')
                  &&
                <Button variant = 'contained' type='button' onClick={() => setShowPreguntaTema(!showPreguntaTema)}>
                  Por tema
                </Button>
              }
            </Grid>
            
            {
              ( showPreguntaTema )
                ?
              <PreguntasTema
                temas={ temas }
                preguntasTOGame={ preguntasTOGame }
                setPreguntasTOGame={ setPreguntasTOGame }
              />
                :
              <ConfigurationComponents
                Categoria={ Categoria }
                Dificultad={ Dificultad }
                Preguntas={ Preguntas }
                formId={ formId }
                getFieldProps={ getFieldProps }
                setFormId={ setFormId }
                showPregunta={ showPregunta }
              />
            }

          </form>
        </DialogContent>
        <DialogActions sx={{ px: 2 }}>

          {
            ( showPreguntaTema )
              ?
            <>
              <Button fullWidth variant = 'contained' type='button' onClick={handleClose}>
                Cerrar
              </Button>

              <Button fullWidth variant = 'contained' type='button' onClick={handleJugarPorTemas}>
                Jugar
              </Button>
            </>
              :
            <ButtonComponents
              handleButton={ handleButton }
              handleClose={ handleClose }
              showPregunta={ showPregunta }
              submitt={ submitt }
            />
          }

        </DialogActions>
      </Dialog>
  )
}
