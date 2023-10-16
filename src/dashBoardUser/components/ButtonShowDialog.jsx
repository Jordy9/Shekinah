import { Book } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import React from 'react'
import { useResponsive } from '../../hooks/useResponsive'

export const ButtonShowDialog = ({ record, setShowModalContent, change, tipo }) => {

    const [ respWidth ] = useResponsive();

    const message = ( respWidth > 500 ) ? 'Ver cita: ' : 'Ver'

    const className = ( respWidth >= 700 ) ? '' : 'textCard1'

  return (
    <>
        {
            ( tipo === 'Pregunta' )
                ?
            <Button sx={{ boxShadow: 12 }} variant='contained' endIcon = {<Book />} onClick={() => setShowModalContent(true)}>
                {
                    (record?.preguntas[change]?.desdeVersiculo === record?.preguntas[change]?.hastaVersiculo)
                        ?
                    <Typography className={ className } variant='subtitle2' color={'white'} component={'span'}>{ message } {record?.preguntas[change]?.libro} {Number(record?.preguntas[change]?.capitulo) + 1}:{Number(record?.preguntas[change]?.desdeVersiculo) + 1}</Typography>
                        :
                    <Typography className={ className } variant='subtitle2' color={'white'} component={'span'}>{ message } {record?.preguntas[change]?.libro} {Number(record?.preguntas[change]?.capitulo) + 1}:{Number(record?.preguntas[change]?.desdeVersiculo) + 1}-{Number(record?.preguntas[change]?.hastaVersiculo) + 1}</Typography>
                }
            </Button>
                :
            <Button sx={{ boxShadow: 12 }} variant='contained' endIcon = {<Book />} onClick={() => setShowModalContent(true)}>
                Ver nota
            </Button>
        }
    </>
  )
}
