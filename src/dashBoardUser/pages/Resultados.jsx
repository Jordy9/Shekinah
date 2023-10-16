import React from 'react'
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { BorrarPregunta } from '../../store/record/thunk';
import { GuardarRecord } from '../../store/auth/thunk';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useResponsive } from '../../hooks/useResponsive';

export const Resultados = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate()

    const { record } = useSelector(state => state.rc);

    const terminarJuego = () => {
        dispatch(BorrarPregunta(record?._id))
        dispatch(GuardarRecord(record))
    }

    const precision = ( record?.aciertos / record?.preguntas?.length ) * 100

    const precisionFinal = ( precision > 0 ) ? precision.toFixed(1) : precision

    useEffect(() => {
      
        if (!record) {
            navigate('/Lobi')
        }

    }, [record, navigate])

    const [ respWidth ] = useResponsive();

    const percent = ( respWidth > 600 ) ? '80%' : '75%'

    const percent2 = ( respWidth > 600 ) ? '20%' : '25%'

    const variant = ( respWidth > 700 ) ? 'h2' : 'h4'

    const py = ( respWidth > 700 ) ? 3 : 1

    const px = ( respWidth > 700 ) ? 3 : 1.5

    // const resultsRecord = [{ labbel: 'Puntuación', record: record?.puntos }, { label: 'Aciertos', record: record?.aciertos }, { label: 'Errores', record: record?.errores }, { label: ( respWidth > 700 ) ? 'Total de preguntas' : 'Preguntas', record: record?.preguntas?.length }, { label: 'Precisión' , record: `${ precisionFinal }%` }]
    
  return (
    <Box py={ py } px={ px } sx={{ height: '100vh', width: '100%' }}>
        <Typography variant='h4' className='noTextWhite'>Resultados</Typography>
        <Box component={ Paper } p={ 2 } elevation={10} sx = {{width: '100%', height: '80vh', borderRadius: '10px'}}>
            <Box overflow={ 'auto' } height={ percent }>
                <Grid container spacing={2} mb={ 3 }>
                    {
                        record?.preguntas?.map(( pregunta, index ) => (
                            <Grid key={ pregunta._id } item xs={12} sm={ 6 } md={ 4 } lg={ 4 }>
                                <Box component={ Paper } elevation={ 5 } sx={{ p: 2, borderRadius: '11px', height: '100%' }} display={ 'flex' } justifyContent={ 'space-between' } flexDirection={ 'column' } className={`${ ( record?.seleccionadas[index]?.respuesta?.correcta ) ? 'bg-success' : 'bg-danger' }`}>
                                    { pregunta.pregunta }

                                    <Box display={ 'flex' }>
                                        {
                                            ( record?.preguntas[index]?.desdeVersiculo === record?.preguntas[index]?.hastaVersiculo )
                                                ?
                                            <Typography sx={{ backgroundColor: 'black', borderRadius: '11px', px: 1, py: 0.5 }} variant='subtitle2' color={'white'} component={'span'}>Leer: {record?.preguntas[index]?.libro} {Number(record?.preguntas[index]?.capitulo) + 1}:{Number(record?.preguntas[index]?.desdeVersiculo) + 1}</Typography>
                                                :
                                            <Typography sx={{ backgroundColor: 'black', borderRadius: '11px', px: 1, py: 0.5 }} variant='subtitle2' color={'white'} component={'span'}>Leer: {record?.preguntas[index]?.libro} {Number(record?.preguntas[index]?.capitulo) + 1}:{Number(record?.preguntas[index]?.desdeVersiculo) + 1}-{Number(record?.preguntas[index]?.hastaVersiculo) + 1}</Typography>
                                        }
                                    </Box>
                                </Box>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>

            <Grid borderTop={ 1 } container display={ 'flex' } justifyContent={ 'space-between' } alignItems={ 'center' } height={ percent2 }>
                <Box>
                    <Typography textAlign={ 'center' } variant={ variant } className='TextInfo'>{ record?.puntos }</Typography>
                    <Typography textAlign={ 'center' }>Puntuación</Typography>
                </Box>
                <Box>
                    <Typography textAlign={ 'center' } variant={ variant } className='TextSuccess'>{ record?.aciertos }</Typography>
                    <Typography textAlign={ 'center' }>Aciertos</Typography>
                </Box>
                <Box>
                    <Typography textAlign={ 'center' } variant={ variant } className='TextError'>{ record?.errores }</Typography>
                    <Typography textAlign={ 'center' }>Errores</Typography>
                </Box>
                <Box>
                    <Typography textAlign={ 'center' } variant={ variant } className='TextPrimary'>{ record?.preguntas?.length }</Typography>
                    <Typography textAlign={ 'center' }>{ ( respWidth > 700 ) ? 'Total de preguntas' : 'Preguntas' }</Typography>
                </Box>
                <Box>
                    <Typography textAlign={ 'center' } variant={ variant } className='noTextWhite'>{ precisionFinal }%</Typography>
                    <Typography textAlign={ 'center' }>Precisión</Typography>
                </Box>
            </Grid>
        </Box>


        <Box position={ 'absolute' } bottom={ 15 } right={ 20 }>
            <Button sx={{ width: 300 }} onClick={terminarJuego} variant = 'contained'>Terminar</Button>
        </Box>
    </Box>
  )
}
