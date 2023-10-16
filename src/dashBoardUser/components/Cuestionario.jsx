import { ArrowBackIos, ArrowForwardIos, MusicNote, MusicOff, QuestionAnswer } from '@mui/icons-material'
import { AppBar, Box, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { Antiguotestamento } from '../../Antiguotestamento'
import { soundLose, soundWin } from '../../helpers/sounds'
import { useResponsive } from '../../hooks/useResponsive'
import { Nuevotestamento } from '../../Nuevotestamento'
import { Spinner } from '../../Spinner'
import { GuardarRecord } from '../../store/auth/thunk'
import { BorrarPregunta, SiguientePregunta } from '../../store/record/thunk'
import { Resultados } from '../pages/Resultados'
import './Cuestionario.css'
import { DialogContentCita } from './DialogContentCita'
import { ButtonShowDialog } from './ButtonShowDialog'
import { RespuestasAnteriores } from './RespuestasAnteriores'
import { RespuestaActualOSiguientes } from './RespuestaActualOSiguientes'
import { ButtonNavigationQuestions } from './ButtonNavigationQuestions'

const librosBiblia = [...Antiguotestamento(), ...Nuevotestamento()]

export const Cuestionario = ({showResultados, setShowResultados}) => {

    const dispatch = useDispatch();

    const { record } = useSelector(state => state.rc);

    const { usuarioActivo } = useSelector(state => state.auth);

    const [change, setChange] = useState(record?.preguntaNo)

    const [response, setResponse] = useState()

    const [show, setShow] = useState(false)

    const [ShowModalContent, setShowModalContent] = useState(false)

    const [selected, setselected] = useState(null)

    const [showTrue, setShowTrue] = useState(false)

    const [showCorrect, setShowCorrect] = useState(false)
    
    const [PuntosChange, setPuntosChange] = useState(record?.puntos)

    const [enRachaDe, setEnRachaDe] = useState(record?.racha)

    const initialSound = localStorage.getItem('sound')

    const [playSound, setPlaySound] = useState(!!initialSound)

    const tipo = record?.preguntas[change]?.tipo
    
    const onClick = (respuesta) => {
        if (respuesta[0]?.correcta === true) {
            if (playSound) {
                soundWin()
            }

            dispatch(SiguientePregunta({
                id: record?._id,
                puntos: record?.puntos + PuntosChange,
                aciertos: record?.aciertos + 1,
                racha: record?.racha + 1,
                preguntaNo: record?.preguntaNo + 1,
                errores: record?.errores,
                record: record,
                seleccionadas: [ ...record?.seleccionadas, selected ] 
            }))

            setShow(true)
            setShowTrue(true)
            setShowCorrect(true)
        } else {
            if (playSound) {
                soundLose()
            }
            dispatch(SiguientePregunta({
                id: record?._id,
                puntos: record?.puntos,
                aciertos: record?.aciertos,
                racha: record?.racha - record?.racha + 1,
                preguntaNo: record?.preguntaNo + 1,
                errores: record?.errores + 1,
                record: record,
                seleccionadas: [ ...record?.seleccionadas, selected ] 
            }))
            setShow(true)
            setShowTrue(true)
            setShowCorrect(false)
        }
    }

    const [contentBible, setContentBible] = useState()

    const next = () => {
        if (change + 1 < record?.preguntas?.length) {
            setChange(change + 1)
            if (showCorrect) {
                setEnRachaDe(enRachaDe + 1)
            } else {
                setEnRachaDe(record?.racha - record?.racha + 1)
            }
            setResponse()
            setShow(false)
            setShowTrue(false)
            setContentBible()
        } else {
            setShowResultados(true)
        }
    }

    const nextForward = () => {
        if ( change === record.preguntaNo ) return

        setChange((prev) => prev + 1)
    }

    const DissabledToSelect = ( change >= record.preguntaNo ) ? false : true

    const handleResponse = ( respuesta, index, respuestas) => {
        if ( DissabledToSelect ) return

        if ( !response || Number(response[1]) !== index + 1 ) {
            const bottonIndexCorrecta = respuestas.findIndex( rp => rp.correcta === true )
    
            setselected({
                preguntaNo: record?.preguntaNo,
                preguntaId: record.preguntas[change]._id,
                bottonIndexSelected: index,
                bottonIndexCorrecta,
                respuesta
            })
    
            setResponse([respuesta, `${index + 1}`])
        } else {
            setResponse()
            setselected(null)
        }

    }

    const prev = () => {
        
        if ( change === 0 ) return

        if ( selected || response ) {
            setResponse()
            setselected(null)
        }

        setChange((prev) => prev - 1)

    }

    const temaColor = usuarioActivo?.tema || localStorage.getItem('tema')

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
                dispatch(BorrarPregunta(record?._id))
                dispatch(GuardarRecord(record))
            }
          })
    }

    useEffect(() => {

        if ( tipo === 'Tema' ) {
            setContentBible(record?.preguntas[change]?.nota)
        } else {
            if ( record?.preguntas[change]?.desdeVersiculo === record?.preguntas[change]?.hastaVersiculo ) {
                setContentBible(librosBiblia[record?.preguntas[change]?.idLibro][record?.preguntas[change]?.capitulo]?.slice(record?.preguntas[change]?.desdeVersiculo, Number(record?.preguntas[change]?.desdeVersiculo) + 1))
            }
    
            if ( record?.preguntas[change]?.desdeVersiculo !== record?.preguntas[change]?.hastaVersiculo ) {
                setContentBible(librosBiblia[record?.preguntas[change]?.idLibro][record?.preguntas[change]?.capitulo]?.slice(record?.preguntas[change]?.desdeVersiculo, Number(record?.preguntas[change]?.hastaVersiculo) + 1))
            }
        }

    }, [change, record.preguntas, tipo, record])

    const recordRespuestas = [ ...record?.preguntas[change]?.respuesta ]

    const [colorChange, setColorChange] = useState()

    useEffect(() => {
      if (record?.preguntas[change]?.dificultad === 'Tierno') {
        setColorChange('#0288d1')
        setPuntosChange(1 * record?.racha)
      }

      if (record?.preguntas[change]?.dificultad === 'Medio') {
        setColorChange('#f57c00')
        setPuntosChange(2 * record?.racha)
      }

      if (record?.preguntas[change]?.dificultad === 'Avanzado') {
        setColorChange('error.main')
        setPuntosChange(3 * record?.racha)
      }
    }, [change, record?.preguntas, record?.racha])

    const [respWidth] = useResponsive()

    useEffect(() => {
      const elementoScroll = document?.getElementById('preguntaScroll')
      elementoScroll.scrollIntoView({block: 'start'})
    }, [change])

    const handleSound = (sound) => {
        setPlaySound(sound)
        localStorage.setItem('sound', sound)
    }

    if ( !record ) {
        return <Spinner />
    }
    
  return (
    <>
        {
            (!showResultados)
            ?
            <div id='preguntaScroll'>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Grid p={4}>
                            <Grid style={{justifyContent: 'space-between', flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
                                <IconButton onClick={salir}>
                                    <ArrowBackIos sx = {{color: 'secondary.main'}} />
                                </IconButton>
                                <Typography variant='h5' color = 'white'>{change + 1} / {record?.preguntas?.length}</Typography>
                                <Typography variant='h5' color = 'white'>{usuarioActivo?.name}</Typography>
                                <Typography variant='h5' color = 'white'>Puntos: {record?.puntos}</Typography>
                            </Grid>

                            <Grid container>
                                <Grid item xs = {5} sm = {4} md = {4} lg = {3} xl = {3}>
                                    <Typography variant='h6' mt = {4} mb = {4} color = {'white'}>Racha de: {enRachaDe}x</Typography>
                                </Grid>

                                <Grid item xs = {7} sm = {8} md = {8} lg = {9} xl = {9} display = {'flex'} justifyContent = {'end'} my = {'auto'}>
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
                                <Grid item xs = {12} style={{maxHeight: '150px', overflowY: 'auto'}}>
                                    <Typography variant = 'h5' id='preguntaScroll' my={2} style={{textAlign: 'justify'}}>{record?.preguntas[change]?.pregunta} <Typography p={0.7} component={'span'} sx = {{backgroundColor: colorChange, borderRadius: '20px', fontSize: '18px'}}>{record?.preguntas[change]?.dificultad}</Typography> </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AppBar>
                </Box>

                <Grid container>
                    {
                        ( DissabledToSelect )
                            ?
                        <RespuestasAnteriores
                            recordRespuestas={ recordRespuestas }
                            seleccionadas={ record?.seleccionadas[change] }
                        />
                            :
                        <RespuestaActualOSiguientes
                            handleResponse={ handleResponse }
                            recordRespuestas={ recordRespuestas }
                            response={ response }
                            show={ show }
                            showTrue={ showTrue }
                        />
                    }

                    {
                        (respWidth >= 600)
                            ?
                        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                            <Toolbar>
                                <Box p={1} sx={{ flexGrow: 1 }} component = {'div'}>

                                    <Grid display={'flex'} justifyContent = {'space-between'}>
                                        {
                                            (show)
                                                &&
                                            <ButtonShowDialog
                                                change={ change }
                                                record={ record }
                                                setShowModalContent={ setShowModalContent }
                                                tipo={ tipo }
                                            />
                                        }

                                        <ButtonNavigationQuestions
                                            change={ change }
                                            nextForward={ nextForward }
                                            preguntaNo={ record.preguntaNo }
                                            prev={ prev }
                                            show={ show }
                                            onClick={ onClick }
                                            response={ response }
                                            showCorrect={ showCorrect }
                                            DissabledToSelect={ DissabledToSelect }
                                        />

                                        {
                                            ( show )
                                                &&
                                            <Button sx={{ boxShadow: 12 }} endIcon={ <ArrowForwardIos /> } variant='contained' onClick={next}>
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
                                <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                                    <Toolbar>
                                        <Box px={ 1 } py={2} sx={{ flexGrow: 1 }} component = {'div'}>

                                            <Grid display={'flex'} justifyContent = {'space-between'}>
                                                {
                                                    (show)
                                                        &&
                                                    <ButtonShowDialog
                                                        change={ change }
                                                        record={ record }
                                                        setShowModalContent={ setShowModalContent }
                                                        tipo={ tipo }
                                                    />
                                                }

                                                <ButtonNavigationQuestions
                                                    change={ change }
                                                    nextForward={ nextForward }
                                                    preguntaNo={ record.preguntaNo }
                                                    prev={ prev }
                                                    show={ show }
                                                    onClick={ onClick }
                                                    response={ response }
                                                    showCorrect={ showCorrect }
                                                    DissabledToSelect={ DissabledToSelect }
                                                />

                                                {
                                                    (show)
                                                        &&
                                                    <Button sx={{ boxShadow: 12 }} endIcon={ <ArrowForwardIos /> } variant='contained' onClick={next}>
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
            </div>
                :
            <Resultados />
        }

        <DialogContentCita
            tipo={ tipo }
            nota={ record?.preguntas[change]?.nota }
            ShowDialog = {ShowModalContent}
            setShowDialog = {setShowModalContent}
            content = {contentBible} 
            capitulo = {record?.preguntas[change]?.capitulo} 
            libro = {record?.preguntas[change]?.libro} 
            inicio = {record?.preguntas[change]?.desdeVersiculo} 
            fin 
        />
    </>
  )
}
