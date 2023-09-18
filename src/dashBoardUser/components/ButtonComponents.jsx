import { Button } from '@mui/material'
import React from 'react'
import { useResponsive } from '../../hooks/useResponsive'

export const ButtonComponents = ({ handleClose, showPregunta, submitt, handleButton }) => {

    const [ respWidth ] = useResponsive();

  return (
    <>
        <Button fullWidth variant = 'contained' type='button' onClick={handleClose}>
            Cerrar
        </Button>
        {
        (showPregunta)
            ?
        <Button fullWidth variant = 'contained' type='button' onClick={submitt}>
            Jugar partida con id
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
