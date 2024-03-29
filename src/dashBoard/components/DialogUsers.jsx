import React, { useState } from 'react'
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import user from '../../heroes/user.webp'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { iniciarActualizacionUserSelected } from '../../store/auth/thunk';
import { DialogAvatar } from '../../dashBoardUser/components/DialogAvatar';

export const DialogUsers = ({ShowDialog, setShowDialog, usuario}) => {

    const dispatch = useDispatch();

    const { userActive } = useSelector(state => state.auth);

    const handleClose = () => {
        setShowDialog(false); 
    };

    const {handleSubmit, resetForm, getFieldProps, touched, errors} = useFormik({
        initialValues: {
          name: userActive?.name,
          lastName: userActive?.lastName,
          email: userActive?.email,
          password: '',
          confirmPassword: '',
          role: userActive?.role
        },
        enableReinitialize: true,
        onSubmit: ({name, lastName, email, password, role}) => {
            dispatch(iniciarActualizacionUserSelected(userActive?.id, name, lastName, email.toLowerCase(), password, role, userActive?.password))
    
            // resetForm({
            //   password: '',
            //   confirmPassword: ''
            // })
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
            confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password')], 'Las contraseñas deben ser iguales')
        })
      })

      const { name, category, backGround, radius, flip, rotate, translateX, translateY } = userActive?.avatar

      const [showDialogImagen, setShowDialogImagen] = useState(false)
  
    return (
        <Dialog
            open={ShowDialog}
            fullWidth
            maxWidth = 'sm'
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Ver o actualizar usuario
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid py = {4} px = {2} xs = {12} sm = {12} md = {12} lg = {12} xl = {12}>
                        <Paper elevation={10} sx = {{borderRadius: '20px'}}>
                            <Grid display={'flex'} justifyContent = {'center'}>
                                <Box mt={2} sx = {{overflow: 'hidden'}}>
                                    <img loading="lazy" src={`https://avatars.dicebear.com/api/${category}/:${name || userActive?.name}.svg`}
                                        style = {{
                                            backgroundColor: backGround, 
                                            width: '150px', 
                                            height: '150px', 
                                            borderRadius: `${radius}%`,
                                            transform: 
                                                `rotate(${rotate}deg) 
                                                translateX(${translateX}%) 
                                                translateY(${translateY}%) 
                                                scaleX(${(flip) ? '-1' : '1'})`,
                                        }} 
                                        alt="" 
                                    />
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

                                <Grid container mt={2}>
                                    <Grid xs = {12} sm = {12} md = {12} lg = {8} xl = {8}>
                                        <TextField {...getFieldProps('email')} id="filled-basic" label="Correo electrónico" variant="standard" />
                                        {touched.email && errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
                                    </Grid>

                                    <Grid mt={2} xs = {12} sm = {12} md = {12} lg = {4} xl = {4}>
                                        <Button onClick={() => setShowDialogImagen(true)} variant="contained" component="label">
                                            Imagen
                                        </Button>
                                    </Grid>
                                </Grid>

                                <Grid container mt={2}>
                                    <Grid xs = {12} sm = {12} md = {12} lg = {12} xl = {12}>
                                        <TextField fullWidth {...getFieldProps('role')} id="filled-basic" label="Rol" variant="standard" select>
                                            <MenuItem value="administrador">Administrador</MenuItem>
                                            <MenuItem value="usuario">Usuario</MenuItem>
                                        </TextField>
                                        {touched.role && errors.role && <span style={{color: 'red'}}>{errors.role}</span>}
                                    </Grid>
                                </Grid>

                                <Grid container>
                                    <Grid xs = {12} sm = {12} md = {12} lg = {6} xl = {6}>
                                        <TextField {...getFieldProps('password')} id="filled-basic" label="Contraseña" variant="standard" />
                                        {touched.password && errors.password && <span style={{color: 'red'}}>{errors.password}</span>}
                                    </Grid>

                                    <Grid xs = {12} sm = {12} md = {12} lg = {6} xl = {6}>
                                        <TextField {...getFieldProps('confirmPassword')} id="filled-basic" label="Confirmar contraseña" variant="standard" />
                                        {touched.confirmPassword && errors.confirmPassword && <span style={{color: 'red'}}>{errors.confirmPassword}</span>}
                                    </Grid>
                                </Grid>
                                
                                <Button sx={{mt: 2}} fullWidth variant = 'contained' type='submit'>Guardar</Button>
                            </form>
                        </Paper>
                    </Grid>

                    <Grid py = {4} px = {2} xs = {12} sm = {12} md = {12} lg = {12} xl = {12}>
                        <Paper elevation={10} sx = {{borderRadius: '20px', pt: 2}}>
                            <Typography variant = 'h5' textAlign={'center'} ><strong>Información de las partidas</strong></Typography>

                            <Grid display={'flex'} justifyContent = {'space-around'} container my={2} p = {2}>
                                <Grid>
                                    <Typography variant = 'h5' textAlign={'center'}>Aciertos: {userActive?.juego?.aciertos || 0}</Typography>
                                </Grid>

                                <Grid>
                                    <Typography variant = 'h5' textAlign={'center'}>Racha mas alta: {userActive?.juego?.racha - 1 || 0}</Typography>
                                </Grid>

                                <Grid>
                                    <Typography variant = 'h5' textAlign={'center'}>Total de puntos: {userActive?.juego?.puntos || 0}</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogAvatar showDialog={showDialogImagen} setShowDialog = {setShowDialogImagen} usuarioActivo = {userActive} />
        </Dialog>
    )
  }