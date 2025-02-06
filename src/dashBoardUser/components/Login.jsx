import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login';
import { iniciarLogin, startLoginFacebook, startLoginGoogle } from '../../store/auth/thunk';
import { Button, Checkbox, FormControlLabel, FormGroup, Grid, Paper, TextField, Typography } from '@mui/material';

export const Login = () => {

    const dispatch = useDispatch()

    const email = localStorage.getItem('email')

    const [remember, setRemember] = useState();

    useEffect(() => {
        if (email) {
            setRemember(true)
        }
    }, [email]);

    const { handleSubmit, getFieldProps, touched, errors } = useFormik({
        initialValues: {
            email: localStorage.getItem('email') || '',
            password: '',
            rememberme: (email) ? true : false
        },
        enableReinitialize: true,
        onSubmit: ({ email, password, rememberme }) => {
            (rememberme)
                ?
                localStorage.setItem('email', email.trim().toLowerCase())
                :
                localStorage.removeItem('email')
            dispatch(iniciarLogin(email.trim().toLowerCase(), password))

        },
        validationSchema: Yup.object({
        })
    })

    const onSuccessLogin = async (response) => {
        dispatch(startLoginGoogle(response))
    }
    const onErrorLogin = (response) => {
        console.log(response)
    }

    // const responseFacebook = (response) => {
    //     dispatch(startLoginFacebook(response))
    // }

    return (
        <>
            <Grid display={'flex'} justifyContent={'center'} container my={2}>
                <Grid>
                    <Grid item xs={12}>
                        <Grid p={2}>
                            <Paper sx={{ p: 4 }} elevation={10} style={{ maxWidth: '400px', height: 'auto', borderRadius: '20px' }}>
                                <Typography variant='h5' textAlign={'center'}>Iniciar sesión</Typography>
                                <Grid contained>
                                    <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
                                        <Grid contained>

                                            <Grid item xs={12} mb={1}>
                                                <TextField sx={{ color: 'black' }} fullWidth autoComplete='off' {...getFieldProps('email')} id="filled-basic" label="Correo electrónico" variant="standard" />
                                                {touched.email && errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                                            </Grid>

                                        </Grid>

                                        <Grid container>

                                            <Grid item xs={12} mt={1}>
                                                <TextField fullWidth autoComplete='off' {...getFieldProps('password')} id="filled-basic" label="Contraseña" variant="standard" />
                                                {touched.password && errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                                            </Grid>

                                        </Grid>

                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox {...getFieldProps('rememberme')} defaultChecked={(email) && true} />} label="Recuerdame" />
                                        </FormGroup>

                                        <Button fullWidth type='submit' variant='contained'>Iniciar sesión</Button>

                                        <Grid container mt={3}>
                                            <Grid item xs={12} display='flex' justifyContent={'center'}>
                                                <GoogleLogin
                                                    onSuccess={onSuccessLogin}
                                                    onError={onErrorLogin}
                                                    theme='filled_black'
                                                    size='medium'
                                                    useOneTap={false}
                                                />
                                            </Grid>
                                        </Grid>
                                    </form>

                                    <Grid mb={2} textAlign={'center'}>
                                        <NavLink to='/Registro' style={{ borderRadius: '50px', color: 'black' }}>¿Aun no tienes una cuenta? Registrate</NavLink>
                                    </Grid>

                                    {/* <Grid textAlign={'center'} className = 'text-center'>
                                    <NavLink to = '/ForgotPassword' style = {{borderRadius: '50px', color: 'black'}}>¿Olvidaste tu contraseña?</NavLink>
                                </Grid> */}

                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
