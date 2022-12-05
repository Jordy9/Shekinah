import React, { useState } from 'react'
// import { Modal, Button } from 'react-bootstrap'
import user from '../../heroes/user.webp'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { iniciarActualizacion } from '../../store/auth/thunk';
import { DashBoardLayaout } from '../layaout/DashBoardLayaout';
import { Box, Button, Divider, Grid, Paper, TextField, Typography } from '@mui/material';
import { DialogCambPass } from '../components/DialogCambPass';
// import { ModalCambPass } from './ModalCambPass';
// import { crearRecord } from '../../store/record/thunk';

export const Perfil = () => {

  const dispatch = useDispatch();

  const { usuarioActivo } = useSelector(state => state.auth);

  const {handleSubmit, resetForm, getFieldProps, touched, errors} = useFormik({
    initialValues: {
      name:  usuarioActivo?.name,
      lastName: usuarioActivo?.lastName,
      email:   usuarioActivo?.email,
    },
    enableReinitialize: true,
    onSubmit: ({name, lastName, email}) => {
        dispatch(iniciarActualizacion(usuarioActivo?.id, name, lastName, email.toLowerCase(), usuarioActivo?.password, usuarioActivo?.role))

        resetForm({
          name:  usuarioActivo?.name,
          lastName: usuarioActivo?.lastName,
          email:   usuarioActivo?.email,
        })
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
    })
  })

  const [showModalPass, setShowModalPass] = useState(false)

  return (
        <DashBoardLayaout>
            <Grid container>
                <Grid py = {4} px = {2} xs = {12} sm = {12} md = {12} lg = {4} xl = {4}>
                    <Paper elevation={10} sx = {{borderRadius: '20px'}}>
                        <Grid display={'flex'} justifyContent = {'center'}>
                            <Box mt={2}>
                                <img loading="lazy" src={user} style = {{width: '250px', height: '250px', clipPath: 'circle()'}} className='img-fluid' alt="" />
                            </Box>
                        </Grid>
                        
                        <form onSubmit={handleSubmit} style = {{paddingLeft: '1.5rem', paddingRight: '1.5rem', paddingBottom: '1.5rem'}}>
                            <Grid container mt={3}>
                                <Grid xs = {12} sm = {12} md = {12} lg = {6} xl = {6}>
                                    <TextField {...getFieldProps('name')} id="filled-basic" label="Nombre" variant="standard" />
                                    {touched.name && errors.name && <span style={{color: 'red'}}>{errors.name}</span>}
                                </Grid>

                                <Grid xs = {12} sm = {12} md = {12} lg = {6} xl = {6}>
                                    <TextField {...getFieldProps('lastName')} id="filled-basic" label="Apellido" variant="standard" />
                                    {touched.lastName && errors.lastName && <span style={{color: 'red'}}>{errors.lastName}</span>}
                                </Grid>
                            </Grid>

                            <Grid container mb={2}>
                                <Grid xs = {12} sm = {12} md = {12} lg = {8} xl = {8}>
                                    <TextField {...getFieldProps('email')} id="filled-basic" label="Correo electrónico" variant="standard" />
                                    {touched.email && errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
                                </Grid>

                                <Grid mt={2} xs = {12} sm = {12} md = {12} lg = {4} xl = {4}>
                                    <Button variant="contained" component="label">
                                        Imagen
                                        <input hidden accept="image/*" multiple type="file" />
                                    </Button>
                                </Grid>
                            </Grid>

                            <Button fullWidth onClick={() => setShowModalPass(true)} variant = 'contained' type='button'>Cambiar contraseña</Button>
                            
                            <Button sx={{mt: 2}} fullWidth variant = 'contained' type='submit'>Guardar</Button>
                        </form>
                    </Paper>
                </Grid>

                <Grid py = {4} px = {2} xs = {12} sm = {12} md = {12} lg = {8} xl = {8}>
                    <Paper elevation={10} sx = {{borderRadius: '20px', pt: 2}}>
                        <Typography variant = 'h5' textAlign={'center'} ><strong>Información de las partidas</strong></Typography>

                        <Grid display={'flex'} justifyContent = {'space-around'} container my={2} p = {2}>
                            <Grid>
                                <Typography variant = 'h5' textAlign={'center'}>Aciertos: {usuarioActivo?.juego?.aciertos || 0}</Typography>
                            </Grid>

                            <Grid>
                                <Typography variant = 'h5' textAlign={'center'}>Racha mas alta: {usuarioActivo?.juego?.racha - 1 || 0}</Typography>
                            </Grid>

                            <Grid>
                                <Typography variant = 'h5' textAlign={'center'}>Total de puntos: {usuarioActivo?.juego?.puntos || 0}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <DialogCambPass showDialogPass = {showModalPass} setShowDialogPass = {setShowModalPass} />
        </DashBoardLayaout>
  )
}
