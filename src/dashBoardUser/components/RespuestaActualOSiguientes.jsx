import { Button, Grid, Typography } from '@mui/material'
import React from 'react'

export const RespuestaActualOSiguientes = ({ recordRespuestas, handleResponse, response, show, showTrue }) => {
  return (
    <>
        {
            recordRespuestas.map((respuesta, index) => {
                const seleccionada = ( response && respuesta.texto === response[0].texto && response[0].correcta === false )
                return (
                    <Grid item p={2} xs = {12} sm = {12} md = {12} lg = {6} xl = {6} key={respuesta + index}>
                        <Grid p={1} display = {'flex'} alignItems = 'center' onClick={() => handleResponse(respuesta, index, recordRespuestas)} sx={{cursor: 'pointer', maxHeight: '150px', overflowY: 'auto', backgroundColor: (response) && (Number(response[1]) === index + 1 && !show) && 'warning.main', color: (response) && (Number(response[1]) === index + 1 && !show) && 'secondary.main', borderRadius: '20px', margin: 0}}>
                            <Button variant='contained'>
                                {index + 1}
                            </Button>
                            
                            <Typography ml={1} px = {1} variant = 'h6' className={`${(showTrue && respuesta?.correcta === true) && 'bg-success'} ${ ( showTrue && seleccionada ) && 'bg-danger' }`} style={{borderRadius: '20px'}}>
                                {respuesta.texto}
                            </Typography>
                        </Grid>
                    </Grid>
                )
            })
        }
    </>
  )
}
