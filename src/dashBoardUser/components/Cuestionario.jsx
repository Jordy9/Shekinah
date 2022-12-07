import { ArrowBackIos, Book, Cancel, Check, MusicNote, MusicOff } from '@mui/icons-material'
import { AppBar, Box, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { Antiguotestamento } from '../../Antiguotestamento'
import { soundLose, soundWin } from '../../helpers/sounds'
import { useResponsive } from '../../hooks/useResponsive'
import { Nuevotestamento } from '../../Nuevotestamento'
import { ScrollToTop } from '../../scrollToTop/ScrollToTop'
import { Spinner } from '../../Spinner'
import { GuardarRecord } from '../../store/auth/thunk'
import { BorrarPregunta, SiguientePregunta } from '../../store/record/thunk'
import { Resultados } from '../pages/Resultados'
import './Cuestionario.css'
import { DialogContentCita } from './DialogContentCita'

const librosBiblia = [...Antiguotestamento(), ...Nuevotestamento()]

export const Cuestionario = ({showResultados, setShowResultados}) => {

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

    const initialSound = localStorage.getItem('sound')

    const [playSound, setPlaySound] = useState(!!initialSound)
    
    // let filtroPreguntas = usuarioActivo?.juego?.reforzar?.filter(reforzar => reforzar?._id === recordFiltrado[0]?.preguntas[change]?._id)

    const onClick = (respuesta) => {
        if (respuesta[0]?.correcta === true) {
            if (playSound) {
                soundWin()
            }
            dispatch(SiguientePregunta({
                id: recordFiltrado[0]?._id,
                puntos: recordFiltrado[0]?.puntos + PuntosChange,
                aciertos: recordFiltrado[0]?.aciertos + 1,
                racha: recordFiltrado[0]?.racha + 1,
                preguntaNo: recordFiltrado[0]?.preguntaNo + 1,
                errores: recordFiltrado[0]?.errores,
                // reforzar: recordFiltrado[0]?.reforzar,
                record: recordFiltrado[0]
            }))

            setShow(true)
            setShowTrue(true)
            setShowCorrect(true)
        } else {
            if (playSound) {
                soundLose()
            }
            dispatch(SiguientePregunta({
                id: recordFiltrado[0]?._id,
                puntos: recordFiltrado[0]?.puntos,
                aciertos: recordFiltrado[0]?.aciertos,
                racha: recordFiltrado[0]?.racha - recordFiltrado[0]?.racha + 1,
                preguntaNo: recordFiltrado[0]?.preguntaNo + 1,
                errores: recordFiltrado[0]?.errores + 1,
                // reforzar: (filtroPreguntas?.length === 0) && [...recordFiltrado[0]?.reforzar, recordFiltrado[0]?.preguntas[change]],
                record: recordFiltrado[0]
            }))
            document.getElementById(`buttonbg${respuesta[1]}`).style.background = '#FF1744'
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
            setShowResultados(true)
            // dispatch(BorrarPregunta(recordFiltrado[0]?._id))
            // dispatch(GuardarRecord(recordFiltrado[0]))
        }
    }

    const temaColor = localStorage.getItem('tema') || usuarioActivo?.tema

    const salir = () => {
        Swal.fire({
            title: '¿Estás seguro de que deseas abandonar esta ronda?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'No',
            confirmButtonColor: temaColor,
            cancelButtonColor: temaColor,
            confirmButtonText: 'Si'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(BorrarPregunta(recordFiltrado[0]?._id))
                dispatch(GuardarRecord(recordFiltrado[0]))
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
        setColorChange('info.main')
        setPuntosChange(1 * recordFiltrado[0]?.racha)
      }

      if (recordFiltrado[0]?.preguntas[change]?.dificultad === 'Medio') {
        setColorChange('#f57c00')
        setPuntosChange(2 * recordFiltrado[0]?.racha)
      }

      if (recordFiltrado[0]?.preguntas[change]?.dificultad === 'Avanzado') {
        setColorChange('error.main')
        setPuntosChange(3 * recordFiltrado[0]?.racha)
      }
    }, [recordFiltrado[0]?.preguntas[change]?.dificultad, recordFiltrado[0]?.preguntas[change]?.pregunta])

    const [respWidth] = useResponsive()

    useEffect(() => {
      const elementoScroll = document?.getElementById('preguntaScroll')
      elementoScroll.scrollIntoView({block: 'start'})
    }, [change])

    const handleSound = (sound) => {
        setPlaySound(sound)
        localStorage.setItem('sound', sound)
    }

    if (recordFiltrado?.length === 0) {
        return <Spinner />
    }
    
  return (
    <>
        <ScrollToTop change = {change} />
        {
            (!showResultados)
                ?
            <>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        {/* <Toolbar> */}
                            <Grid p={4}>
                                <Grid style={{justifyContent: 'space-between', flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
                                    <IconButton onClick={salir}>
                                        <ArrowBackIos sx = {{color: 'secondary.main'}} />
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
                                                &&
                                            <>
                                                <Typography px={1} variant='h6' sx = {{fontSize: '25px', backgroundColor: (showCorrect) ? '#215d3bd9' : 'error.main', borderRadius: '20px'}}>{(showCorrect) ? 'Correcta' : 'Incorrecta'}</Typography>
                                            </>
                                        }

                                        <IconButton color='secondary' onClick={() => handleSound(!playSound)}>
                                            {
                                                (!playSound)
                                                    ?
                                                <MusicOff />
                                                    :
                                                <MusicNote />
                                            }
                                        </IconButton>
                                    </Grid>
                                </Grid>

                                <hr style = {{color: 'white'}} />

                                <Grid container>
                                    <Grid xs = {12} style={{maxHeight: '150px', overflowY: 'auto'}}>
                                        <Typography variant = 'h5' id='preguntaScroll' my={2} style={{textAlign: 'justify'}}>{recordFiltrado[0]?.preguntas[change]?.pregunta} <Typography p={0.7} component={'span'} sx = {{backgroundColor: colorChange, borderRadius: '20px', fontSize: '18px'}}>{recordFiltrado[0]?.preguntas[change]?.dificultad}</Typography> </Typography>
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
                                    <Grid p={1} display = {'flex'} alignItems = 'center' onClick={() => setResponse([respuesta, `${index + 1}`])} sx={{cursor: 'pointer', maxHeight: '150px', overflowY: 'auto', backgroundColor: (response) && (Number(response[1]) === index + 1 && !show) && 'warning.main', color: (response) && (Number(response[1]) === index + 1 && !show) && 'secondary.main', borderRadius: '20px', margin: 0}}>
                                        <Button variant='contained'>
                                            {index + 1}
                                        </Button>
                                        
                                        <Typography ml={1} px = {1} variant = 'h6' id = {`buttonbg${index + 1}`} className={`${(showTrue && respuesta?.correcta === true) && 'bg-success'}`} style={{borderRadius: '20px'}}>
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
                                            (response && !show)
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
                                                    (response && !show)
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
            </>
                :
            <Resultados />
        }

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
