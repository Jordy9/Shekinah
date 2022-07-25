import axios from 'axios'
import { createRecord, deleteRecord, getRecord, updateRecord } from './recordSlice'

const point = process.env.REACT_APP_API_URL

export const obtenerRecord = () => {
    return async(dispatch) => {
        const resp = await axios.get(`${point}/record`)

        dispatch(getRecord(resp.data.record))
    }
}

export const crearRecord = (idJugador = '123456789', puntos, preguntas, preguntaNo) => {
    return async(dispatch) => {
        const resp = await axios.post(`${point}/record/new`, {idJugador, puntos, preguntas, preguntaNo})

        dispatch(createRecord(resp.data.record))
    }
}

export const SiguientePregunta = ({id, puntos, aciertos, racha, preguntaNo, errores, reforzar, record}) => {
    return async(dispatch) => {
        const resp = await axios.put(`${point}/record/${id}`, {...record, puntos, aciertos, racha, preguntaNo, errores, reforzar})
        dispatch(updateRecord(resp.data.record))
    }
}

export const BorrarPregunta = (id) => {
    return async(dispatch) => {

        try {
            await axios.delete(`${point}/record/${id}`)
            dispatch(deleteRecord(id))
        } catch (error) {
            console.log(error)
        }

    }
}