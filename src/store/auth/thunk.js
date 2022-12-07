import axios from 'axios'
import Swal from 'sweetalert2';
import { onActiveUser, onChecking, onGetUsers, onLogin, onLogout, onRegister, onUpdate } from './authSlice'

const point = process.env.REACT_APP_API_URL

const token = localStorage.getItem('token') || '';

export const obtenerUsuarios = () => {
    return async(dispatch) => {
        const resp = await axios.get(`${point}/auth`)

        dispatch(onGetUsers(resp.data.usuarios))
        
        dispatch(obtenerUsuarioActivo())
    }
}

export const iniciarLogin = (email, password) => {
    return async(dispatch) => {

        try {
            const resp = await axios.post(`${point}/auth`, {email, password}, {headers: {'x-token': token}})
    
            if (resp.data.ok) {

                dispatch(onLogin({
                    uid: resp.data.uid,
                    name: resp.data.name
                }))
    
                localStorage.setItem('token', resp.data.token)
                localStorage.setItem('token-init-date', new Date().getTime());

                dispatch(obtenerUsuarioActivo())
            }
        } catch ({response}) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
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
                title: response.data.msg
            })
        }
        

    }
}

export const startLoginGoogle = (response) => {
    return async(dispatch) => {

        try {
            const resp = await axios.post(`${point}/auth/google`, response, {headers: {'x-token': token}});
            
            localStorage.setItem('token', resp.data.token)
            localStorage.setItem('token-init-date', new Date().getTime());
    
            await dispatch(onLogin({
                uid: resp.data.uid,
                name: resp.data.name
            }))
            
            dispatch(obtenerUsuarioActivo())            
        } catch (error) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
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

export const startLoginFacebook = (response) => {
    return async(dispatch) => {
        
        try {
            const resp = await axios.post(`${point}/auth/facebook`, response, {headers: {'x-token': token}});

            localStorage.setItem('token', resp.data.token)
            localStorage.setItem('token-init-date', new Date().getTime());

            await dispatch(onLogin({
                uid: resp.data.uid,
                name: resp.data.name
            }))
            dispatch(obtenerUsuarioActivo())

        } catch (error) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
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

export const crearUsuario = (name, lastName, email, password) => {
    return async(dispatch) => {
        try {
            const resp = await axios.post(`${point}/auth/new`, {name, lastName, email, password})

            dispatch(onRegister({
                uid: resp.data.uid,
                name: resp.data.name
            }))

            localStorage.setItem('token', resp.data.token)
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(obtenerUsuarioActivo())


        } catch (error) {
            console.log(error)
        }
    }
}

export const iniciarActualizacion = (id, name, lastName, email, password, role) => {
    return async(dispatch) => {

        try {
            const resp = await axios.put(`${point}/auth/${id}`, {name, lastName, email, password, role}, {headers: {'x-token': token}})
    
            if (resp.data.ok) {

                dispatch(onUpdate(resp.data.usuario))
    
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
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
                    title: 'Usuario actualizado correctamente'
                })
            }
        } catch ({response}) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
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
                title: response.data.msg
            })
        }
        

    }
}

export const iniciarActualizacionTema = (tema, usuarioActivo, selected) => {
    return async(dispatch) => {

        try {
            const resp = await axios.put(`${point}/auth/${usuarioActivo?.id}`, {...usuarioActivo, tema, selected}, {headers: {'x-token': token}})
    
            if (resp.data.ok) {

                dispatch(onUpdate(resp.data.usuario))
    
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
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
                    title: 'Tema actualizado correctamente'
                })
            }
        } catch ({response}) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
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
                title: response.data.msg
            })
        }
        

    }
}

export const iniciarActualizacionPass = (id, name, lastName, email, passwordActual, password, role) => {
    return async(dispatch) => {

        try {
            const resp = await axios.put(`${point}/auth/updatePassword/${id}`, {id, name, lastName, email, passwordActual, password, role}, {headers: {'x-token': token}})
    
            if (resp.data.ok) {

                dispatch(onUpdate(resp.data.usuario))
    
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
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
                    title: 'Usuario actualizado correctamente'
                })
            }
        } catch ({response}) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
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
                title: response.data.msg
            })
        }
        

    }
}

export const obtenerUsuarioActivo = () => {
    return async(dispatch, getState) => {

        const { usuarios, uid } = getState().auth

        const usuario = usuarios?.find(usuarios => usuarios.id === uid)

        dispatch(onActiveUser(usuario))
        
    }
}

export const iniciarLogout = () => {
    return (dispatch) => {
        localStorage.removeItem('token')
        localStorage.removeItem('token-init-date')

        dispatch(onLogout())
    }
}

export const iniciarAutenticacion = () => {
    return async(dispatch) => {

        try {
            const resp = await axios.get(`${point}/auth/renew`, {headers: {'x-token': token}});
            
            localStorage.setItem('token', resp.data.token)
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({
                uid: resp.data.uid,
                name: resp.data.name
            }))
        } catch (error) {
            localStorage.removeItem('token')
            localStorage.removeItem('token-init-date')
            dispatch(onChecking())
            dispatch(onLogout())
        }
    }
}

export const GuardarRecord = (record) => {
    return async(dispatch, getState) => {

        const { usuarioActivo } = getState().auth;

        const juego = {
            aciertos: (!usuarioActivo?.juego) ? record?.aciertos : usuarioActivo?.juego?.aciertos + record?.aciertos,
            puntos: (!usuarioActivo?.juego) ? record?.puntos : usuarioActivo?.juego?.puntos + record?.puntos,
            errores: (!usuarioActivo?.juego) ? record?.errores : usuarioActivo?.juego?.errores + record?.errores,
            // reforzar: (!usuarioActivo?.juego) ? record?.reforzar : [...usuarioActivo?.juego?.reforzar, ...record?.reforzar],
            racha: (!usuarioActivo?.juego) ? record?.racha : (usuarioActivo?.juego?.racha < record?.racha) ? record?.racha : usuarioActivo?.juego?.racha
        }

        try {
            const resp = await axios.put(`${point}/auth/${usuarioActivo?.id}`, {...usuarioActivo, juego}, {headers: {'x-token': token}})
            dispatch(onUpdate(resp.data.usuario))
            dispatch(obtenerUsuarios())
            
        } catch (error) {
            console.log(error)
        }

    }
}