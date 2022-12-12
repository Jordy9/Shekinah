import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, MenuItem, Switch, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import Categories from '../../helpers/Categories';
import { iniciarActualizacion } from '../../store/auth/thunk';

export const DialogAvatar = ({ showDialog, setShowDialog, usuarioActivo }) => {

    const dispatch = useDispatch();

    const handleClose = () => {
        setShowDialog(false); 
    };

    const [avatarConfig, setAvatarConfig] = useState({
        name: usuarioActivo?.avatar?.name || usuarioActivo?.name,
        category: usuarioActivo?.avatar?.category,
        backGround: usuarioActivo?.avatar?.backGround,
        radius: usuarioActivo?.avatar?.radius,
        flip: usuarioActivo?.avatar?.flip,
        rotate: usuarioActivo?.avatar?.rotate,
        translateX: usuarioActivo?.avatar?.translateX,
        translateY: usuarioActivo?.avatar?.translateY,
    })

    const { 
        name, category, backGround, radius, flip, rotate, translateX, translateY
    } = avatarConfig

    const handleAavatar = () => {
        dispatch(iniciarActualizacion(usuarioActivo?.id, usuarioActivo?.name, usuarioActivo?.lastName, usuarioActivo?.email, usuarioActivo?.password, usuarioActivo?.role, avatarConfig))
    }

  return (
    <Dialog
        open={showDialog}
        onClose={handleClose}
        fullWidth
        maxWidth = 'sm'
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        scroll={'paper'}
    >
        <DialogTitle id="alert-dialog-title">
            <Typography align='center' variant='h5'>Imagen de perfil</Typography>
        </DialogTitle>
        <DialogContent>
            <Grid display={'flex'} justifyContent = {'center'}>
                <Box mt={2} sx = {{overflow: 'hidden'}}>
                    <img loading="lazy" src={`https://avatars.dicebear.com/api/${category}/:${name}.svg`}
                        style = {{
                            backgroundColor: backGround, 
                            width: '250px', 
                            height: '250px', 
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

            <Grid mt={2} xs = {12} sm = {6} md = {6} lg = {6} xl = {6}>
                <TextField name='name' value={name} onChange={({target}) => setAvatarConfig({...avatarConfig, name: target.value})} id="filled-basic" fullWidth placeholder='Ejemplo: Mi nombre' label="Referencia del avatar" variant="standard" />
            </Grid>

            <Grid mt={2} xs = {12} sm = {6} md = {6} lg = {6} xl = {6}>
                <TextField name='category' value={category} onChange={({target}) => setAvatarConfig({...avatarConfig, category: target.value})} id="filled-basic" fullWidth label="Estilo" variant="standard" select>
                    {
                        (Categories.map(({label, name}) => (
                            <MenuItem key={name} value={name}>
                                {label}
                            </MenuItem>
                        )))
                    }
                </TextField>
            </Grid>

            <Grid mt={2}>
                <TextField name='backGround' value={backGround} onChange={({target}) => setAvatarConfig({...avatarConfig, backGround: target.value})} id="filled-basic" fullWidth type='color' label="Color del fondo" variant="standard" />
            </Grid>

            <Grid mt={2}>
                {radius}%
                <TextField InputProps={{inputProps: { max: 50, min: 0 }}} name='radius' value={radius} onChange={({target}) => setAvatarConfig({...avatarConfig, radius: target.value})} id="filled-basic" fullWidth type='range' label="Redondez" variant="standard" />
            </Grid>

            <Grid mt={2} xs = {12} sm = {6} md = {6} lg = {6} xl = {6}>
                <FormControlLabel 
                    control={<Switch defaultChecked = {flip} name='flip' value={flip} onChange={({target}) => setAvatarConfig({...avatarConfig, flip: target.checked})} focusVisibleClassName=".Mui-focusVisible" disableRipple />}
                    label = 'Voltear'
                />
            </Grid>

            <Grid mt={2} xs = {12} sm = {6} md = {6} lg = {6} xl = {6}>
                {rotate}
                <TextField InputProps={{inputProps: { max: 360, min: 0 }}} name='rotate' value={rotate} onChange={({target}) => setAvatarConfig({...avatarConfig, rotate: target.value})} id="filled-basic" fullWidth type='range' label="Rotar" variant="standard" />
            </Grid>

            <Grid mt={2} xs = {12} sm = {6} md = {6} lg = {6} xl = {6}>
                {translateX}
                <TextField InputProps={{inputProps: { max: 250, min: -250 }}} name='translateX' value={translateX} onChange={({target}) => setAvatarConfig({...avatarConfig, translateX: target.value})} id="filled-basic" fullWidth type='range' label="Mover horizontal" variant="standard" />
            </Grid>

            <Grid mt={2} xs = {12} sm = {6} md = {6} lg = {6} xl = {6}>
                {translateY}
                <TextField InputProps={{inputProps: { max: 250, min: -250 }}} name='translateY' value={translateY} onChange={({target}) => setAvatarConfig({...avatarConfig, translateY: target.value})} id="filled-basic" fullWidth type='range' label="Mover vertical" variant="standard" />
            </Grid>

        </DialogContent>
        <DialogActions>
            <Button fullWidth onClick={handleAavatar} variant='contained'>Guardar</Button>
        </DialogActions>
    </Dialog>
  )
}
