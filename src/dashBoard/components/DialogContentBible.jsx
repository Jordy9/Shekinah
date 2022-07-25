import { Dialog, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
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
        <DialogTitle id="alert-dialog-title" sx={{backgroundColor: '#383c45'}}>
          {libro} {Number(capitulo) + 1}
        </DialogTitle>
        <DialogContent sx={{backgroundColor: '#383c45'}}>
          {
            content?.map((contenido, index) => {
              return (
                <DialogContentText key={contenido + index} id="alert-dialog-description">
                  <Typography color={'black'}>{index + inicio + 1}. {contenido}</Typography>
                </DialogContentText>

              )
            })
          }
        </DialogContent>
    </Dialog>
  )
}
