import React from 'react'
import { Button, Grid, Typography } from '@mui/material'

export const RespuestasAnteriores = ({ recordRespuestas, seleccionadas, change }) => {
  return (
    <>
        {
            recordRespuestas?.map((respuesta, index) => {
                return (
                    <Grid item p={2} xs = {12} sm = {12} md = {12} lg = {6} xl = {6} key={respuesta + index}>
                        <Grid p={1} display = {'flex'} alignItems = 'center' sx={{cursor: 'pointer', maxHeight: '150px', overflowY: 'auto', borderRadius: '20px', margin: 0}}>
                            <Button variant='contained'>
                                {index + 1}
                            </Button>
                            
                            <Typography ml={1} px = {1} variant = 'h6' className={`${( respuesta.correcta ) && 'bg-success'} ${ ( !respuesta.correcta && ( seleccionadas.bottonIndexSelected === index ) ) && 'bg-danger' }`} style={{borderRadius: '20px'}}>
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
