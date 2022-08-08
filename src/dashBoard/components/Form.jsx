import { Add, Delete, Book, Save } from '@mui/icons-material'
import { Box, Button, Grid, IconButton, MenuItem, TextField, Tooltip, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { Libros } from '../../Libros';
import { Nuevotestamento } from '../../Nuevotestamento';
import { Antiguotestamento } from '../../Antiguotestamento';
import { DialogContentBible } from './DialogContentBible';
import { crearPregunta } from '../../store/preguntas/thunk';
import { useDispatch } from 'react-redux'

const librosBiblia = [...Antiguotestamento(), ...Nuevotestamento()]

export const Form = () => {

    const dispatch = useDispatch()

    const [formValues, setFormValues] = useState([{ texto: '', correcta: '' }])

    const {handleSubmit, resetForm, getFieldProps, touched, errors} = useFormik({
        initialValues: {
            pregunta:   '',
            respuesta:  formValues,
            dificultad: '',
            categoria:  '',
            testamento: '',
            libro:      '',
            capitulo:   '',
            desdeVersiculo: '',
            hastaVersiculo: '',
        },
        enableReinitialize: true,
        onSubmit: ({pregunta, respuesta, dificultad, categoria, testamento, libro, capitulo, desdeVersiculo, hastaVersiculo}) => {
            dispatch(crearPregunta(pregunta, respuesta, dificultad, categoria, testamento, libro, capitulo, desdeVersiculo, hastaVersiculo))

            resetForm({
                pregunta:   '',
                dificultad: '',
                categoria:  '',
                testamento: '',
                libro:      '',
                capitulo:   '',
                desdeVersiculo: '',
                hastaVersiculo: '',
            })

            setFormValues([{ texto: '', correcta: '' }])
        },
        validationSchema: Yup.object({
            pregunta: Yup.string()
                        .min(3, 'Debe de tener 3 caracteres o más')
                        .required('Requerido'),
            respuesta: Yup.array()
                        .required('Requerido'),
            dificultad: Yup.string()
                        .required('Requerido'),
            categoria: Yup.string()
                        .required('Requerido'),
            testamento: Yup.string()
                        .required('Requerido'),
            libro: Yup.string()
                        .required('Requerido'),
            capitulo: Yup.string()
                        .required('Requerido'),
            desdeVersiculo: Yup.string()
                        .required('Requerido'),
            hastaVersiculo: Yup.string()
                        .required('Requerido'),
        })
    })
        
    const seleccionarLibro =  Libros().indexOf(getFieldProps('libro')?.value)

    const seleccionarCapitulo = getFieldProps('capitulo')?.value

    const seleccionarTestamento = getFieldProps('testamento')?.value

    const At = Libros()?.slice(0, 39)

    const Nt = Libros()?.slice(39)

    // Respuestas

    const handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
     }
        
    const agregar = () => {
        setFormValues([...formValues, { texto: '', correcta: '' }])
     }
    
    const eliminar = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    // verificar cita bíblica

    const [ShowDialog, setShowDialog] = useState(false)

    const openDialog = () => {
        setShowDialog(true)
    }

    const [contentBible, setContentBible] = useState()


    useEffect(() => {
        if (seleccionarLibro !== -1 && getFieldProps('desdeVersiculo')?.value !== '' && getFieldProps('hastaVersiculo')?.value !== '' && getFieldProps('desdeVersiculo')?.value === getFieldProps('hastaVersiculo')?.value) {
            setContentBible(librosBiblia[seleccionarLibro][seleccionarCapitulo]?.slice(getFieldProps('desdeVersiculo')?.value, getFieldProps('desdeVersiculo')?.value))
        } 

        if (seleccionarLibro !== -1 && getFieldProps('desdeVersiculo')?.value !== '' && getFieldProps('hastaVersiculo')?.value !== '' && getFieldProps('desdeVersiculo')?.value !== getFieldProps('hastaVersiculo')?.value) {
            setContentBible(librosBiblia[seleccionarLibro][seleccionarCapitulo]?.slice(getFieldProps('desdeVersiculo')?.value, getFieldProps('hastaVersiculo')?.value))
        }
    }, [getFieldProps('hastaVersiculo')?.value, getFieldProps('desdeVersiculo')?.value])
    
  return (
    <Box autoComplete="off" sx={{p: 4}}>

        <Typography variant='h4'>Crear Pregunta</Typography>
       
       <form onSubmit={handleSubmit}>
            <Grid item container flexDirection='row'>
                <Grid flexDirection='column' container item xs = {12} sm = {12} md = {12} lg = {8} xl = {8} sx = {{padding: 3, borderRadius: 2}} >
                    <TextField error = {errors.pregunta} multiline maxRows={4} {...getFieldProps('pregunta')} variant='standard' label = 'Pregunta' type = 'text' fullWidth />
                    {touched.pregunta && errors.pregunta && <span style={{color: 'red'}}>{errors.pregunta}</span>}
                </Grid>

                <Grid flexDirection='column' container item xs = {6} sm = {6} md = {6} lg = {2} xl = {2} sx = {{padding: 3, borderRadius: 2}} >
                    <TextField error = {errors.dificultad} {...getFieldProps('dificultad')} variant='standard' id="select1" label="Dificultad" select>
                        <MenuItem value="Tierno">Tierno</MenuItem>
                        <MenuItem value="Medio">Medio</MenuItem>
                        <MenuItem value="Avanzado">Avanzado</MenuItem>
                    </TextField>
                    {touched.dificultad && errors.dificultad && <span style={{color: 'red'}}>{errors.dificultad}</span>}
                </Grid>

                <Grid flexDirection='column' container item xs = {6} sm = {6} md = {6} lg = {2} xl = {2} sx = {{padding: 3, borderRadius: 2}} >
                    <TextField error = {errors.categoria} {...getFieldProps('categoria')} variant='standard' id="select2" label="Categoría" select>
                        <MenuItem value="Pentateuco">Pentateuco</MenuItem>
                        <MenuItem value="Histórico">Histórico</MenuItem>
                        <MenuItem value="Sapienciales">Sapienciales</MenuItem>
                        <MenuItem value="Proféticos">Proféticos</MenuItem>
                        <MenuItem value="Epístola">Epístola</MenuItem>
                    </TextField>
                    {touched.categoria && errors.categoria && <span style={{color: 'red'}}>{errors.categoria}</span>}
                </Grid>

                <Grid flexDirection='column' container item xs = {6} sm = {6} md = {6} lg = {2} xl = {2} sx = {{padding: 3, borderRadius: 2}} >
                    <TextField error = {errors.testamento} {...getFieldProps('testamento')} variant='standard' id="select3" label="Testamento" select>
                        <MenuItem value="AT">Antiguo</MenuItem>
                        <MenuItem value="NT">Nuevo</MenuItem>
                    </TextField>
                    {touched.testamento && errors.testamento && <span style={{color: 'red'}}>{errors.testamento}</span>}
                </Grid>

                <Grid flexDirection='column' container item xs = {6} sm = {6} md = {6} lg = {2} xl = {2} sx = {{padding: 3, borderRadius: 2}} >
                    <TextField error = {errors.libro} {...getFieldProps('libro')} variant='standard' id="select4" label="Libro" select>
                        <MenuItem disabled value=''>Ninguno</MenuItem>
                        {
                            (seleccionarTestamento === 'AT')
                                &&
                            At?.map((libro, index) => {
                                return (
                                    <MenuItem key={libro + index} value={libro}>{libro}</MenuItem>
                                )
                            })
                        }

                        {
                            (seleccionarTestamento === 'NT')
                                &&
                            Nt?.map((libro, index) => {
                                return (
                                    <MenuItem key={libro + index} value={libro}>{libro}</MenuItem>
                                )
                            })
                        }
                    </TextField>
                    {touched.libro && errors.libro && <span style={{color: 'red'}}>{errors.libro}</span>}
                </Grid>

                <Grid flexDirection='column' container item xs = {6} sm = {6} md = {6} lg = {2} xl = {2} sx = {{padding: 3, borderRadius: 2}} >
                    <TextField error = {errors.capitulo} {...getFieldProps('capitulo')} variant='standard' id="select5" label="Capítulo" select>
                        <MenuItem disabled value=''>0</MenuItem>
                        {
                            librosBiblia[seleccionarLibro]?.map((_, index) => {
                                return (
                                    <MenuItem key={_ + index} value={index}>{index + 1}</MenuItem>
                                )
                            })
                        }
                    </TextField>
                    {touched.capitulo && errors.capitulo && <span style={{color: 'red'}}>{errors.capitulo}</span>}
                </Grid>

                <Grid flexDirection='column' container item xs = {6} sm = {6} md = {6} lg = {3} xl = {3} sx = {{padding: 3, borderRadius: 2}} >
                    <TextField error = {errors.desdeVersiculo} {...getFieldProps('desdeVersiculo')} variant='standard' id="select6" label="Desde el versiculo"  select>
                        <MenuItem disabled value=''>0</MenuItem>
                        {
                            (seleccionarLibro !== -1)
                                &&
                            librosBiblia[seleccionarLibro][seleccionarCapitulo]?.map((_, index) => {
                                return (
                                    <MenuItem key={_ + index} value={index}>{index + 1}</MenuItem>
                                )
                            })
                        }
                    </TextField>
                    {touched.desdeVersiculo && errors.desdeVersiculo && <span style={{color: 'red'}}>{errors.desdeVersiculo}</span>}
                </Grid>

                <Grid flexDirection='column' container item xs = {12} sm = {12} md = {12} lg = {3} xl = {3} sx = {{padding: 3, borderRadius: 2}} >
                    <TextField error = {errors.hastaVersiculo} {...getFieldProps('hastaVersiculo')} variant='standard' id="select7" label="Hasta el versiculo" select>
                        <MenuItem disabled value=''>0</MenuItem>
                        {
                            (seleccionarLibro !== -1)
                                &&
                            librosBiblia[seleccionarLibro][seleccionarCapitulo]?.map((_, index) => {
                                return (
                                    <MenuItem key={_ + index} value={index + 1 + getFieldProps('desdeVersiculo').value}>{index + 1 + getFieldProps('desdeVersiculo').value}</MenuItem>
                                )
                            })
                        }
                    </TextField>
                    {touched.hastaVersiculo && errors.hastaVersiculo && <span style={{color: 'red'}}>{errors.hastaVersiculo}</span>}
                </Grid>

                {
                    formValues?.map((element, index) => {
                        return (
                            <Fragment key={element + index}>
                                <Grid flexDirection='column' container item xs = {12} sm = {12} md = {12} lg = {8} xl = {8} sx = {{padding: 3, borderRadius: 2}} >
                                    <TextField error = {errors.respuesta} multiline maxRows={2} name='texto' value = {element.texto} onChange={e => handleChange(index, e)} variant='standard' label = 'Respuesta' type = 'text' fullWidth />
                                    {touched.respuesta && errors.respuesta && <span style={{color: 'red'}}>{errors.respuesta}</span>}
                                </Grid>

                                <Grid flexDirection='column' container item xs = {9} sm = {9} md = {9} lg = {2} xl = {2} sx = {{padding: 3, borderRadius: 2}} >
                                    <TextField error = {errors.respuesta} name='correcta' value = {element.correcta} onChange={e => handleChange(index, e)} variant='standard' id="select9" label="Acción" select>
                                        <MenuItem value={true}>Correcta</MenuItem>
                                        <MenuItem value={false}>Incorrecta</MenuItem>
                                    </TextField>
                                    {touched.respuesta && errors.respuesta && <span style={{color: 'red'}}>{errors.respuesta}</span>}
                                </Grid>

                                <Grid flexDirection='row' justifyContent='end' alignItems='end' container item xs = {2} sx = {{padding: 3, borderRadius: 2}}>
                                    {
                                        (formValues.length === index + 1)
                                            &&
                                        <Tooltip title="Agregar otra respuesta">  
                                            <IconButton color='secondary' onClick={agregar}>
                                                <Add />
                                            </IconButton>
                                        </Tooltip>
                                    }

                                    {
                                        (index !== 0)
                                            &&
                                        <Tooltip title="Eliminar respuesta">
                                            <IconButton color='secondary' onClick = {() => eliminar(index)}>
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                    }

                                </Grid>
                            </Fragment>
                            
                        )
                    })
                }
            </Grid>

            <Grid item container justifyContent='center'>
                <Button type='submit' size='large' endIcon = { <Save /> } variant="contained">Guardar Pregunta</Button>
            </Grid>
                
       </form>

       {
            (getFieldProps('desdeVersiculo').value !== '')
                &&
            <Tooltip title="Verificar cita">
                <IconButton 
                    size='large'
                    onClick={openDialog}
                    sx={{ position: 'fixed', bottom: 16, right: 16 }}
                >
                    <Book fontSize='large' />
                </IconButton>
            </Tooltip>
       }


        {
            (seleccionarLibro !== -1)
                &&
            <DialogContentBible 
                ShowDialog = {ShowDialog} 
                setShowDialog = {setShowDialog} 
                content = {contentBible} 
                capitulo = {getFieldProps('capitulo')?.value} 
                libro = {getFieldProps('libro')?.value}
                inicio = {getFieldProps('desdeVersiculo').value}
                fin = {getFieldProps('hastaVersiculo').value}
            />
        }

    </Box>
  )
}
