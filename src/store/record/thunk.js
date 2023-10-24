import axios from 'axios'
import { getRecord, deleteRecord } from './recordSlice'
import { levelToSet } from '../../helpers/levelToSet'
import { onUpdate } from '../auth/authSlice'
import { obtenerUsuariosTop10 } from '../auth/thunk'

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

export const BorrarPreguntaAndSetLevel = (id, record, usuarioActivo) => {
    return async(dispatch) => {

        const juego = {
            aciertos: (!usuarioActivo?.juego) ? record?.aciertos : usuarioActivo?.juego?.aciertos + record?.aciertos,
            puntos: (!usuarioActivo?.juego) ? record?.puntos : usuarioActivo?.juego?.puntos + record?.puntos,
            errores: (!usuarioActivo?.juego) ? record?.errores : usuarioActivo?.juego?.errores + record?.errores,
            // reforzar: (!usuarioActivo?.juego) ? record?.reforzar : [...usuarioActivo?.juego?.reforzar, ...record?.reforzar],
            racha: (!usuarioActivo?.juego) ? record?.racha : (usuarioActivo?.juego?.racha < record?.racha) ? record?.racha : usuarioActivo?.juego?.racha
        }

        const token = localStorage.getItem('token') || '';

        const level = levelToSet(record?.preguntas?.length, record?.aciertos, )

        const usuarioToSave = {
            ...usuarioActivo, juego, level, isLevel: false
        }

        try {
            const [ respUsuario ] =  await Promise.all([
                axios.put(`${point}/auth/${usuarioActivo?.id}`, { usuarioToSave }, {headers: {'x-token': token}}),
                axios.delete(`${point}/record/${id}`)
            ])
            dispatch(onUpdate(respUsuario.data.usuario))
            dispatch(obtenerUsuariosTop10())
            dispatch(deleteRecord(id))
            
        } catch (error) {
            console.log(error)
        }

    }
}