import React, { useEffect, useState } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Antiguotestamento } from '../../Antiguotestamento'
import { useResponsive } from '../../hooks/useResponsive'
import { Nuevotestamento } from '../../Nuevotestamento'
import { ScrollToTop } from '../../scrollToTop/ScrollToTop'
import { GuardarRecord } from '../../store/auth/thunk'
import { BorrarPregunta, SiguientePregunta } from '../../store/record/thunk'
import './Cuestionario.css'
import { ModalBibleContent } from './ModalBibleContent'

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
            setEnRachaDe(enRachaDe + 1)
            setResponse()
            setShow(false)
            setShowTrue(false)
        } else {
            dispatch(BorrarPregunta(recordFiltrado[0]?._id))
            dispatch(GuardarRecord(recordFiltrado[0]))
        }

    }

    const salir = () => {
        dispatch(BorrarPregunta(recordFiltrado[0]?._id))
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
    
  return (
    <div style={{height: (respWidth) >= 600 ? '70vh' : '90vh'}}>
        <ScrollToTop change = {change} />
        <div className='p-4' style={{backgroundColor: 'rgba(33,93,59,255)', boxShadow: '10px 10px 20px 2px rgba(0,0,0,0.5)', position: (respWidth <= 600) && 'fixed', zIndex: (respWidth <= 600) && 1045, top: (respWidth <= 600) && 0}}>
            <div className='d-flex align-items-center' style={{position: 'absolute', top: '100px', right: '30px', cursor: 'pointer'}}>

                {
                    (show)
                        ?
                    <>
                        <span className={`${(showCorrect) ? 'text-success' : 'text-danger'} mr-2`} style={{fontSize: '25px'}}>{(showCorrect) ? 'Correcta' : 'Incorrecta'}</span>
                        <i style={{fontSize: '30px'}} className={`${(showCorrect) ? 'text-success bi-check-circle-fill' : 'text-danger bi bi-x-circle-fill'}`}></i>
                    </>
                        :
                    <i style={{fontSize: '30px'}} className="text-white bi bi-question-circle-fill"></i>
                }

            </div>

            <span style={{position: 'absolute', top: '60px', right: '30px', fontSize: '23px', color: 'white'}}>{usuarioActivo?.name}</span>
            
            <div style={{justifyContent: 'space-between', flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
                <i style={{fontSize: '25px', cursor: 'pointer'}} onClick={salir} className="text-white bi bi-arrow-left"></i>
                <h4 className='text-white'>Pregunta {change + 1} / {recordFiltrado[0]?.preguntas?.length}</h4>
                <h4 className='text-white'>Puntos: {recordFiltrado[0]?.puntos}</h4>
            </div>

            <h6 className='text-white mt-4 mb-4'>Racha de: {enRachaDe}x</h6>

            <div className='row' xs = {12}>
                <div className="col-12" style={{maxHeight: '150px', overflowY: 'auto'}}>
                    <h3 className='text-white my-2' style={{textAlign: 'justify'}}>{recordFiltrado[0]?.preguntas[change]?.pregunta} <span style={{borderRadius: '20px', fontSize: '18px'}} className={`p-2 bg-${colorChange}`}>{recordFiltrado[0]?.preguntas[change]?.dificultad}</span> </h3>
                </div>
            </div>
        </div>

        <div className = 'row' style={{marginTop: (respWidth <= 600) && '300px'}}>
            {
                respuestasAleatorias.map((respuesta, index) => {
                    return (
                        <div key={respuesta + index} className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                            <div className='p-4 d-flex align-items-center' style={{maxHeight: '150px', overflowY: 'auto'}}>
                                <button className='btn btn-transparent shadow selectFocus' style={{borderRadius: '50%', color: 'white', backgroundColor: 'rgba(33,93,59,255)'}} onClick={() => setResponse([respuesta, `${index + 1}`])}>
                                    {index + 1}
                                </button>
                                
                                <h5 id = {`buttonbg${index + 1}`} className={`${(showTrue && respuesta?.correcta === true) && 'bg-success'} ml-2 my-auto p-2`} style={{borderRadius: '20px'}}>
                                    {respuesta.texto}
                                </h5>
                            </div>
                        </div>
                    )
                })
            }

            {
                (respWidth >= 600)
                    ?
                <Navbar fixed='bottom' className='mt-2' expand="lg" bg = 'dark' variant="dark">
                    <Container>
                        {
                            (response)
                                &&
                            <button hidden = {show} className='btn btn-transparent ml-auto' onClick={() => onClick(response)} style={{backgroundColor: 'rgba(33,93,59,255)', color: 'white', width: 'auto'}}>
                                Responder
                            </button>
                        }

                        {
                            (show)
                                &&
                            <button onClick={() => setShowModalContent(true)} className='btn mr-auto' style={{backgroundColor: 'rgba(33,93,59,255)', color: 'white'}}>
                                <div className='d-flex align-items-center justify-content-center'>
                                    {
                                        (recordFiltrado[0]?.preguntas[change]?.desdeVersiculo === recordFiltrado[0]?.preguntas[change]?.hastaVersiculo)
                                            ?
                                        <span>Ver cita: {recordFiltrado[0]?.preguntas[change]?.libro} {Number(recordFiltrado[0]?.preguntas[change]?.capitulo) + 1}:{Number(recordFiltrado[0]?.preguntas[change]?.desdeVersiculo) + 1}</span>
                                            :
                                        <span>Ver cita: {recordFiltrado[0]?.preguntas[change]?.libro} {Number(recordFiltrado[0]?.preguntas[change]?.capitulo) + 1}:{Number(recordFiltrado[0]?.preguntas[change]?.desdeVersiculo) + 1}-{Number(recordFiltrado[0]?.preguntas[change]?.hastaVersiculo) + 1}</span>
                                    }
                                    <i style={{fontSize: '30px', color: 'white', fontStyle: 'normal'}} className="bi bi-book-half ml-2 mt-1"></i>
                                </div>
                            </button>
                        }

                        {
                            (show)
                                &&
                            <button className='btn btn-transparent ml-auto' onClick={next} style={{backgroundColor: 'rgba(33,93,59,255)', color: 'white', width: 'auto'}}>
                                Siguiente
                            </button>
                        }
                    </Container>
                </Navbar>
                    :
                <Navbar fixed='bottom' className='mt-2' expand="lg" bg = 'dark' variant="dark">
                    <Container>
                        {
                            (response)
                                &&
                            <button hidden = {show} className='btn btn-transparent ml-auto' onClick={() => onClick(response)} style={{backgroundColor: 'rgba(33,93,59,255)', color: 'white', width: 'auto'}}>
                                Responder
                            </button>
                        }

                        {
                            (show)
                                &&
                            <button onClick={() => setShowModalContent(true)} className='btn mr-auto' style={{backgroundColor: 'rgba(33,93,59,255)', color: 'white'}}>
                                <div className='d-flex align-items-center justify-content-center'>
                                    {
                                        (recordFiltrado[0]?.preguntas[change]?.desdeVersiculo === recordFiltrado[0]?.preguntas[change]?.hastaVersiculo)
                                            ?
                                        <span>Ver cita: {recordFiltrado[0]?.preguntas[change]?.libro} {Number(recordFiltrado[0]?.preguntas[change]?.capitulo) + 1}:{Number(recordFiltrado[0]?.preguntas[change]?.desdeVersiculo) + 1}</span>
                                            :
                                        <span>Ver cita: {recordFiltrado[0]?.preguntas[change]?.libro} {Number(recordFiltrado[0]?.preguntas[change]?.capitulo) + 1}:{Number(recordFiltrado[0]?.preguntas[change]?.desdeVersiculo) + 1}-{Number(recordFiltrado[0]?.preguntas[change]?.hastaVersiculo) + 1}</span>
                                    }
                                    <i style={{fontSize: '30px', color: 'white', fontStyle: 'normal'}} className="bi bi-book-half ml-2 mt-1"></i>
                                </div>
                            </button>
                        }

                        {
                            (show)
                                &&
                            <button className='btn btn-transparent ml-auto' onClick={next} style={{backgroundColor: 'rgba(33,93,59,255)', color: 'white', width: 'auto'}}>
                                Siguiente
                            </button>
                        }
                    </Container>
                </Navbar>
            }

        </div>

        <ModalBibleContent 
            ShowModalContent = {ShowModalContent}
            setShowModalContent = {setShowModalContent} 
            content = {contentBible} 
            capitulo = {recordFiltrado[0]?.preguntas[change]?.capitulo} 
            libro = {recordFiltrado[0]?.preguntas[change]?.libro} 
            inicio = {recordFiltrado[0]?.preguntas[change]?.desdeVersiculo} 
            fin 
        />
    </div>
  )
}
