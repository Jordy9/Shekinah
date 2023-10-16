import React from 'react'
import { Box, Button, Grid, Paper, Toolbar, Typography } from '@mui/material';
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

    const terminarJuego = () => {
        dispatch(BorrarPregunta(record?._id))
        dispatch(GuardarRecord(record))
    }

    useEffect(() => {
      
        if (!record) {
            navigate('/Lobi')
        }

    }, [record, navigate])
    
  return (
    <DashBoardLayaout>
        {/* <Toolbar variant='dense' />
        <Grid container>
            {
                record?.preguntas.map(( pregunta, index ) => (
                    <Grid mx={ 2 } display={ 'flex' } justifyContent={ 'space-between' } flexDirection={ 'column' } key={ pregunta._id } sx={{ borderRadius: '11px', p: 2 }} item xs={12} sm={ 6 } md={ 4 } lg={ 3 } className={`${ ( record?.seleccionadas[index]?.respuesta?.correcta ) ? 'bg-success' : 'bg-danger' }`}>
                        { pregunta.pregunta }

                        <Box>
                            {
                                ( record?.preguntas[index]?.desdeVersiculo === record?.preguntas[index]?.hastaVersiculo )
                                    ?
                                <Typography sx={{ backgroundColor: 'black', borderRadius: '11px', px: 1, py: 0.5 }} variant='subtitle2' color={'white'} component={'span'}>Leer: {record?.preguntas[index]?.libro} {Number(record?.preguntas[index]?.capitulo) + 1}:{Number(record?.preguntas[index]?.desdeVersiculo) + 1}</Typography>
                                    :
                                <Typography sx={{ backgroundColor: 'black', borderRadius: '11px', px: 1, py: 0.5 }} variant='subtitle2' color={'white'} component={'span'}>Leer: {record?.preguntas[index]?.libro} {Number(record?.preguntas[index]?.capitulo) + 1}:{Number(record?.preguntas[index]?.desdeVersiculo) + 1}-{Number(record?.preguntas[index]?.hastaVersiculo) + 1}</Typography>
                            }
                        </Box>
                    </Grid>
                ))
            }

        </Grid>
            <Box display={ 'flex' } justifyContent={ 'center' } mt={ 5 }>
                <Button sx={{ width: 300 }} onClick={terminarJuego} variant = 'contained'>Terminar</Button>
            </Box> */}
        <Grid container display = {'flex'} justifyContent = {'center'} alignItems = {'center'} sx = {{height: '100%'}}>
            <Grid sx = {12} mt={2}>
                <Grid>
                    <Paper sx = {{p: 4}} elevation={10} style = {{width: '400px', height: 'auto', borderRadius: '20px'}}>
                        <Typography variant = 'h6' textAlign={'center'}>Resultados de la ronda</Typography>
                        <Grid my={2} container display={'flex'} justifyContent = {'center'}>
                            <Grid>
                                <Typography variant = 'h6' textAlign={'center'}>Aciertos: {record?.aciertos}</Typography>
                                <Typography variant = 'h6' textAlign={'center'}>Errores: {record?.errores}</Typography>
                                <Typography variant = 'h6' textAlign={'center'}>Puntos: {record?.puntos}</Typography>
                                <Typography variant = 'h6' textAlign={'center'}>Racha: {record?.racha}x</Typography>
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
