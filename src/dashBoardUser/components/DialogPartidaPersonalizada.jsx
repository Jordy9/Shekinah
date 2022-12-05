import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { obtenerPreguntasJuegoPersonalizado, obtenerPreguntasPorId } from '../../store/preguntas/thunk'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { useResponsive } from '../../hooks/useResponsive';

export const DialogPartidaPersonalizada = ({ShowDialogPartidaP, setShowDialogPartidaP}) => {

  const handleClose = () => {
    setShowDialogPartidaP(false)
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

  const [ respWidth ] = useResponsive()

  return (
    <Dialog
        open={ShowDialogPartidaP}
        fullWidth
        maxWidth = 'md'
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
            <Button variant = 'contained' type='button' onClick={() => setShowPregunta(!showPregunta)}>
              {(!showPregunta) ? 'Partida por Rango o Id' : 'Partida personalizada'}
            </Button>
            {
              (!showPregunta)
                ?
              <>
                <Grid container p={3} display = {'flex'} justifyContent = {'center'}>
                    <Grid xs = {12} sm = {12} md = {12} lg = {4} xl = {4}>
                      <TextField fullWidth {...getFieldProps('categoria')} variant = 'standard' label = 'Categoría' select>
                        {Categoria.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid sx = {{mx: (respWidth > 991) && 1}} xs = {12} sm = {12} md = {12} lg = {3} xl = {3}>

                      <TextField fullWidth {...getFieldProps('dificultad')} variant = 'standard' label = 'Dificultad' select>
                        {Dificultad.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid xs = {12} sm = {12} md = {12} lg = {4} xl = {4}>

                      <TextField fullWidth {...getFieldProps('pregunta')} variant = 'standard' label = 'Preguntas' select>
                        {Preguntas.map((option) => (
                          <MenuItem selected key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                </Grid>

                <Grid container p = {2}>
                  <Grid xs = {12}>
                    <Button variant = 'contained' type='submit'>
                      Jugar partida personalizada
                    </Button>
                  </Grid>
                </Grid>
              </>
                :
              <>
                <Typography variant='h6'>Para pruebas</Typography>
                <Typography variant = 'body2'>Si desea buscar por rango siga esta sintaxis: 1-5 o 100-110</Typography>
                <Typography variant = 'body2'>Si desea buscar por ids especificos siga esta sintaxis: 1,5,7,15,20</Typography>
                <Grid container py = {2}>
                  <Grid xs = {12}>
                    <TextField value={formId} onChange = {(e) => setFormId(e.target.value)} variant = 'standard' label = 'Id de la pregunta' />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid xs = {12}>
                    <Button variant = 'contained' type='button' onClick={submitt}>
                      Jugar partida con id
                    </Button>
                  </Grid>
                </Grid>
              </>
            }

          </form>
        </DialogContent>
        <DialogActions>
          <Button variant = 'contained' type='button' onClick={handleClose}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
  )
}
