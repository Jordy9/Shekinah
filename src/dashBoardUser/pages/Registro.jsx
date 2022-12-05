import { Button, FormGroup, Grid, Paper, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import * as Yup from 'yup'
import { useResponsive } from '../../hooks/useResponsive'
import { crearUsuario } from '../../store/auth/thunk'
import { DashBoardLayaout } from '../layaout/DashBoardLayaout'

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

    const [ respWidth ] = useResponsive()

    return (
        <DashBoardLayaout>
            <Grid container display = {'flex'} justifyContent = {'center'} alignItems = {'center'} sx = {{height: '100%'}}>
                <Grid sx = {12} mt={2}>
                    <Grid>
                        <Paper sx = {{p: 4}} elevation={10} style = {{width: '400px', height: 'auto', borderRadius: '20px'}}>
                            <Typography variant = 'h6' textAlign={'center'}>Formulario de Registro</Typography>
                            <Grid>
                                <form onSubmit={handleSubmit} style = {{marginTop: '1.5rem', marginBottom: '1.5rem'}}>
                                    <Grid container>
                                        <Grid xs = {12} sm = {12} md = {12} lg = {5} xl = {5}>
                                            <FormGroup>
                                                <TextField fullWidth autoComplete='off' {...getFieldProps('name')} id="filled-basic" label="Nombre" variant="standard" />
                                                {touched.name && errors.name && <span style={{color: 'red'}}>{errors.name}</span>}
                                            </FormGroup>
                                        </Grid>

                                        <Grid sx = {{ml: (respWidth > 991) && 1}} xs = {12} sm = {12} md = {12} lg = {5} xl = {5}>
                                            <FormGroup>
                                                <TextField fullWidth autoComplete='off' {...getFieldProps('lastName')} id="filled-basic" label="Apellido" variant="standard" />
                                                {touched.lastName && errors.lastName && <span style={{color: 'red'}}>{errors.lastName}</span>}
                                            </FormGroup>
                                        </Grid>
                                    </Grid>
                                    
                                    <Grid container my={3}>
                                        <Grid xs = {12} sm = {12} md = {12} lg = {12} xl = {12}>
                                            <FormGroup>
                                                <TextField fullWidth autoComplete='off' {...getFieldProps('email')} id="filled-basic" label="Correo Electrónico" variant="standard" />
                                                {touched.lastName && errors.lastName && <span style={{color: 'red'}}>{errors.lastName}</span>}
                                            </FormGroup>
                                            {touched.email && errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
                                        </Grid>
                                    </Grid>

                                    <Grid container mb = {2}>
                                        <Grid xs = {12} sm = {12} md = {12} lg = {5} xl = {5}>
                                            <FormGroup>
                                                <TextField fullWidth autoComplete='off' {...getFieldProps('password')} id="filled-basic" label="Contrasena" variant="standard" />
                                                {touched.password && errors.password && <span style={{color: 'red'}}>{errors.password}</span>}
                                            </FormGroup>
                                        </Grid>

                                        <Grid sx = {{ml: (respWidth > 991) && 1}} xs = {12} sm = {12} md = {12} lg = {5} xl = {5}>
                                            <FormGroup>
                                                <TextField fullWidth autoComplete='off' {...getFieldProps('confirmPassword')} id="filled-basic" label="Confirmar Contrasena" variant="standard" />
                                                {touched.confirmPassword && errors.confirmPassword && <span style={{color: 'red'}}>{errors.confirmPassword}</span>}
                                            </FormGroup>
                                        </Grid>
                                    </Grid>

                                    <Button variant = 'contained' type='submit' fullWidth>Registrarse</Button>
                                </form>

                                <Grid textAlign={'center'} my = {2}>
                                    <NavLink to = '/Login' style = {{borderRadius: '50px', color: 'black'}}>¿Ya tienes una cuenta? Inicia sesión</NavLink>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </DashBoardLayaout>
    )
}
