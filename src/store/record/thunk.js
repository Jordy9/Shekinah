import axios from 'axios'
import { getRecord, deleteRecord } from './recordSlice'

const point = process.env.REACT_APP_API_URL

// export const obtenerRecord = ( id ) => {
//     return async(dispatch) => {

//         try {   
//             const { data } = await axios.get(`${point}/record?id=${id}`)
    
//             dispatch(getRecord(data.record))
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }

export const crearRecord = (idJugador = '123456789', puntos, preguntas, preguntaNo) => {
    return async(dispatch) => {
        const { data } = await axios.post(`${point}/record/new`, {idJugador, puntos, preguntas, preguntaNo})

        dispatch(getRecord(data.record))
    }
}

export const SiguientePregunta = ({id, puntos, aciertos, racha, preguntaNo, errores, record, seleccionadas}) => {
    return async(dispatch) => {
        // reforzar
        const { data } = await axios.put(`${point}/record/${id}`, {...record, puntos, aciertos, racha, preguntaNo, errores, seleccionadas})
        dispatch(getRecord(data.record))
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