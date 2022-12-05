import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { Fragment } from 'react'

export const DialogContentCita = ({ShowDialog, setShowDialog, content, capitulo, libro, inicio, fin}) => {

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
        <DialogTitle id="alert-dialog-title">
            {libro} {Number(capitulo) + 1}
        </DialogTitle>
        <DialogContent>
            {
                content?.map((contenido, index) => {
                    return (
                        <Fragment key={contenido + index}>
                            <h6>{index + Number(inicio) + 1}. {contenido}</h6>
                        </Fragment>
                    ) 
                })
            }
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} variant='contained'>Cerrar</Button>
        </DialogActions>
    </Dialog>
  )
}
