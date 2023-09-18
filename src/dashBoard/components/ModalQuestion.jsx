import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, MenuItem, Modal, TextField, Tooltip, Typography } from '@mui/material'
import { Save, Add, Delete, Book, Check, Cancel } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import React, { Fragment, useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { DialogContentBible } from './DialogContentBible';
import { Antiguotestamento } from '../../Antiguotestamento';
import { Nuevotestamento } from '../../Nuevotestamento';
import { Libros } from '../../Libros';
import { actualizarPregunta } from '../../store/preguntas/thunk';
import { useResponsive } from '../../hooks/useResponsive';

const librosBiblia = [...Antiguotestamento(), ...Nuevotestamento()]
  
export const ModalQuestion = ({Show, setShow}) => {

    const dispatch = useDispatch()

    const {temas} = useSelector(state => state.tm)

    const {preguntaActiva} = useSelector(state => state.pg)

    const handleClose = () => {
        setShow(false)
    }

    const [formValues, setFormValues] = useState(
        [
            { texto: '', correcta: true },
            { texto: '', correcta: false },
            { texto: '', correcta: false },
            { texto: '', correcta: false },
        ]
    )

    const {handleSubmit, getFieldProps, touched, errors} = useFormik({
        initialValues: {
            pregunta:   preguntaActiva?.pregunta || '',
            idPregunta: preguntaActiva?.idPregunta || '',
            respuesta:  formValues,
            dificultad: preguntaActiva?.dificultad || '',
            categoria:  preguntaActiva?.categoria || '',
            testamento: preguntaActiva?.testamento || '',
            libro:      preguntaActiva?.libro || '',
            capitulo:   Number(preguntaActiva?.capitulo) || 0,
            desdeVersiculo: Number(preguntaActiva?.desdeVersiculo) || 0,
            hastaVersiculo: Number(preguntaActiva?.hastaVersiculo) || 0,
            tema: preguntaActiva?.tema ?? ''
        },
        enableReinitialize: true,
        onSubmit: ({pregunta, idPregunta, respuesta, dificultad, categoria, testamento, libro, capitulo, desdeVersiculo, hastaVersiculo, tema}) => {
            dispatch(actualizarPregunta(pregunta, idPregunta, respuesta, dificultad, categoria, testamento, libro, capitulo, desdeVersiculo, hastaVersiculo, tema))
        },
        validationSchema: Yup.object({
            pregunta: Yup.string()
                        .min(3, 'Debe de tener 3 caracteres o más')
                        .required('Requerido'),
            respuesta: Yup.array().of(Yup.object({
                    texto: Yup.string().min(3, 'La respuesta debe de tener como mínimo 3 caracteres').required('Requerido'),
                })
            ),
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
            tema: Yup.string()
        })
    })

    // Validacion para la cita bíblica
        
    const seleccionarLibro =  Libros().indexOf(getFieldProps('libro')?.value)

    const seleccionarCapitulo = getFieldProps('capitulo')?.value

    const seleccionarTestamento = getFieldProps('testamento')?.value

    const At = Libros()?.slice(0, 39)

    const Nt = Libros()?.slice(39)

    // Respuestas

    useEffect(() => {
      setFormValues(preguntaActiva?.respuesta)
    }, [preguntaActiva?.respuesta])
    

    const handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i] = {
            ...newFormValues[i],
            [e.target.name]: e.target.value
        }
        setFormValues(newFormValues);
     }
        
    //  const agregar = () => {
    //     setFormValues([...formValues, { texto: '', correcta: '' }])
    //  }
    
    // const eliminar = (i) => {
    //     let newFormValues = [...formValues];
    //     newFormValues.splice(i, 1);
    //     setFormValues(newFormValues)
    // }

    // Modal
    const [ShowDialog, setShowDialog] = useState(false)
    
    const openDialog = () => {
        setShowDialog(true)
    }
    
    // verificar cita bíblica
    const [contentBible, setContentBible] = useState()
    
    useEffect(() => {
        if (seleccionarLibro !== -1 && getFieldProps('desdeVersiculo')?.value !== '' && getFieldProps('hastaVersiculo')?.value !== '' && getFieldProps('desdeVersiculo')?.value === getFieldProps('hastaVersiculo')?.value) {
            setContentBible(librosBiblia[seleccionarLibro][seleccionarCapitulo]?.slice(getFieldProps('desdeVersiculo')?.value, getFieldProps('desdeVersiculo')?.value + 1))
        } 

        if (seleccionarLibro !== -1 && getFieldProps('desdeVersiculo')?.value !== '' && getFieldProps('hastaVersiculo')?.value !== '' && getFieldProps('desdeVersiculo')?.value !== getFieldProps('hastaVersiculo')?.value) {
            setContentBible(librosBiblia[seleccionarLibro][seleccionarCapitulo]?.slice(getFieldProps('desdeVersiculo')?.value, getFieldProps('hastaVersiculo')?.value + 1))
        }
    }, [getFieldProps('hastaVersiculo')?.value, getFieldProps('desdeVersiculo')?.value, seleccionarLibro, seleccionarCapitulo])

    const handleButton = () => {
        document.getElementById('buttomSubmitQuestion').click()
    }

    const [ respWidth ] = useResponsive()

  return (
    <Dialog
        open={Show}
        onClose={handleClose}
        fullWidth
        maxWidth = {(respWidth < 600) ?'sm' : (respWidth > 600 && respWidth < 900) ? 'md' : 'lg'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        scroll={'paper'}
    >
        <DialogTitle id="alert-dialog-title">
            Ver o actualizar pregunta
        </DialogTitle>
        <DialogContent sx = {{borderRadius: '20px'}}>
            <Box autoComplete="off">

                <form onSubmit={handleSubmit}>
                    <Grid item container flexDirection='row'>
                        <Grid flexDirection='column' container item xs = {12} sm = {12} md = {12} lg = {6} xl = {6} sx = {{padding: 3, borderRadius: 2}} >
                            <TextField error = {errors.pregunta} multiline maxRows={4} {...getFieldProps('pregunta')} variant='standard' label = 'Pregunta' type = 'text' fullWidth />
                            {touched.pregunta && errors.pregunta && <span style={{color: 'red'}}>{errors.pregunta}</span>}
                        </Grid>

                        <Grid flexDirection='column' container item xs = {6} sm = {6} md = {6} lg = {2} xl = {2} sx = {{padding: 3, borderRadius: 2}} >
                            <TextField  {...getFieldProps('tema')} variant='standard' id="select1" label="Tema" select>
                                {
                                    temas?.map( e => (
                                        <MenuItem key={ e?._id } value={ e?.tema }>{e?.tema}</MenuItem>
                                    ))
                                }
                            </TextField>
                            {touched.tema && errors.tema && <span style={{color: 'red'}}>{errors.tema}</span>}
                        </Grid>

                        <Grid flexDirection='column' container item xs = {12} sm = {12} md = {12} lg = {2} xl = {2} sx = {{padding: 3, borderRadius: 2}} >
                            <TextField inputProps={{readOnly: true}} {...getFieldProps('idPregunta')} variant='standard' label="Id Pregunta" type = 'number' />
                        </Grid>

                        <Grid flexDirection='column' container item xs = {12} sm = {12} md = {12} lg = {2} xl = {2} sx = {{padding: 3, borderRadius: 2}} >
                            <TextField 
                                error = {errors.dificultad}
                                {...getFieldProps('dificultad')} 
                                variant='standard' 
                                id="select1" 
                                label="Dificultad"
                                select
                            >
                                <MenuItem value="Tierno">Tierno</MenuItem>
                                <MenuItem value="Medio">Medio</MenuItem>
                                <MenuItem value="Avanzado">Avanzado</MenuItem>
                            </TextField>
                            {touched.dificultad && errors.dificultad && <span style={{color: 'red'}}>{errors.dificultad}</span>}
                        </Grid>

                        <Grid flexDirection='column' container item xs = {12} sm = {12} md = {12} lg = {2} xl = {2} sx = {{padding: 3, borderRadius: 2}} >
                            <TextField error = {errors.categoria} {...getFieldProps('categoria')} variant='standard' id="select2" label="Categoría" select>
                                <MenuItem value="Pentateuco">Pentateuco</MenuItem>
                                <MenuItem value="Histórico">Histórico</MenuItem>
                                <MenuItem value="Sapienciales">Sapienciales</MenuItem>
                                <MenuItem value="Profético">Proféticos</MenuItem>
                                <MenuItem value="Poético">Poético</MenuItem>
                                <MenuItem value="Epístola">Epístola</MenuItem>
                            </TextField>
                            {touched.categoria && errors.categoria && <span style={{color: 'red'}}>{errors.categoria}</span>}
                        </Grid>

                        <Grid flexDirection='column' container item xs = {12} sm = {12} md = {12} lg = {2} xl = {2} sx = {{padding: 3, borderRadius: 2}} >
                            <TextField error = {errors.testamento} {...getFieldProps('testamento')} variant='standard' id="select3" label="Testamento" select>
                                <MenuItem value="AT">Antiguo</MenuItem>
                                <MenuItem value="NT">Nuevo</MenuItem>
                            </TextField>
                            {touched.testamento && errors.testamento && <span style={{color: 'red'}}>{errors.testamento}</span>}
                        </Grid>

                        <Grid flexDirection='column' container item xs = {12} sm = {12} md = {12} lg = {2} xl = {2} sx = {{padding: 3, borderRadius: 2}} >
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

                        <Grid flexDirection='column' container item xs = {12} sm = {12} md = {12} lg = {2} xl = {2} sx = {{padding: 3, borderRadius: 2}}>
                            <TextField error = {errors.capitulo} {...getFieldProps('capitulo')} variant='standard' label='Capítulo' id="select5" select>
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

                        <Grid flexDirection='column' container item xs = {12} sm = {12} md = {12} lg = {2} xl = {2} sx = {{padding: 3, borderRadius: 2}} >
                            <TextField error = {errors.desdeVersiculo} {...getFieldProps('desdeVersiculo')} variant='standard' id="select6" label="Desde el versiculo" select>
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

                        <Grid flexDirection='column' container item xs = {12} sm = {12} md = {12} lg = {2} xl = {2} sx = {{padding: 3, borderRadius: 2}} >
                            <TextField error = {errors.hastaVersiculo} {...getFieldProps('hastaVersiculo')} variant='standard' id="select7" label="Hasta el versiculo" select>
                                <MenuItem disabled value=''>0</MenuItem>
                                {
                                    (seleccionarLibro !== -1)
                                        &&
                                    librosBiblia[seleccionarLibro][seleccionarCapitulo]?.map((_, index) => {
                                        return (
                                            <MenuItem key={_ + index} value={index + getFieldProps('desdeVersiculo').value}>{index + 1 + getFieldProps('desdeVersiculo').value}</MenuItem>
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
                                        <Grid flexDirection='column' container xs = {9} sm = {9} md = {9} lg = {8} xl = {8} sx = {{padding: 3, borderRadius: 2}} >
                                            <TextField error = {errors.respuesta} multiline maxRows={2} name='texto' value = {element.texto} onChange={(e) => handleChange(index, e)} variant='standard' label = 'Respuesta' type = 'text' fullWidth />
                                            {touched?.respuesta?.filter(texto => texto?.texto) && errors.respuesta?.filter(texto => texto?.texto) && <span style={{color: 'red'}}>{errors?.respuesta[index]?.texto}</span>}
                                        </Grid>

                                        <Grid display={'flex'} justifyContent = {'center'} flexDirection='column' container item xs = {3} sm = {3} md = {3} lg = {3} xl = {2} sx = {{padding: 3, borderRadius: 2}} >
                                            {
                                                (element.correcta === true)
                                                    ?
                                                <Check fontSize='medium' color='success' />
                                                    :
                                                <Cancel color='error' />
                                            }
                                        </Grid>

                                        {/* <Grid flexDirection='row' justifyContent='end' alignItems='end' container item xs = {2} sx = {{padding: 3, borderRadius: 2}}>
                                            {
                                                (formValues.length === index + 1)
                                                    &&
                                                <Tooltip title="Agregar otra respuesta">  
                                                    <IconButton onClick={agregar}>
                                                        <Add />
                                                    </IconButton>
                                                </Tooltip>
                                            }

                                            {
                                                (index !== 0)
                                                    &&
                                                <Tooltip title="Eliminar respuesta">
                                                    <IconButton onClick = {() => eliminar(index)}>
                                                        <Delete />
                                                    </IconButton>
                                                </Tooltip>
                                            }

                                        </Grid> */}
                                    </Fragment>
                                    
                                )
                            })
                        }
                    </Grid>

                    <Button type='submit' id='buttomSubmitQuestion' hidden></Button>
                        
                </form>

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
            {
                (getFieldProps('desdeVersiculo').value !== '')
                    &&
                <Tooltip title="Verificar cita">
                    <IconButton 
                        size='large'
                        onClick={openDialog}
                        sx={{ position: 'sticky', bottom: 16, float: 'right' }}
                    >
                        <Book fontSize='large' />
                    </IconButton>
                </Tooltip>
            }
        </DialogContent>
        <DialogActions>
            <Button fullWidth variant = 'contained' onClick={handleClose} type='button'>Cerrar</Button>
            <Button fullWidth variant = 'contained' endIcon = { <Save /> } onClick={handleButton} type='button'>Guardar</Button>
        </DialogActions>
    </Dialog>
  )
}
