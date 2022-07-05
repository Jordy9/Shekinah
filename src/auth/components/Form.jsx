import { Facebook, Google } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export const Form = () => {
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
                <Typography variant='h6'>Login</Typography>
                <form>
                    <Grid container>
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
                                    Iniciar Sesión
                                </Button>
                            </Grid>
                            
                            <Grid justifyContent='center' container item xs = {12}>
                                <Button variant='text'>o</Button>
                            </Grid>

                            <Grid item xs = {12}>
                                <Button variant='contained' fullWidth>
                                    <Google />
                                    <Typography marginLeft = {1}>Google</Typography>
                                </Button>
                            </Grid>

                            <Grid item xs = {12}>
                                <Button variant='contained' fullWidth>
                                    <Facebook />
                                    <Typography marginLeft = {1}>Facebook</Typography>
                                </Button>
                            </Grid>

                        </Grid>

                        <Grid container direction='row' justifyContent='end'>
                            <Link color='primary' to='/auth/register'>
                                Crear una cuenta
                            </Link>
                        </Grid>

                    </Grid>
                </form>
            </Grid>
    </Grid>
  )
}
