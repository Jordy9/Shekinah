import axios from "axios"
import { actualizarTemaActivo, createTemas, eliminarTemaActivo, getTemas, getTemasInit, paginacion } from "./temasSlice"
import Swal from "sweetalert2"

export const obtenerTemas = ( page, size, searchParams ) => {
    return async( dispatch ) => {

        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/tema?=${page}&size=${size ?? 10}&searchParams=${searchParams ?? ''}`)

            dispatch(getTemasInit(data.temas))
            dispatch(paginacion({ page: data.page, total: data.total, count: data.count }))
        } catch (error) {
            console.log(error)
        }
    }
}

export const obtenerTemasMas = ( page, size, searchParams ) => {
    return async( dispatch ) => {

        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/tema?=${page}&=${size}&=${searchParams}`)

            dispatch(getTemas(data.temas))
            dispatch(paginacion({ page: data.page, total: data.total, count: data.count }))
        } catch (error) {
            console.log(error)
        }
    }
}

export const crearTemas = ( tema ) => {
    return async( dispatch ) => {

        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/tema`, { tema })

            dispatch(createTemas(data.tema))

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
                title: 'Tema creada'
            })

        } catch (error) {
            console.log(error)
        }
    }
}

export const actualizarTemas = ( tema, id ) => {
    return async( dispatch ) => {

        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/tema/${id}`, { tema })

            dispatch(actualizarTemaActivo(data.tema))

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
                title: 'Tema actualizado'
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteTema = ( id ) => {
    return async( dispatch ) => {

        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/tema/${id}`)

            dispatch(eliminarTemaActivo(data.tema))

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
                title: 'Tema eliminado'
            })
        } catch (error) {
            console.log(error)
        }
    }
}