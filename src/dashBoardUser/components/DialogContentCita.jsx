import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import React, { Fragment } from 'react'

export const DialogContentCita = ({tipo, nota, ShowDialog, setShowDialog, content, capitulo, libro, inicio, fin}) => {

    const handleClose = () => {
        setShowDialog(false); 
    };

  return (
    <Dialog
        open={ShowDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        scroll={'paper'}
    >
        {
            ( tipo === 'Pregunta' )
                &&
            <DialogTitle id="alert-dialog-title">
                {libro} {Number(capitulo) + 1}
            </DialogTitle>
        }
        <DialogContent>
            {
                ( tipo === 'Pregunta' )
                    ?
                content?.map((contenido, index) => {
                    return (
                        <Fragment key={contenido + index}>
                            <Typography variant  = 'h6'>{index + Number(inicio) + 1}. {contenido}</Typography>
                        </Fragment>
                    ) 
                })
                    :
                <Typography variant  = 'h6'>{nota}</Typography>
            }
        </DialogContent>
        <DialogActions sx={{ px: 2 }} >
            <Button fullWidth onClick={handleClose} variant='contained'>Cerrar</Button>
        </DialogActions>
    </Dialog>
  )
}
