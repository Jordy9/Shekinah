import axios from 'axios'
import { actualizarPreguntaActiva, crearPreguntaActiva, eliminarPreguntaActiva, getPreguntas, getPreguntasGame, getPreguntasTema, paginacion } from './preguntasSlice'
import Swal from "sweetalert2"
import { crearRecord } from '../record/thunk';

const point = process.env.REACT_APP_API_URL

export const obtenerPreguntas = (page, size) => {
    return async(dispatch) => {

        try {
            const { data } = await axios.get(`${point}/pregunta/pag?page=${page || 1}&size=${size || 10}`)
            dispatch(getPreguntas(data.preguntas))
            dispatch(paginacion({page: data.page, total: data.total, idPreguntasCount: data.count}))
            
        } catch (error) {
            console.log(error)
        }

    }
}

export const obtenerPreguntasPorTema = ( value, setValue ) => {
    return async(dispatch) => {

        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/pregunta/tema?value=${value ?? ''}`)

            setValue(data.preguntas)

            dispatch(getPreguntasTema(data.preguntas))
            
        } catch (error) {
            console.log(error)
        }

    }
}

export const jugarPreguntasPorTema = ( preguntasTOGame ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/pregunta/preguntasTOGame?value=${preguntasTOGame}`)

            console.log(data.preguntas)

            dispatch(getPreguntasGame(data.preguntas))
    
            dispatch(crearRecord(uid, 0, data.preguntas, 0))
            
        } catch (error) {
            console.log(error)
        }

    }
}

export const obtenerPreguntasJuego = (page, size) => {
    return async(dispatch, getState) => {

        const { uid } = getState().auth;

        try {
            const { data } = await axios.get(`${point}/pregunta/juego`)
            // const { data } = await axios.get(`${point}/pregunta/juego?page=${page}&size=${size}`)

            dispatch(getPreguntasGame(data.preguntas))

            dispatch(crearRecord(uid, 0, data.preguntas, 0))
            
            
        } catch (error) {
            console.log(error)
        }

    }
}

export const obtenerPreguntasJuegoPersonalizado = (categoria, dificultad, pregunta) => {
    return async(dispatch, getState) => {

        const { uid } = getState().auth;

        try {
            const { data } = await axios.post(`${point}/pregunta/juegop`, {categoria, dificultad, pregunta})
            // const { data } = await axios.get(`${point}/pregunta/juego?page=${page}&size=${size}`)

            if (data.preguntas?.length !== 0) {

                dispatch(getPreguntasGame(data.preguntas))
    
                dispatch(crearRecord(uid, 0, data.preguntas, 0))
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  return Toast.fire({
                    icon: 'error',
                    title: 'No existen preguntas con esta configuración'
                  })         
            }

        } catch (error) {
            console.log(error)
        }

    }
}

export const obtenerPreguntasPorId = (ids) => {
    return async(dispatch, getState) => {

        const { uid } = getState().auth;

        try {
            const { data } = await axios.post(`${point}/pregunta/juegoId`, {ids})

            if (data.preguntas?.length !== 0) {

                dispatch(getPreguntasGame(data.preguntas))
    
                dispatch(crearRecord(uid, 0, data.preguntas, 0))
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  return Toast.fire({
                    icon: 'error',
                    title: 'No existen preguntas con esta configuración'
                  })         
            }

        } catch (error) {
            console.log(error)
        }

    }
}

export const obtenerPreguntaFiltrada = (buscadorSearch) => {
    return async(dispatch) => {

        try {
            const { data } = await axios.get(`${point}/pregunta/pag?searchParams=${buscadorSearch || ''}`)
            dispatch(getPreguntas(data.preguntas))
            dispatch(paginacion({page: data.page, total: data.total, idPreguntasCount: data.count}))
            
        } catch (error) {
            console.log(error)
        }

    }
}

export const crearPregunta = (pregunta, respuesta, dificultad, categoria, testamento, libro, capitulo, desdeVersiculo, hastaVersiculo, tema) => {
    return async(dispatch, getState) => {

        try {
            const { data } = await axios.post(`${point}/pregunta/new`, {pregunta, respuesta, dificultad, categoria, testamento, libro, capitulo, desdeVersiculo, hastaVersiculo, tema})

            if (data.ok) {
                dispatch(crearPreguntaActiva(data.pregunta))

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  return Toast.fire({
                    icon: 'success',
                    title: 'Pregunta creada correctamente'
                  })               
            }
            
        } catch (error) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              return Toast.fire({
                icon: 'error',
                title: error
              })               
        }

    }
}

export const actualizarPregunta = (pregunta, idPregunta, respuesta, dificultad, categoria, testamento, libro, capitulo, desdeVersiculo, hastaVersiculo, tema) => {
    return async(dispatch, getState) => {

        const { preguntaActiva } = getState().pg

        try {
            const { data } = await axios.put(`${point}/pregunta/${preguntaActiva._id}`, {pregunta, idPregunta, respuesta, dificultad, categoria, testamento, libro, capitulo, desdeVersiculo, hastaVersiculo, tema})
    
            if (data.ok) {
                dispatch(actualizarPreguntaActiva(data.pregunta))
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  return Toast.fire({
                    icon: 'success',
                    title: 'Pregunta actualizada correctamente'
                  })               
            }
        } catch (error) {
            console.log(error)
        }

    }
}

export const eliminarPregunta = (props) => {
    return async(dispatch) => {

        try {
            const { data } = await axios.delete(`${point}/pregunta/${props._id}`)
    
            if (data.ok) {
                dispatch(eliminarPreguntaActiva(props))
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  return Toast.fire({
                    icon: 'success',
                    title: 'Pregunta eliminada correctamente'
                  })               
            }
        } catch (error) {
            console.log(error)
        }

    }
}