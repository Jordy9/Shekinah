import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { iniciarActualizacionPass } from '../../store/auth/thunk'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'

export const DialogCambPass = ({showDialogPass, setShowDialogPass}) => {

    const dispatch = useDispatch();

    const { usuarioActivo } = useSelector(state => state.auth);

    const {handleSubmit, getFieldProps, touched, errors} = useFormik({
        initialValues: {
            passwordActual: '',
            password: '',
            confirmPassword: ''
        },
        enableReinitialize: true,
        onSubmit: ({passwordActual, password}) => {
            dispatch(iniciarActualizacionPass(usuarioActivo?.id, usuarioActivo?.name, usuarioActivo?.lastName, usuarioActivo?.email.toLowerCase(), passwordActual, password, usuarioActivo?.role))
        },
        validationSchema: Yup.object({
            passwordActual: Yup.string()
                        .required('Requerido'),
            password: Yup.string()
                        .min(8, 'Debe de tener 8 caracteres o más')
                        .required('Requerido'),
            confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password')], 'Las contraseñas deben ser iguales')
                        .required('Requerido'),
        })
    })

    const handleClose = () => {
        setShowDialogPass(false)
    }

    const handledButton = () => {
        document.getElementById('idButton').click()
    }

  return (
    <Dialog
        open={showDialogPass}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        scroll={'paper'}
    >
        <DialogTitle id="alert-dialog-title">
          <Typography variant = 'h3' textAlign={'center'} color={'black'}>Cambiar contraseña</Typography>
        </DialogTitle>
        <DialogContent>
            <form onSubmit={handleSubmit}>
                <TextField fullWidth sx = {{my: 1}} {...getFieldProps('passwordActual')} id="filled-basic" label="Contraseña" variant="standard" />
                <TextField fullWidth sx = {{my: 1}} {...getFieldProps('password')} id="filled-basic" label="Contraseña nueva" variant="standard" />
                <TextField fullWidth sx = {{my: 1}} {...getFieldProps('confirmPassword')} id="filled-basic" label="Escribe de nuevo la nueva contraseña" variant="standard" />
                <button type='submit' id='idButton' hidden></button>
            </form>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} variant='contained'>Cancelar</Button>
            <Button type='submit' onClick={handledButton} variant='contained'>Guardar</Button>
        </DialogActions>
      </Dialog>
  )
}
