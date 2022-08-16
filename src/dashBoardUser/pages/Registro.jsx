import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import * as Yup from 'yup'
import { crearUsuario } from '../../store/auth/thunk'

export const Registro = () => {

    const dispatch = useDispatch()

    const {handleSubmit, resetForm, getFieldProps, touched, errors} = useFormik({
        initialValues: {
            name: '', 
            lastName: '', 
            email: '',
            password: '',
            confirmPassword: ''
        },
        enableReinitialize: true,
        onSubmit: ({name, lastName, email, password}) => {
            dispatch(crearUsuario(name, lastName, email.toLowerCase(), password))
        },
        validationSchema: Yup.object({
            name: Yup.string()
                        .max(50, 'Debe de tener 50 caracteres o menos')
                        .min(3, 'Debe de tener 3 caracteres o más')
                        .required('Requerido'),
            lastName: Yup.string()
                        .max(50, 'Debe de tener 50 caracteres o menos')
                        .min(3, 'Debe de tener 3 caracteres o más')
                        .required('Requerido'),
            email: Yup.string()
                        .email('La dirección de email no es válida')
                        .required('Requerido'),
            password: Yup.string()
                        .min(8, 'Debe de tener 8 caracteres o más')
                        .required('Requerido'),
            confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password')], 'Las contraseñas deben ser iguales')
                        .required('Requerido')
        })
    })

    return (
        <>
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 d-flex justify-content-center align-items-center mt-5">
                    <div style = {{border: 'none'}}>
                        <div className = 'shadow p-4 mt-2 bg-white image-round flex-column text-black' style = {{width: '400px', height: 'auto', borderRadius: '20px'}}>
                            <h5 className="text-black text-center my-4">Formulario de Registro</h5>
                            <div className="card-body">
                                <form onSubmit={handleSubmit} className = 'my-4'>
                                    <div className="row">
                                        <div className="col form-group">
                                            <label className='text-black'>Nombre</label>
                                            <input {...getFieldProps('name')} style={{border: 'none', borderBottom: '2px solid'}} type="text" placeholder = 'Juan' className = 'form-control text-black' />
                                            {touched.name && errors.name && <span style={{color: 'red'}}>{errors.name}</span>}
                                        </div>

                                        <div className="col form-group">
                                            <label className='text-black'>Apellido</label>
                                            <input {...getFieldProps('lastName')} style={{border: 'none', borderBottom: '2px solid'}} type="text" placeholder = 'Taveras' className = 'form-control text-black' />
                                            {touched.lastName && errors.lastName && <span style={{color: 'red'}}>{errors.lastName}</span>}
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col form-group">
                                            <label className='text-black'>Correo Electrónico</label>
                                            <input {...getFieldProps('email')} style={{border: 'none', borderBottom: '2px solid'}} type="text" placeholder = 'Juan123@hotmail.com' className = 'form-control text-black ' />
                                            {touched.email && errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col form-group">
                                            <label className='text-black'>Contrasena</label>
                                            <input {...getFieldProps('password')} style={{border: 'none', borderBottom: '2px solid'}} type="password" autoComplete='off' placeholder = '********' className = 'form-control text-black' />
                                            {touched.password && errors.password && <span style={{color: 'red'}}>{errors.password}</span>}
                                        </div>


                                        <div className="col form-group">
                                            <label className='text-black'>Confirmar Contrasena</label>
                                            <input {...getFieldProps('confirmPassword')} style={{border: 'none', borderBottom: '2px solid'}} type="password" autoComplete='off' placeholder = '********' className = 'form-control text-black' />
                                            {touched.confirmPassword && errors.confirmPassword && <span style={{color: 'red'}}>{errors.confirmPassword}</span>}
                                        </div>
                                    </div>
                                    <button type='submit' className = 'button-76 mt-4' style={{backgroundColor: 'rgba(33,93,59,255)', color: 'white'}}>Registrarse</button>
                                </form>

                                <div className = 'text-center my-4'>
                                    <NavLink to = '/Lobi' style = {{borderRadius: '50px', textDecoration: 'none', color: 'black'}}>¿Aun no tienes una cuenta? Registrate</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
