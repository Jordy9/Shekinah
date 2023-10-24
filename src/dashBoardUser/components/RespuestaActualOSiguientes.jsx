import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

export const RespuestaActualOSiguientes = ({ recordRespuestas, handleResponse, response, show, showTrue }) => {
  return (
    <>
        {
            recordRespuestas.map((respuesta, index) => {
                const seleccionada = ( response && respuesta.texto === response[0].texto && response[0].correcta === false )
                const correcta = ( showTrue && respuesta?.correcta === true ) ? 'bg-success' : ''
                const incorrecta = ( showTrue && seleccionada ) ? 'bg-danger' : ''
                return (
                    <Grid item p={2} xs = {12} sm = {12} md = {12} lg = {6} xl = {6} key={respuesta.texto + index}>
                        <Box display = {'flex'} alignItems = 'center' position={ 'relative' }>
                            <Box display={ 'flex' } justifyContent={ 'center' } alignItems={ 'center' } sx={{ borderRadius: '50%', width: '20px', height: '20px', backgroundColor: 'primary.main', color: 'white', position: 'absolute', top: -5, left: 0, zIndex: 1 }}>
                                {index + 1}
                            </Box>

                            <Box 
                                onClick={() => handleResponse(respuesta, index, recordRespuestas)}
                                p={ 1 } sx={{ userSelect: 'none', backgroundColor: (response) && (Number(response[1]) === index + 1 && !show) ? 'primary.main' : '', cursor: 'pointer', maxHeight: '120px', overflowY: 'auto' }}
                                className={`${ correcta } ${ incorrecta } glass`}
                            >
                                <Typography component={ 'span' } ml={1} px={ 1 } variant = 'h6' style={{color: 'white'}}
                                >
                                    {respuesta.texto}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                )
            })
        }
    </>
  )
}
