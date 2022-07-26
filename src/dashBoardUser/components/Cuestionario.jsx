import React, { useEffect, useState } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Antiguotestamento } from '../../Antiguotestamento'
import { Nuevotestamento } from '../../Nuevotestamento'
import { BorrarPregunta, SiguientePregunta } from '../../store/record/thunk'
import './Cuestionario.css'
import { ModalBibleContent } from './ModalBibleContent'

const librosBiblia = [...Antiguotestamento(), ...Nuevotestamento()]

export const Cuestionario = () => {

    const dispatch = useDispatch();

    const { record } = useSelector(state => state.rc);

    const [change, setChange] = useState(record[0]?.preguntaNo)

    const [response, setResponse] = useState()

    const [show, setShow] = useState(false)

    const [ShowModalContent, setShowModalContent] = useState(false)

    const [showTrue, setShowTrue] = useState(false)

    const [showCorrect, setShowCorrect] = useState(false)
    
    const [PuntosChange, setPuntosChange] = useState(record[0]?.puntos)
    
    const onClick = (respuesta) => {
        if (respuesta[0]?.correcta === true) {
            dispatch(SiguientePregunta({
                id: record[0]?._id,
                puntos: record[0]?.puntos + PuntosChange,
                aciertos: record[0]?.aciertos + 1,
                racha: record[0]?.racha + 1,
                preguntaNo: record[0]?.preguntaNo + 1,
                errores: record[0]?.errores,
                reforzar: record[0]?.reforzar,
                record: record[0]
            }))

            setShow(true)
            setShowTrue(true)
            setShowCorrect(true)
        } else {
            dispatch(SiguientePregunta({
                id: record[0]?._id,
                puntos: record[0]?.puntos,
                aciertos: record[0]?.aciertos,
                racha: record[0]?.racha - record[0]?.racha + 1,
                preguntaNo: record[0]?.preguntaNo + 1,
                errores: record[0]?.errores + 1,
                reforzar: [...record[0]?.reforzar, record[0]?.preguntas[change]],
                record: record[0]
            }))
            document.getElementById(`buttonbg${respuesta[1]}`).style.background = 'red'
            document.getElementById(`buttonbg${respuesta[1]}`).style.color = 'white'
            setShow(true)
            setShowTrue(true)
            setShowCorrect(false)
        }
    }

    const next = () => {
        if (change + 1 < record[0]?.preguntas?.length) {
            document.getElementById(`buttonbg${response[1]}`).style.background = 'none'
            document.getElementById(`buttonbg${response[1]}`).style.color = ''
            setChange(change + 1)
            setResponse()
            setShow(false)
            setShowTrue(false)
        } else {
            dispatch(BorrarPregunta(record[0]?._id))
        }

    }

    const salir = () => {
        dispatch(BorrarPregunta(record[0]?._id))
    }

    const [contentBible, setContentBible] = useState()

    useEffect(() => {
        if (record[0]?.preguntas[change]?.desdeVersiculo !== '' && record[0]?.preguntas[change]?.hastaVersiculo !== '' && record[0]?.preguntas[change]?.desdeVersiculo === record[0]?.preguntas[change]?.hastaVersiculo) {
            setContentBible(librosBiblia[record[0]?.preguntas[change]?.idLibro][record[0]?.preguntas[change]?.capitulo]?.slice(record[0]?.preguntas[change]?.desdeVersiculo, Number(record[0]?.preguntas[change]?.desdeVersiculo) + 1))
        }

        if (record[0]?.preguntas[change]?.desdeVersiculo !== '' && record[0]?.preguntas[change]?.hastaVersiculo !== '' && record[0]?.preguntas[change]?.desdeVersiculo !== record[0]?.preguntas[change]?.hastaVersiculo) {
            setContentBible(librosBiblia[record[0]?.preguntas[change].idLibro][record[0]?.preguntas[change]?.capitulo]?.slice(record[0]?.preguntas[change]?.desdeVersiculo, Number(record[0]?.preguntas[change].hastaVersiculo) + 1))
        }
    }, [record[0]?.preguntas[change]?.hastaVersiculo, record[0]?.preguntas[change]?.desdeVersiculo])

    const respuestasAleatorias = [...record[0]?.preguntas[change]?.respuesta].sort((a, b) => {
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
      if (record[0]?.preguntas[change]?.dificultad === 'Tierno') {
        setColorChange('info')
        setPuntosChange(1 * record[0]?.racha)
      }

      if (record[0]?.preguntas[change]?.dificultad === 'Medio') {
        setColorChange('warning')
        setPuntosChange(2 * record[0]?.racha)
      }

      if (record[0]?.preguntas[change]?.dificultad === 'Avanzado') {
        setColorChange('danger')
        setPuntosChange(3 * record[0]?.racha)
      }
    }, [record[0]?.preguntas[change]?.dificultad])
    
    
  return (
    <>
        <div className='p-4' style={{backgroundColor: 'rgba(33,93,59,255)', boxShadow: '10px 10px 20px 2px rgba(0,0,0,0.5)'}}>
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
            <div style={{justifyContent: 'space-between', flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
                <i style={{fontSize: '25px', cursor: 'pointer'}} onClick={salir} className="text-white bi bi-arrow-left"></i>
                <h4 className='text-white'>Pregunta {change + 1} / {record[0]?.preguntas?.length}</h4>
                <h4 className='text-white'>Puntos: {record[0]?.puntos}</h4>
            </div>

            <h6 className='text-white mt-5 mb-4'>En Racha de: {record[0]?.racha}x</h6>

            <div className='row' xs = {12}>
                <div className="col-12" style={{maxHeight: '150px', overflowY: 'auto'}}>
                    <h3 className='text-white my-2' style={{textAlign: 'justify'}}>{record[0]?.preguntas[change]?.pregunta} <span style={{borderRadius: '20px', fontSize: '18px'}} className={`p-2 bg-${colorChange}`}>{record[0]?.preguntas[change]?.dificultad}</span> </h3>
                </div>
            </div>
        </div>

        <div className = 'row'>
            {
                respuestasAleatorias?.map((respuesta, index) => {
                    return (
                        <div key={respuesta + index} className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                            <div className='p-4 d-flex align-items-center' style={{height: '150px', overflowY: 'auto'}}>
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

            <Navbar fixed='bottom' expand="lg" bg = 'dark' variant="dark">
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
                                    (record[0]?.preguntas[change]?.desdeVersiculo === record[0]?.preguntas[change]?.hastaVersiculo)
                                        ?
                                    <span>Verificar cita: {record[0]?.preguntas[change]?.libro} {Number(record[0]?.preguntas[change]?.capitulo) + 1}:{Number(record[0]?.preguntas[change]?.desdeVersiculo) + 1}</span>
                                        :
                                    <span>Verificar cita: {record[0]?.preguntas[change]?.libro} {Number(record[0]?.preguntas[change]?.capitulo) + 1}:{Number(record[0]?.preguntas[change]?.desdeVersiculo) + 1}-{Number(record[0]?.preguntas[change]?.hastaVersiculo) + 1}</span>
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
        </div>

        <ModalBibleContent 
            ShowModalContent = {ShowModalContent}
            setShowModalContent = {setShowModalContent} 
            content = {contentBible} 
            capitulo = {record[0]?.preguntas[change]?.capitulo} 
            libro = {record[0]?.preguntas[change]?.libro} 
            inicio = {record[0]?.preguntas[change]?.desdeVersiculo} 
            fin 
        />
    </>
  )
}
