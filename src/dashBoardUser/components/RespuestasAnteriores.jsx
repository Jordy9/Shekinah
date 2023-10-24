import React from 'react'
import { Box, Grid, Typography } from '@mui/material'

export const RespuestasAnteriores = ({ recordRespuestas, seleccionadas, change }) => {
  return (
    <>
        {
            recordRespuestas?.map((respuesta, index) => {
                const correcta = ( respuesta.correcta ) ? 'bg-success' : ''
                const incorrecta = ( !respuesta.correcta && ( seleccionadas.bottonIndexSelected === index ) ) ? 'bg-danger' : ''
                return (
                    <Grid item p={2} xs = {12} sm = {12} md = {12} lg = {6} xl = {6} key={respuesta.texto + index}>
                        <Box display = {'flex'} alignItems = 'center' position={ 'relative' }>
                            <Box display={ 'flex' } justifyContent={ 'center' } alignItems={ 'center' } sx={{ borderRadius: '50%', width: '20px', height: '20px', backgroundColor: 'primary.main', color: 'white', position: 'absolute', top: -5, left: 0, zIndex: 1 }}>
                                {index + 1}
                            </Box>

                            <Box 
                                p={ 1 } sx={{ userSelect: 'none', cursor: 'pointer', maxHeight: '120px', overflowY: 'auto' }}
                                className={`${correcta} ${incorrecta} glass`}
                                
                            >
                                <Typography component={ 'span' } ml={1} px = {1} variant = 'h6' style={{borderRadius: '20px', color: 'white'}}>
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
