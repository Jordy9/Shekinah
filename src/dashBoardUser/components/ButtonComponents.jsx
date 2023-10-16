import { Button } from '@mui/material'
import React from 'react'
import { useResponsive } from '../../hooks/useResponsive'

export const ButtonComponents = ({ handleClose, showPregunta, submitt, handleButton }) => {

    const [ respWidth ] = useResponsive();

    const message = ( respWidth > 600 ) ? 'Jugar partida con id' : 'Jugar'

  return (
    <>
        <Button fullWidth variant = 'contained' type='button' onClick={handleClose}>
            Cerrar
        </Button>
        {
        (showPregunta)
            ?
        <Button fullWidth variant = 'contained' type='button' onClick={submitt}>
            { message }
        </Button>
            :
        <Button fullWidth onClick={handleButton} variant = 'contained' type='button'>
            {
                (respWidth > 991)
                    ?
                'Jugar partida personalizada'
                    :
                'Jugar'
            }
        </Button>
        }
    </>
  )
}
