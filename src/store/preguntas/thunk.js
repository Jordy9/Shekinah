import axios from 'axios'
import { actualizarPreguntaActiva, crearPreguntaActiva, eliminarPreguntaActiva, getPreguntas, paginacion } from './preguntasSlice'
import Swal from "sweetalert2"

const point = process.env.REACT_APP_API_URL

const token = localStorage.getItem('token') || '';

export const obtenerPreguntas = (page, size) => {
    return async(dispatch) => {

        try {
            const resp = await axios.get(`${point}/pregunta/pag?page=${page || 1}&size=${size || 10}`)
            dispatch(getPreguntas(resp.data.preguntas))
            dispatch(paginacion({page: resp.data.page, total: resp.data.total, idPreguntasCount: resp.data.count}))
            
        } catch (error) {
            console.log(error)
        }

    }
}

export const obtenerPreguntaFiltrada = (buscadorSearch) => {
    return async(dispatch) => {

        try {
            const resp = await axios.get(`${point}/pregunta/pag?searchParams=${buscadorSearch || ''}`)
            dispatch(getPreguntas(resp.data.preguntas))
            dispatch(paginacion({page: resp.data.page, total: resp.data.total, idPreguntasCount: resp.data.count}))
            
        } catch (error) {
            console.log(error)
        }

    }
}

export const crearPregunta = (pregunta, respuesta, dificultad, categoria, testamento, libro, capitulo, desdeVersiculo, hastaVersiculo) => {
    return async(dispatch, getState) => {

        const { paginacion } = getState().pg

        const idPregunta = paginacion?.idPreguntasCount + 1

        try {
            const resp = await axios.post(`${point}/pregunta/new`, {pregunta, idPregunta, respuesta, dificultad, categoria, testamento, libro, capitulo, desdeVersiculo, hastaVersiculo})

            if (resp.data.ok) {
                dispatch(crearPreguntaActiva(resp.data.pregunta))

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 5000,
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
                timer: 5000,
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

export const actualizarPregunta = (pregunta, idPregunta, respuesta, dificultad, categoria, testamento, libro, capitulo, desdeVersiculo, hastaVersiculo) => {
    return async(dispatch, getState) => {

        const { preguntaActiva } = getState().pg

        try {
            const resp = await axios.put(`${point}/pregunta/${preguntaActiva._id}`, {pregunta, idPregunta, respuesta, dificultad, categoria, testamento, libro, capitulo, desdeVersiculo, hastaVersiculo})
    
            if (resp.data.ok) {
                dispatch(actualizarPreguntaActiva(resp.data.pregunta))
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 5000,
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
            const resp = await axios.delete(`${point}/pregunta/${props._id}`)
    
            if (resp.data.ok) {
                dispatch(eliminarPreguntaActiva(props))
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 5000,
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