import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { guardarNotify } from '../../store/auth/thunk';

export const DialogNextLevel = ({ show, level }) => {

    const dispatch = useDispatch();

    const [showDialog, setShowDialog] = useState(false)

    const handleClose = () => {
        dispatch( guardarNotify() )
        setShowDialog(false)
    }

    useEffect(() => {

        if ( !show || level === 'Tierno' ) return

        setShowDialog(true)
    }, [])

  return (
    <Dialog
        open={showDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        scroll={'paper'}
    >
        <DialogTitle align='center'>
            ¡Felicidades estás creciendo!
        </DialogTitle>
        <DialogContent>

            {
                ( level === 'Medio' )
                    &&
                <>
                    <Typography mb={ 2 } variant='h6'>¡Ahora tu nivel es { <Typography sx={{ p: 1, backgroundColor: '#f57c00', borderRadius: '12px', color: 'white' }} component={'span'}>{level}</Typography> }, tu conocimiento bíblico sigue creciendo, y estás edificando una base sólida en tu fe. Recuerda Isaías 40:31: 'Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas, correrán y no se cansarán, caminarán y no se fatigarán.' Cada paso que das en tu aprendizaje es un paso hacia un entendimiento más profundo y una fe más sólida.</Typography>
                    <Typography variant='h6'>¡Dios te guía en este camino. Como dice Salmo 119:105: 'Lámpara es a mis pies tu palabra, y lumbrera a mi camino!</Typography>
                </>
            }

            {
                ( level === 'Avanzado' )
                    &&
                <>
                    <Typography mb={ 2 } variant='h6'>¡Ahora tu nivel es { <Typography sx={{ p: 1, backgroundColor: 'error.main', borderRadius: '12px', color: 'white' }} component={'span'}>{level}</Typography> }, tienes un profundo conocimiento de las Escrituras, y tu fe es una fuente de inspiración. Recuerda Proverbios 3:5-6: 'Confía en Jehová con todo tu corazón, y no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos, y Él enderezará tus veredas.' Tu dedicación a la Palabra de Dios es un testimonio poderoso.</Typography>
                    <Typography variant='h6'>Y recuerda las palabras de 2 Corintios 12:9: 'Y me ha dicho: Bástate mi gracia; porque mi poder se perfecciona en la debilidad'. Tu firmeza en la fe es un faro que ilumina el camino espiritual de otros, mostrando cómo la gracia del Señor Jesucristo nos fortalece en nuestras debilidades.</Typography>
                </>
            }

        </DialogContent>
        <DialogActions sx={{ px: 2 }} >
            <Button fullWidth onClick={ handleClose } variant='contained'>Cerrar</Button>
        </DialogActions>
    </Dialog>
  )
}
