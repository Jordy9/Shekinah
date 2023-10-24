import { ArrowForwardIos, HelpOutline, Logout } from '@mui/icons-material'
import { Box, Button, Grid, IconButton, MenuItem, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useResponsive } from '../../hooks/useResponsive'
import { useDispatch, useSelector } from 'react-redux'
import { guardarNivel, iniciarLogout } from '../../store/auth/thunk'
import { obtenerPreguntasAnalisis } from '../../store/preguntas/thunk'
import { useNavigate } from 'react-router-dom'

export const CualEsTuNivelComponent = () => {

    const dispatch = useDispatch();

    const { record } = useSelector(state => state.rc);

    const { usuarioActivo } = useSelector(state => state.auth);

    const navigate = useNavigate()

    const [selected, setSelected] = useState('')

    const [value, setValue] = useState('')

    const [ respWidth ] = useResponsive();

    useEffect(() => {

        if ( record ) {
            navigate('/inGame')
        }

        if ( !usuarioActivo.isLevel ) {
            navigate('/Lobi')
        }
      
    }, [record, navigate, usuarioActivo])
    
    const handleSaveNivel = () => {

        if ( selected === 'select' ) {
            dispatch( guardarNivel(value) )
        } else {
            dispatch( obtenerPreguntasAnalisis(selected) )
        }
    }

  return (
    <Box p={ 2 } sx={{ height: '100vh', width: '100%', position: 'relative' }}>
        <IconButton sx={{ position: 'absolute', top: 10, right: 15 }} color='error' onClick={() => dispatch(iniciarLogout())}>
            <Logout />
        </IconButton>
        <Typography align='center' component={'h1'} variant='h2'>Elige la opción para tu nivel</Typography>
        <Grid container columnSpacing={ 2 } rowSpacing={ 4 } sx={{ height: '70%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {
                niveles.map( nv => (
                    <Grid key={ nv.opcion } item xs={ 4 } onClick={ () => setSelected(nv.opcion) }>
                        <Box component={ Paper } sx={{ borderRadius: '12px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column', p: 2, backgroundColor: ( selected === nv.opcion ) ? 'primary.main' : 'white', cursor: 'pointer', color: ( selected === nv.opcion ) ? 'white' : 'inherit' }}>
                            <HelpOutline sx={{ fontSize: '100px' }} />
                            <Typography  sx={{ borderRadius: '12px', p: 1, backgroundColor: ( selected === nv.opcion ) ? 'white' : 'primary.main', color: ( selected === nv.opcion ) ? 'black' : 'white' }} align='center' component={'h1'} variant='h6'>{ nv.label }</Typography>
                            {
                                ( nv.subTitle === false )
                                    ?
                                <Box display={ 'flex' } justifyContent={ 'center' } alignItems={ 'center' }>
                                    <TextField onChange={ ({ target }) => setValue(target.value) } select sx={{ width: '300px', '& .MuiInputBase-root': { backgroundColor: 'white', borderColor: 'red' } }}>
                                        <MenuItem selected value={ '' }>
                                            Sin seleccionar
                                        </MenuItem>
                                        {
                                            nivelesSelect.map( nvs => (
                                                <MenuItem key={ nvs } value={ nvs }>
                                                    { nvs }
                                                </MenuItem>
                                            ))
                                        }
                                    </TextField>
                                </Box>
                                    :
                                <Typography align='center' component={'h1'} variant='h6'>{ nv.subTitle }</Typography>
                            }
                        </Box>
                    </Grid>
                ))
            }
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: ( respWidth > 991 ) ? 5 : 0 }}>
            <Button onClick={ handleSaveNivel } variant='contained' endIcon={ <ArrowForwardIos /> }>Continuar</Button>
        </Box>
    </Box>
  )
}

const niveles = [
    {
        label: 'Elegir nivel',
        subTitle: false,
        opcion: 'select'
    },
    {
        label: 'Analisis rápido',
        subTitle: 'Mediante 15 preguntas determinaremos tu nivel',
        opcion: 'rapido'
    },
    {
        label: 'Analisis profundo',
        subTitle: 'Mediante 30 preguntas determinaremos tu nivel',
        opcion: 'profundo'
    }
]

const nivelesSelect = [
    'Tierno',
    'Medio',
    'Avanzado'
]
