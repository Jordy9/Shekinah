import { Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export const FormRegister = () => {
  return (
    <Grid 
        container
        justifyContent='center' 
        alignItems='center'
        direction='column'
        spacing={0}
        sx = {{p: 4, minHeight: '80vh'}}
    >
            <Grid item xs = {3} sx = {{p: 3, borderRadius: '12px', border: '1px solid'}}>
                <Typography variant='h6'>Registro</Typography>
                <form>
                    <Grid container>
                        <Grid item xs = {12} marginTop = {2}>
                            <TextField 
                                label = 'Nombre'
                                variant='standard'
                                fullWidth
                                placeholder='Nombre'
                                type='Text'
                            />
                        </Grid>

                        <Grid item xs = {12} marginTop = {2}>
                            <TextField 
                                label = 'Correo electrónico'
                                variant='standard'
                                fullWidth
                                placeholder='Ejemplo@gmail.com'
                                type='email'
                            />
                        </Grid>

                        <Grid item xs = {12}  marginTop = {2}>
                            <TextField 
                                variant='standard'
                                label = 'Contraseña'
                                fullWidth
                                placeholder='12345678'
                                type='password'
                            />
                        </Grid>

                        <Grid container spacing={2} marginBottom = {2} marginTop = {1}>
                            <Grid item xs = {12}>
                                <Button variant='contained' fullWidth>
                                    Crear Cuenta
                                </Button>
                            </Grid>

                        </Grid>

                        <Grid container direction='row' justifyContent='end'>
                            <Link color='primary' to='/auth/login'>
                                Iniciar sesión
                            </Link>
                        </Grid>

                    </Grid>
                </form>
            </Grid>
    </Grid>
  )
}
