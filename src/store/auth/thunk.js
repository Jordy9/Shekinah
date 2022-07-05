import axios from 'axios'

const point = process.env.REACT_APP_API_URL

export const obtenerUsuarios = () => {
    return async(dispatch) => {
        const resp = await axios.get(`${point}/auth`)
    }
}