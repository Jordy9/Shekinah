import axios from 'axios'
import Swal from 'sweetalert2';
import { onActiveUser, onChecking, onDelete, onGetUsers, onGetUsersTop10, onLogin, onLogout, onRegister, onUpdate, onUpdateUser } from './authSlice'
import { getRecord } from '../record/recordSlice';

const point = process.env.REACT_APP_API_URL

export const obtenerUsuarios = () => {
    return async(dispatch) => {
        const { data } = await axios.get(`${point}/auth`)

        dispatch(onGetUsers(data.usuarios))
        
    }
}

export const obtenerUsuariosTop10 = () => {
    return async(dispatch) => {

        try {   
            const { data } = await axios.get(`${point}/auth/top10`)
    
            dispatch(onGetUsersTop10(data.usuarios))
        } catch (error) {
            console.log(error)
        }
    }
}

export const iniciarLogin = (email, password) => {
    return async(dispatch) => {

        const token = localStorage.getItem('token') || '';

        try {
            const { data } = await axios.post(`${point}/auth`, {email, password}, {headers: {'x-token': token}})
    
            if ( data.ok ) {

                dispatch(getRecord(data.record))

                const { id, name } = data.usuario

                dispatch(onLogin({
                    uid: id,
                    name: name,
                    usuarioActivo: data.usuario
                }))
    
                localStorage.setItem('token', data.token)
                localStorage.setItem('token-init-date', new Date().getTime());
            }
        } catch ({response}) {
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
                icon: 'error',
                title: response.data.msg
            })
        }
        

    }
}

export const startLoginGoogle = (response) => {
    return async(dispatch) => {

        const token = localStorage.getItem('token') || '';

        try {
            const { data } = await axios.post(`${point}/auth/google`, response, {headers: {'x-token': token}});
            
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(getRecord(data.record))

            const { id, name } = data.usuario
    
            await dispatch(onLogin({
                uid: id,
                name: name,
                usuarioActivo: data.usuario
            }))
            
        } catch (error) {
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
                icon: 'error',
                title: error
              })
        }
    }
}

export const startLoginFacebook = (response) => {
    return async(dispatch) => {

        const token = localStorage.getItem('token') || '';
        
        try {
            const { data } = await axios.post(`${point}/auth/facebook`, response, {headers: {'x-token': token}});

            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(getRecord(data.record))

            const { id, name } = data.usuario

            await dispatch(onLogin({
                uid: id,
                name: name,
                usuarioActivo: data.usuario
            }))

        } catch (error) {
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
                icon: 'error',
                title: error
            })
        }       
    }
}

export const crearUsuario = (name, lastName, email, password) => {
    return async(dispatch) => {
        try {
            const { data } = await axios.post(`${point}/auth/new`, {name, lastName, email, password})

            dispatch(onRegister({
                uid: data.uid,
                name: data.name,
                usuarioActivo: data.usuario
            }))

            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime());

        } catch ({ response }) {
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
                icon: 'error',
                title: response.data.msg
            })
        }
    }
}

export const iniciarActualizacion = (id, name, lastName, email, password, role, avatar) => {
    return async(dispatch) => {

        const token = localStorage.getItem('token') || '';

        try {
            const { data } = await axios.put(`${point}/auth/${id}`, {name, lastName, email, password, role, avatar}, {headers: {'x-token': token}})
    
            if (data.ok) {

                dispatch(onUpdate(data.usuario))
    
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
                    title: 'Usuario actualizado correctamente'
                })
            }
        } catch ({response}) {
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
                icon: 'error',
                title: response.data.msg
            })
        }
        

    }
}

export const iniciarActualizacionUserSelected = (id, name, lastName, email, password, role, oldPassword) => {
    return async(dispatch) => {

        if (!password) {
            password = oldPassword
        }

        const token = localStorage.getItem('token') || '';

        try {
            const { data } = await axios.put(`${point}/auth/${id}`, {name, lastName, email, password, role}, {headers: {'x-token': token}})
    
            if (data.ok) {

                dispatch(onUpdateUser(data.usuario))
    
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
                    title: 'Usuario actualizado correctamente'
                })
            }
        } catch ({response}) {
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
                icon: 'error',
                title: response.data.msg
            })
        }
        

    }
}

export const iniciarActualizacionTema = (tema, usuarioActivo, selected) => {
    return async(dispatch) => {

        const token = localStorage.getItem('token') || '';

        try {
            const { data } = await axios.put(`${point}/auth/${usuarioActivo?.id}`, {...usuarioActivo, tema, selected}, {headers: {'x-token': token}})
    
            if (data.ok) {

                dispatch(onUpdate(data.usuario))
    
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
                    title: 'Tema actualizado correctamente'
                })
            }
        } catch ({response}) {
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
                icon: 'error',
                title: response.data.msg
            })
        }
        

    }
}

export const iniciarActualizacionPass = (id, name, lastName, email, password, role) => {
    return async(dispatch) => {

        const token = localStorage.getItem('token') || '';

        try {
            const { data } = await axios.put(`${point}/auth/updatePassword/${id}`, {id, name, lastName, email, password, role}, {headers: {'x-token': token}})
    
            if (data.ok) {

                dispatch(onUpdate(data.usuario))
    
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
                    title: 'Usuario actualizado correctamente'
                })
            }
        } catch ({response}) {
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

        const token = localStorage.getItem('token') || '';

        try {
            const { data } = await axios.get(`${point}/auth/renew`, {headers: {'x-token': token}});
            
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(getRecord(data.record))

            const { id, name } = data.usuario

            dispatch(onLogin({
                uid: id,
                name: name,
                usuarioActivo: data.usuario
            }))
        } catch (error) {
            localStorage.removeItem('token')
            localStorage.removeItem('token-init-date')
            dispatch(onChecking())
            dispatch(onLogout())
        }
    }
}

export const eliminarUsuario = (usuario) => {
    return async(dispatch) => {

        const token = localStorage.getItem('token') || '';

        try {
            const { data } = await axios.delete(`${point}/auth/${usuario?.id}`, {headers: {'x-token': token}});

            if (data.ok) {

                dispatch(onDelete(usuario))
                
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
                    title: 'Usuario eliminado correctamente'
                })
            }

        } catch (error) {
            console.log(error)
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

        const token = localStorage.getItem('token') || '';

        try {
            const { data } = await axios.put(`${point}/auth/${usuarioActivo?.id}`, {...usuarioActivo, juego}, {headers: {'x-token': token}})
            dispatch(onUpdate(data.usuario))
            dispatch(obtenerUsuarios())
            
        } catch (error) {
            console.log(error)
        }

    }
}