import React, { useState } from 'react'
// import { Modal, Button } from 'react-bootstrap'
import user from '../../heroes/user.webp'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { iniciarActualizacion, iniciarActualizacionTema } from '../../store/auth/thunk';
import { DashBoardLayaout } from '../layaout/DashBoardLayaout';
import { Box, Button, Divider, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import { DialogCambPass } from '../components/DialogCambPass';
import { Check } from '@mui/icons-material';
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

  const temasDisponibles = [
    {
        color: '#4a148c',
        label: 'Indigo',
        selected: '#4a148c'
    },
    {
        color: '#008080',
        label: 'Turquesa',
        selected: '#008080'
    },
    {
        color: '#000080',
        label: 'Azul marino',
        selected: '#000080'
    },
    {
        color: '#1B2631',
        label: 'Azul oscuro',
        selected: '#1B2631'
    },
    {
        color: '#E74C3C',
        label: 'Naranja claro',
        selected: '#E74C3C'
    },
  ]

//   const temasDisponibles = [
//     {
//         color: '#4a148c',
//         label: 'Indigo',
//         selected: '#4a148c'
//     },
//     {
//         color: '#008080',
//         label: 'Turquesa',
//         selected: '#008080'
//     },
//     {
//         color: '#000080',
//         label: 'Azul marino',
//         selected: '#0000ce'
//     },
//     {
//         color: '#1B2631',
//         label: 'Azul oscuro',
//         selected: '#304357'
//     },
//     {
//         color: '#E74C3C',
//         label: 'Naranja claro',
//         selected: '#e43725'
//     },
//   ]

  const handleTheme = (tema, selected) => {
    if (localStorage.getItem('tema') === tema) return
    localStorage.setItem('tema', tema)
    localStorage.setItem('selected', selected)
    dispatch(iniciarActualizacionTema(tema, usuarioActivo, selected))
  }

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
                        <Typography variant = 'h5' textAlign={'center'} ><strong>Temas</strong></Typography>
                        <Grid display={'flex'} justifyContent = {'space-around'} alignItems = {'center'} container my={2} p = {2}>
                            {
                                temasDisponibles.map(({color, label, selected}) => {
                                    return (
                                        <>
                                            <Grid display = 'flex' justifyContent={'center'} onClick = {() => handleTheme(color, selected)} sx = {{height: '50px', width: '50px', clipPath: 'circle()', backgroundColor: color, cursor: 'pointer'}}>
                                                <IconButton>
                                                    {
                                                        (usuarioActivo?.tema === color)
                                                            &&
                                                        <Check color='secondary'/>
                                                    }
                                                </IconButton>
                                            </Grid>
                                            <Typography variant = 'h5' textAlign={'center'}>{label}</Typography>
                                        </>
                                    )
                                })
                            }
                        </Grid>
                    </Paper>

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
