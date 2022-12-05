import { ArrowBackIos, Book } from '@mui/icons-material'
import { AppBar, Box, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { Antiguotestamento } from '../../Antiguotestamento'
import { useResponsive } from '../../hooks/useResponsive'
import { Nuevotestamento } from '../../Nuevotestamento'
import { ScrollToTop } from '../../scrollToTop/ScrollToTop'
import { GuardarRecord } from '../../store/auth/thunk'
import { BorrarPregunta, SiguientePregunta } from '../../store/record/thunk'
import './Cuestionario.css'
import { DialogContentCita } from './DialogContentCita'

const librosBiblia = [...Antiguotestamento(), ...Nuevotestamento()]

export const Cuestionario = () => {

    const dispatch = useDispatch();

    const { record } = useSelector(state => state.rc);

    const { uid, usuarioActivo } = useSelector(state => state.auth);

    const recordFiltrado = record?.filter(record => record?.idJugador === uid)

    const [change, setChange] = useState(recordFiltrado[0]?.preguntaNo)

    const [response, setResponse] = useState()

    const [show, setShow] = useState(false)

    const [ShowModalContent, setShowModalContent] = useState(false)

    const [showTrue, setShowTrue] = useState(false)

    const [showCorrect, setShowCorrect] = useState(false)
    
    const [PuntosChange, setPuntosChange] = useState(recordFiltrado[0]?.puntos)

    const [enRachaDe, setEnRachaDe] = useState(recordFiltrado[0]?.racha)
    
    let filtroPreguntas = usuarioActivo?.juego?.reforzar?.filter(reforzar => reforzar?._id === recordFiltrado[0]?.preguntas[change]?._id)

    const onClick = (respuesta) => {
        if (respuesta[0]?.correcta === true) {
            dispatch(SiguientePregunta({
                id: recordFiltrado[0]?._id,
                puntos: recordFiltrado[0]?.puntos + PuntosChange,
                aciertos: recordFiltrado[0]?.aciertos + 1,
                racha: recordFiltrado[0]?.racha + 1,
                preguntaNo: recordFiltrado[0]?.preguntaNo + 1,
                errores: recordFiltrado[0]?.errores,
                reforzar: recordFiltrado[0]?.reforzar,
                record: recordFiltrado[0]
            }))

            setShow(true)
            setShowTrue(true)
            setShowCorrect(true)
        } else {
            dispatch(SiguientePregunta({
                id: recordFiltrado[0]?._id,
                puntos: recordFiltrado[0]?.puntos,
                aciertos: recordFiltrado[0]?.aciertos,
                racha: recordFiltrado[0]?.racha - recordFiltrado[0]?.racha + 1,
                preguntaNo: recordFiltrado[0]?.preguntaNo + 1,
                errores: recordFiltrado[0]?.errores + 1,
                reforzar: (filtroPreguntas?.length === 0) && [...recordFiltrado[0]?.reforzar, recordFiltrado[0]?.preguntas[change]],
                record: recordFiltrado[0]
            }))
            document.getElementById(`buttonbg${respuesta[1]}`).style.background = 'red'
            document.getElementById(`buttonbg${respuesta[1]}`).style.color = 'white'
            setShow(true)
            setShowTrue(true)
            setShowCorrect(false)
        }
    }

    const next = () => {
        if (change + 1 < recordFiltrado[0]?.preguntas?.length) {
            document.getElementById(`buttonbg${response[1]}`).style.background = 'none'
            document.getElementById(`buttonbg${response[1]}`).style.color = ''
            setChange(change + 1)
            if (showCorrect) {
                setEnRachaDe(enRachaDe + 1)
            } else {
                setEnRachaDe(recordFiltrado[0]?.racha - recordFiltrado[0]?.racha + 1)
            }
            setResponse()
            setShow(false)
            setShowTrue(false)
        } else {
            dispatch(BorrarPregunta(recordFiltrado[0]?._id))
            dispatch(GuardarRecord(recordFiltrado[0]))
        }
    }

    const salir = () => {
        Swal.fire({
            title: '¿Antes de salir te gustaría guardar la puntuación de esta ronda?',
            icon: 'warning',
            showCancelButton: true,
            customClass: {
                cancelButton: 'button-78',
                confirmButton: 'button-78'
            },  
            cancelButtonText: 'No',
            confirmButtonColor: 'rgba(33,93,59,255)',
            cancelButtonColor: 'rgba(33,93,59,255)',
            confirmButtonText: 'Si'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(BorrarPregunta(recordFiltrado[0]?._id))
                dispatch(GuardarRecord(recordFiltrado[0]))
            } else {
                dispatch(BorrarPregunta(recordFiltrado[0]?._id))
            }
          })
    }

    const [contentBible, setContentBible] = useState()

    useEffect(() => {
        if (recordFiltrado[0]?.preguntas[change]?.desdeVersiculo !== '' && recordFiltrado[0]?.preguntas[change]?.hastaVersiculo !== '' && recordFiltrado[0]?.preguntas[change]?.desdeVersiculo === recordFiltrado[0]?.preguntas[change]?.hastaVersiculo) {
            setContentBible(librosBiblia[recordFiltrado[0]?.preguntas[change]?.idLibro][recordFiltrado[0]?.preguntas[change]?.capitulo]?.slice(recordFiltrado[0]?.preguntas[change]?.desdeVersiculo, Number(recordFiltrado[0]?.preguntas[change]?.desdeVersiculo) + 1))
        }

        if (recordFiltrado[0]?.preguntas[change]?.desdeVersiculo !== '' && recordFiltrado[0]?.preguntas[change]?.hastaVersiculo !== '' && recordFiltrado[0]?.preguntas[change]?.desdeVersiculo !== recordFiltrado[0]?.preguntas[change]?.hastaVersiculo) {
            setContentBible(librosBiblia[recordFiltrado[0]?.preguntas[change].idLibro][recordFiltrado[0]?.preguntas[change]?.capitulo]?.slice(recordFiltrado[0]?.preguntas[change]?.desdeVersiculo, Number(recordFiltrado[0]?.preguntas[change].hastaVersiculo) + 1))
        }
    }, [recordFiltrado[0]?.preguntas[change]?.hastaVersiculo, recordFiltrado[0]?.preguntas[change]?.desdeVersiculo])

    const respuestasAleatorias = [...recordFiltrado[0]?.preguntas[change]?.respuesta].sort((a, b) => {
        const nameA = a.texto.toUpperCase(); // ignore upper and lowercase
        const nameB = b.texto.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        // names must be equal
        return 0;
    })

    const [colorChange, setColorChange] = useState()

    useEffect(() => {
      if (recordFiltrado[0]?.preguntas[change]?.dificultad === 'Tierno') {
        setColorChange('info')
        setPuntosChange(1 * recordFiltrado[0]?.racha)
      }

      if (recordFiltrado[0]?.preguntas[change]?.dificultad === 'Medio') {
        setColorChange('warning')
        setPuntosChange(2 * recordFiltrado[0]?.racha)
      }

      if (recordFiltrado[0]?.preguntas[change]?.dificultad === 'Avanzado') {
        setColorChange('danger')
        setPuntosChange(3 * recordFiltrado[0]?.racha)
      }
    }, [recordFiltrado[0]?.preguntas[change]?.dificultad, recordFiltrado[0]?.preguntas[change]?.pregunta])

    const [respWidth] = useResponsive()

    useEffect(() => {
      const elementoScroll = document?.getElementById('preguntaScroll')
      elementoScroll.scrollIntoView({block: 'start'})
    }, [change])
    
  return (
    <>
        <ScrollToTop change = {change} />
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                {/* <Toolbar> */}
                    <Grid p={4}>
                        <Grid style={{justifyContent: 'space-between', flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
                            <IconButton onClick={salir}>
                                <ArrowBackIos />
                            </IconButton>
                            <Typography variant='h5' color = 'white'>{change + 1} / {recordFiltrado[0]?.preguntas?.length}</Typography>
                            <Typography variant='h5' color = 'white'>{usuarioActivo?.name}</Typography>
                            <Typography variant='h5' color = 'white'>Puntos: {recordFiltrado[0]?.puntos}</Typography>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid xs = {5} sm = {4} md = {4} lg = {3} xl = {3}>
                                <Typography variant='h6' mt = {4} mb = {4} color = {'white'}>Racha de: {enRachaDe}x</Typography>
                            </Grid>

                            <Grid xs = {7} sm = {8} md = {8} lg = {9} xl = {9} display = {'flex'} justifyContent = {'end'} my = {'auto'}>
                                {
                                    (show)
                                        ?
                                    <>
                                        <Typography variant='h6' className={`${(showCorrect) ? 'text-success' : 'text-danger'} mr-2 my-auto`} style={{fontSize: '25px'}}>{(showCorrect) ? 'Correcta' : 'Incorrecta'}</Typography>
                                        <i style={{fontSize: '30px'}} className={`${(showCorrect) ? 'text-success bi-check-circle-fill' : 'text-danger bi bi-x-circle-fill'}`}></i>
                                    </>
                                        :
                                    <i style={{fontSize: '30px'}} className="text-white bi bi-question-circle-fill"></i>
                                }
                            </Grid>
                        </Grid>

                        <hr style = {{color: 'white'}} />

                        <Grid container>
                            <Grid xs = {12} style={{maxHeight: '150px', overflowY: 'auto'}}>
                                <Typography variant = 'h5' id='preguntaScroll' my={2} color={'white'} style={{textAlign: 'justify'}}>{recordFiltrado[0]?.preguntas[change]?.pregunta} <span style={{borderRadius: '20px', fontSize: '18px'}} className={`${(respWidth <= 600) ? 'p-1': 'p-2'} bg-${colorChange}`}>{recordFiltrado[0]?.preguntas[change]?.dificultad}</span> </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                {/* </Toolbar> */}
            </AppBar>
        </Box>

        <Grid container>
            {
                respuestasAleatorias.map((respuesta, index) => {
                    return (
                        <Grid p={2} xs = {12} sm = {12} md = {12} lg = {6} xl = {6} key={respuesta + index}>
                            <Grid p={1} display = {'flex'} alignItems = 'center' onClick={() => setResponse([respuesta, `${index + 1}`])} style={{cursor: 'pointer', maxHeight: '150px', overflowY: 'auto', backgroundColor: (response) && (Number(response[1]) === index + 1 && !show) && 'rgb(16, 125, 197)', borderRadius: '20px', margin: 0}}>
                                <Button variant='contained'>
                                    {index + 1}
                                </Button>
                                
                                <Typography variant = 'h6' id = {`buttonbg${index + 1}`} className={`${(showTrue && respuesta?.correcta === true) && 'bg-success'} ml-2 my-auto p-2`} style={{borderRadius: '20px'}}>
                                    {respuesta.texto}
                                </Typography>
                            </Grid>
                        </Grid>
                    )
                })
            }

            {
                (respWidth >= 600)
                    ?
                <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                    <Toolbar>
                        <Box p={3} sx={{ flexGrow: 1 }} component = {'div'}>

                            <Grid container display={'flex'} justifyContent = {'end'}>
                                {
                                    (response)
                                        &&
                                    <Button hidden = {show} onClick={() => onClick(response)} variant='contained'>Responder</Button>
                                }
                            </Grid>

                            <Grid display={'flex'} justifyContent = {'space-between'}>
                                {
                                    (show)
                                        &&
                                    <Button variant='contained' endIcon = {<Book />} onClick={() => setShowModalContent(true)}>
                                        {
                                            (recordFiltrado[0]?.preguntas[change]?.desdeVersiculo === recordFiltrado[0]?.preguntas[change]?.hastaVersiculo)
                                                ?
                                            <Typography className='textCard1' variant='subtitle2' color={'white'} component={'span'}>Ver cita: {recordFiltrado[0]?.preguntas[change]?.libro} {Number(recordFiltrado[0]?.preguntas[change]?.capitulo) + 1}:{Number(recordFiltrado[0]?.preguntas[change]?.desdeVersiculo) + 1}</Typography>
                                                :
                                            <Typography className='textCard1' variant='subtitle2' color={'white'} component={'span'}>Ver cita: {recordFiltrado[0]?.preguntas[change]?.libro} {Number(recordFiltrado[0]?.preguntas[change]?.capitulo) + 1}:{Number(recordFiltrado[0]?.preguntas[change]?.desdeVersiculo) + 1}-{Number(recordFiltrado[0]?.preguntas[change]?.hastaVersiculo) + 1}</Typography>
                                        }
                                    </Button>
                                }

                                {
                                    (show)
                                        &&
                                    <Button variant='contained' onClick={next}>
                                        Siguiente
                                    </Button>
                                }
                            </Grid>

                        </Box>
                    </Toolbar>
                </AppBar>
                    :
                <Box mt={35}>
                    {
                        (response)
                            &&
                        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                            <Toolbar>
                                <Box p={3} sx={{ flexGrow: 1 }} component = {'div'}>

                                    <Grid container display={'flex'} justifyContent = {'end'}>
                                        {
                                            (response)
                                                &&
                                            <Button hidden = {show} onClick={() => onClick(response)} variant='contained'>Responder</Button>
                                        }
                                    </Grid>

                                    <Grid display={'flex'} justifyContent = {'space-between'}>
                                        {
                                            (show)
                                                &&
                                            <Button variant='contained' endIcon = {<Book />} onClick={() => setShowModalContent(true)}>
                                                {
                                                    (recordFiltrado[0]?.preguntas[change]?.desdeVersiculo === recordFiltrado[0]?.preguntas[change]?.hastaVersiculo)
                                                        ?
                                                    <Typography className='textCard1' variant='subtitle2' color={'white'} component={'span'}>Ver cita: {recordFiltrado[0]?.preguntas[change]?.libro} {Number(recordFiltrado[0]?.preguntas[change]?.capitulo) + 1}:{Number(recordFiltrado[0]?.preguntas[change]?.desdeVersiculo) + 1}</Typography>
                                                        :
                                                    <Typography className='textCard1' variant='subtitle2' color={'white'} component={'span'}>Ver cita: {recordFiltrado[0]?.preguntas[change]?.libro} {Number(recordFiltrado[0]?.preguntas[change]?.capitulo) + 1}:{Number(recordFiltrado[0]?.preguntas[change]?.desdeVersiculo) + 1}-{Number(recordFiltrado[0]?.preguntas[change]?.hastaVersiculo) + 1}</Typography>
                                                }
                                            </Button>
                                        }

                                        {
                                            (show)
                                                &&
                                            <Button variant='contained' onClick={next}>
                                                Siguiente
                                            </Button>
                                        }
                                    </Grid>

                                </Box>
                            </Toolbar>
                        </AppBar>
                    }
                </Box>
            }

        </Grid>

        <DialogContentCita
            ShowDialog = {ShowModalContent}
            setShowDialog = {setShowModalContent}
            content = {contentBible} 
            capitulo = {recordFiltrado[0]?.preguntas[change]?.capitulo} 
            libro = {recordFiltrado[0]?.preguntas[change]?.libro} 
            inicio = {recordFiltrado[0]?.preguntas[change]?.desdeVersiculo} 
            fin 
        />
    </>
  )
}
