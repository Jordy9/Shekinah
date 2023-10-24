import { ArrowBackIos, ArrowForwardIos, MusicNote, MusicOff } from '@mui/icons-material'
import { AppBar, Avatar, Box, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { Antiguotestamento } from '../../Antiguotestamento'
import { soundLose, soundWin } from '../../helpers/sounds'
import { useResponsive } from '../../hooks/useResponsive'
import { Nuevotestamento } from '../../Nuevotestamento'
import { Spinner } from '../../Spinner'
// import { GuardarRecord } from '../../store/auth/thunk'
import { BorrarPregunta, SiguientePregunta } from '../../store/record/thunk'
import { Resultados } from '../pages/Resultados'
import './Cuestionario.css'
import { DialogContentCita } from './DialogContentCita'
import { ButtonShowDialog } from './ButtonShowDialog'
import { RespuestasAnteriores } from './RespuestasAnteriores'
import { RespuestaActualOSiguientes } from './RespuestaActualOSiguientes'
import { ButtonNavigationQuestions } from './ButtonNavigationQuestions'
import { ProgressComponent } from './ProgressComponent'
import { getBackGroundImage } from '../../utils/getBackGroundImage'

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

    const [contentBible, setContentBible] = useState([])

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
            setContentBible([])
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
                // dispatch(GuardarRecord(record))
            }
          })
    }

    const categoria = record.preguntas[change].categoria

    const [imageSelected, setImageSelected] = useState('')

    const [prevDificult, setprevDificult] = useState('')

    useEffect(() => {

        if ( prevDificult === categoria ) return

        setImageSelected(getBackGroundImage())

        setprevDificult(categoria)
      
    }, [prevDificult, categoria])

    useEffect(() => {

        if ( tipo === 'Pregunta' ) {
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
    <Box sx={{ height: '100vh', width: '100%', overflow: 'hidden' }}>
        {
            (!showResultados)
            ?
            <div id='preguntaScroll'>
                <Box sx={{ height: '30vh' }}>
                    <AppBar sx={{ height: '100%' }} position="static">
                        <Grid p={ 0.5 }>
                            <Grid style={{justifyContent: 'space-between', flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
                                <IconButton sx={{ pl: 2, pr: 0 }} edge='start' onClick={salir}>
                                    <ArrowBackIos sx = {{color: 'secondary.main'}} />
                                </IconButton>
                                {
                                    ( respWidth > 350 )
                                        ?
                                    <Box display={ 'flex' } alignItems={ 'center' }>
                                        <AvatarComponent usuarioActivo={ usuarioActivo } />
                                        <Typography ml={ 1 } component={ 'span' } fontSize={ '18px' } color = {'white'}>{usuarioActivo?.name}</Typography>
                                    </Box>
                                        :
                                    <AvatarComponent usuarioActivo={ usuarioActivo } />
                                }
                                <Typography component={ 'span' } fontSize={ '18px' } color = {'white'}>Racha: {enRachaDe}x</Typography>
                                <Typography component={ 'span' } fontSize={ '18px' } color = 'white'>Puntos: {record?.puntos}</Typography>
                                <IconButton sx={{ pl: 0, pr: 2 }} edge='end' color='secondary' onClick={() => handleSound(!playSound)}>
                                    {
                                        (!playSound)
                                            ?
                                        <MusicOff />
                                            :
                                        <MusicNote />
                                    }
                                </IconButton>
                            </Grid>

                            <hr style = {{ color: 'white', width: '100%' }} />

                            <ProgressComponent change={ change } record={ record } />

                            <Grid container sx={{ overflow: 'hidden' }}>
                                <Grid item xs = {12} style={{maxHeight: '100px', overflowY: 'auto'}}>
                                    <Typography variant = 'h5' id='preguntaScroll' px={ 2 } fontWeight={ 'bold' } style={{textAlign: 'left'}}>
                                        {record?.preguntas[change]?.pregunta}
                                        {
                                            ( record?.preguntas[change]?.dificultad )
                                                &&
                                            <Typography ml={ 1 } p={0.7} component={'span'} sx = {{backgroundColor: colorChange, borderRadius: '20px', fontSize: '18px'}}>{record?.preguntas[change]?.dificultad}</Typography> 
                                        }
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AppBar>
                </Box>

                <Grid display={ 'flex' } alignItems={ 'center' } container sx={{ height: '60vh', overflow: 'auto', backgroundImage: `url(${imageSelected})`, backgroundSize: 'cover', backgroundPosition: 'bottom center' }}>
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
                </Grid>

                <Box sx={{ height: '10vh' }}>

                    {
                        (respWidth >= 600)
                            ?
                        <AppBar sx={{ height: '100%' }} position="static" color="primary">
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
                        <AppBar sx={{ height: '100%' }} position="static" color="primary">
                            <Toolbar>
                                <Box px={ 1 } py={ 2 } sx={{ flexGrow: 1 }} component = {'div'}>

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
    </Box>
  )
}

const AvatarComponent = ({ usuarioActivo }) => {

    const { name, category, backGround, radius, flip, rotate, translateX, translateY } = usuarioActivo?.avatar

    const isCCbs = ( usuarioActivo?.id === '652469d52449387ebbff39da' ) && 'https://yt3.ggpht.com/mf1VTcWGDbw6SnUd1sBFdLFD-Y1LxrJpPWAcqoCZ-9xBOx7UDevKXkzGpxLzotTDFNM5zQCcWg=s176-c-k-c0x00ffffff-no-rj-mo'

    return (
        <>
            {
                ( isCCbs )
                ?
                <Avatar src={ isCCbs } variant='circular' />
                :
                <Avatar src={`https://api.dicebear.com/7.x/${category}/svg?seed=${name || usuarioActivo?.name}`}
                style = {{
                    backgroundColor: backGround, 
                    borderRadius: `${radius}%`,
                    transform: 
                    `rotate(${rotate}deg) 
                    translateX(${translateX}%) 
                    translateY(${translateY}%) 
                    scaleX(${(flip) ? '-1' : '1'})`,
                }}
                alt="" />
            }
        </>
    )
}
