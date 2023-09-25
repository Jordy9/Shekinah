import { Book } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import React from 'react'

export const ButtonShowDialog = ({ recordFiltrado, setShowModalContent, change, tipo }) => {
  return (
    <>
        {
            ( tipo === 'Pregunta' )
                ?
            <Button variant='contained' endIcon = {<Book />} onClick={() => setShowModalContent(true)}>
                {
                    (recordFiltrado[0]?.preguntas[change]?.desdeVersiculo === recordFiltrado[0]?.preguntas[change]?.hastaVersiculo)
                        ?
                    <Typography className='textCard1' variant='subtitle2' color={'white'} component={'span'}>Ver cita: {recordFiltrado[0]?.preguntas[change]?.libro} {Number(recordFiltrado[0]?.preguntas[change]?.capitulo) + 1}:{Number(recordFiltrado[0]?.preguntas[change]?.desdeVersiculo) + 1}</Typography>
                        :
                    <Typography className='textCard1' variant='subtitle2' color={'white'} component={'span'}>Ver cita: {recordFiltrado[0]?.preguntas[change]?.libro} {Number(recordFiltrado[0]?.preguntas[change]?.capitulo) + 1}:{Number(recordFiltrado[0]?.preguntas[change]?.desdeVersiculo) + 1}-{Number(recordFiltrado[0]?.preguntas[change]?.hastaVersiculo) + 1}</Typography>
                }
            </Button>
                :
            <Button variant='contained' endIcon = {<Book />} onClick={() => setShowModalContent(true)}>
                Ver nota
            </Button>
        }
    </>
  )
}
