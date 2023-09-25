import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField } from '@mui/material'
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { getIsOpen } from '../../store/preguntasTema/preguntasTemaSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { actualizarPreguntaTema, crearPreguntaTema } from '../../store/preguntasTema/thunk';
import { Cancel, Check } from '@mui/icons-material';

export const DialogPreguntaParaTema = () => {

    const dispatch = useDispatch();

    const { isOpen, preguntaActiva } = useSelector(state => state.pgt);

    const {temas} = useSelector(state => state.tm)

    const [formValuesProps, setFormValuesProps] = useState(initFormProps)

    const [formValues, setFormValues] = useState(respuestasInit)

    const handleClose = () => {
        dispatch(getIsOpen(false))
        resetForm()
        setFormValues(respuestasInit)
    }

    console.log(formValuesProps)

    const {handleSubmit, resetForm, touched, errors} = useFormik({
        initialValues: {
            pregunta: formValuesProps.pregunta,
            respuesta:  formValues,
            tema: formValuesProps?.tema,
            nota: formValuesProps?.nota
        },
        enableReinitialize: true,
        onSubmit: ({pregunta, respuesta, tema, nota}) => {

            const preguntaTo = { pregunta, respuesta, tema, nota }

            if ( preguntaActiva ) {
                dispatch(actualizarPreguntaTema(preguntaTo, preguntaActiva._id))
            } else {
                dispatch(crearPreguntaTema(preguntaTo))

                setFormValuesProps(initFormProps)

                setFormValues(respuestasInit)
    
                resetForm()
            }

        },
        validationSchema: Yup.object({
            pregunta: Yup.string()
                        .min(3, 'Debe de tener 3 caracteres o más')
                        .required('Requerido'),
            respuesta: Yup.array().of(Yup.object({
                    texto: Yup.string().min(3, 'La respuesta debe de tener como mínimo 3 caracteres').required('Requerido'),
                })
            ),
            tema: Yup.string(),
            nota: Yup.string()
        })
    })

    const handleClick = () => {
        document.getElementById('handleSubmitPreguntaParaTema').click()
    }

    const handleChange = ( e ) => {
        const { name, value } = e.target

        let newFormValues = { ...formValuesProps };

        newFormValues = {
            ...newFormValues,
            [name]: value
        }

        console.log(newFormValues)

        setFormValuesProps(newFormValues)

    }

    const handleRespuestasChange = ( i, e ) => {
        const { name, value } = e.target

        let newFormValues = [...formValues];

        newFormValues[i] = {
            ...newFormValues[i],
            [name]: value
        };

        setFormValues(newFormValues);
    }

    useEffect(() => {

        if ( !preguntaActiva ) return

        setFormValuesProps({
            pregunta: preguntaActiva.pregunta,
            tema: preguntaActiva.tema,
            nota: preguntaActiva.nota
        })

        setFormValues(preguntaActiva.respuesta)
      
    }, [ preguntaActiva ])

  return (
    <Dialog
        open={ isOpen }
        fullWidth
        maxWidth = 'md'
        onClose={ handleClose }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        scroll={ 'paper' }
    >
        <DialogTitle id="alert-dialog-title">
          { ( preguntaActiva ) ? 'Actualizar Pregunta' : 'Crear nueva pregunta' }
        </DialogTitle>
        <DialogContent>
            <Box component={ 'form' } onSubmit={ handleSubmit } p={ 2 }>
                <Grid container columnSpacing={ 2 } rowSpacing={ 2 }>
                    <Grid xs={ 6 } item>
                        <TextField name='pregunta' value={ formValuesProps.pregunta } onChange={ ( e ) => handleChange(e) } maxRows={ 5 } variant='standard' fullWidth label = 'Pregunta' />
                        {touched.pregunta && errors.pregunta && <span style={{color: 'red'}}>{errors.pregunta}</span>}
                    </Grid>

                    <Grid xs={ 6 } item>
                        <TextField name='tema' value={ formValuesProps.tema } onChange={ ( e ) => handleChange(e) } variant='standard' fullWidth label = 'tema' select>
                            {
                                temas?.map( e => (
                                    <MenuItem key={ e?._id } value={ e?.tema }>{e?.tema}</MenuItem>
                                ))
                            }
                        </TextField>
                        {touched.tema && errors.tema && <span style={{color: 'red'}}>{errors.tema}</span>}
                    </Grid>

                    <Grid xs={ 12 } item>
                        <TextField multiline maxRows={ 5 } name='nota' value={ formValuesProps.nota } onChange={ ( e ) => handleChange(e) } variant='standard' fullWidth label = 'Nota' />
                        {touched.nota && errors.nota && <span style={{color: 'red'}}>{errors.nota}</span>}
                    </Grid>
                    
                    {
                        formValues.map(( respuesta, index ) => (
                                <Fragment key={index}>
                                    <Grid item xs = {10} sm = {10} md = {10} lg = {11} xl = {11} >
                                        <TextField multiline maxRows={2} name='texto' value = {respuesta.texto} onChange={e => handleRespuestasChange(index, e)} variant='standard' label = 'Respuesta' type = 'text' fullWidth />
                                        {touched?.respuesta?.filter(texto => texto?.texto) && errors.respuesta?.filter(texto => texto?.texto) && <span style={{color: 'red'}}>{errors?.respuesta[index]?.texto}</span>}
                                    </Grid>

                                    <Grid display={'flex'} justifyContent = {'center'} alignItems={ 'end' } item xs = {2} sm = {2} md = {2} lg = {1} xl = {1}>
                                        {
                                            (respuesta.correcta === true)
                                                ?
                                            <Check fontSize='medium' color='success' />
                                                :
                                            <Cancel color='error' />
                                        }
                                    </Grid>
                                </Fragment>
                            )
                        )
                    }
                </Grid>

                <button hidden id='handleSubmitPreguntaParaTema' type='submit'></button>
            </Box>
        </DialogContent>
        <DialogActions sx={{ px: 2 }}>
            <Button variant='contained' fullWidth onClick={ handleClose }>Cancelar</Button>
            <Button variant='contained' type='submit' fullWidth onClick={ handleClick }>Guardar</Button>
        </DialogActions>
    </Dialog>
  )
}

const respuestasInit = [
    { texto: '', correcta: true },
    { texto: '', correcta: false },
    { texto: '', correcta: false },
    { texto: '', correcta: false },
]

const initFormProps = {
    pregunta: '',
    tema: '',
    nota: ''
}
