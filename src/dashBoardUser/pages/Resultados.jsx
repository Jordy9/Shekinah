import React from 'react'
import { Button, Grid, Paper, Typography } from '@mui/material';
import { DashBoardLayaout } from '../layaout/DashBoardLayaout';
import { useDispatch, useSelector } from 'react-redux';
import { BorrarPregunta } from '../../store/record/thunk';
import { GuardarRecord } from '../../store/auth/thunk';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Resultados = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate()

    const { record } = useSelector(state => state.rc);

    const { uid } = useSelector(state => state.auth);

    const recordUsuario = record?.find(record => record.idJugador === uid)

    const terminarJuego = () => {
        dispatch(BorrarPregunta(recordUsuario?._id))
        dispatch(GuardarRecord(recordUsuario))
    }

    useEffect(() => {
      
        if (!recordUsuario) {
            navigate('/Lobi')
        }

    }, [recordUsuario, navigate])
    
  return (
    <DashBoardLayaout>
        <Grid container display = {'flex'} justifyContent = {'center'} alignItems = {'center'} sx = {{height: '100%'}}>
            <Grid sx = {12} mt={2}>
                <Grid>
                    <Paper sx = {{p: 4}} elevation={10} style = {{width: '400px', height: 'auto', borderRadius: '20px'}}>
                        <Typography variant = 'h6' textAlign={'center'}>Resultados de la ronda</Typography>
                        <Grid my={2} container display={'flex'} justifyContent = {'center'}>
                            <Grid>
                                <Typography variant = 'h6' textAlign={'center'}>Aciertos: {recordUsuario?.aciertos}</Typography>
                                <Typography variant = 'h6' textAlign={'center'}>Errores: {recordUsuario?.errores}</Typography>
                                <Typography variant = 'h6' textAlign={'center'}>Puntos: {recordUsuario?.puntos}</Typography>
                                <Typography variant = 'h6' textAlign={'center'}>Racha: {recordUsuario?.racha}x</Typography>
                            </Grid>
                        </Grid>
                        <Button onClick={terminarJuego} variant = 'contained' type='submit' fullWidth>Terminar</Button>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    </DashBoardLayaout>
  )
}
