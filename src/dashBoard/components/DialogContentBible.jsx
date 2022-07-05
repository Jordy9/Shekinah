import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react'

export const DialogContentBible = ({ShowDialog, setShowDialog, content, capitulo, libro, inicio, fin}) => {
    
    const handleClose = () => {
        setShowDialog(false); 
    };

  return (
    <Dialog
        open={ShowDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
          {libro} {Number(capitulo) + 1}
        </DialogTitle>
        <DialogContent>
          {
            content?.map((contenido, index) => {
              return (
                <DialogContentText key={contenido + index} id="alert-dialog-description">
                  {index + inicio + 1}. {contenido}
                </DialogContentText>

              )
            })
          }
        </DialogContent>
    </Dialog>
  )
}
