import axios from "axios"
import { actualizarPregunta, crearPregunta, eliminarPregunta, getPreguntas, paginacion } from "./preguntasTemaSlice"
import Swal from "sweetalert2"

export const obtenerPreguntasTema = ( page, size, searchParams ) => {
    return async ( dispatch ) => {

        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/preguntasTema?=${page}&size=${size ?? 10}&searchParams=${searchParams ?? ''}`)

            dispatch( getPreguntas(data.preguntas) )
            dispatch( paginacion({
                page: data.page,
                total: data.total
            }) )

        } catch (error) {
            console.log(error)
        }
    }
}

export const crearPreguntaTema = ( pregunta ) => {
    return async ( dispatch ) => {

        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/preguntasTema`, pregunta)

            dispatch( crearPregunta(data.pregunta) )

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
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
                title: 'Pregunta creada'
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export const actualizarPreguntaTema = ( pregunta, id ) => {
    return async ( dispatch ) => {

        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/preguntasTema/${id}`, pregunta)

            dispatch( actualizarPregunta(data.pregunta) )

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
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
                title: 'Pregunta actualizada'
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export const eliminarPreguntaTema = ( id ) => {
    return async ( dispatch ) => {

        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/preguntasTema/${id}`)

            dispatch( eliminarPregunta(data.pregunta) )

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
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
                title: 'Pregunta eliminada'
            })

        } catch (error) {
            console.log(error)
        }
    }
}