import React, { Fragment } from 'react'
import { Box, Button, CircularProgress, Grid, IconButton, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { BorrarPregunta } from '../../store/record/thunk';
import { GuardarRecord } from '../../store/auth/thunk';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useResponsive } from '../../hooks/useResponsive';
import { Download } from '@mui/icons-material';
import { Document, Page, Text, StyleSheet, PDFDownloadLink, View } from '@react-pdf/renderer';

export const Resultados = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate()

    const { record } = useSelector(state => state.rc);

    const terminarJuego = () => {
        dispatch(BorrarPregunta(record?._id))
        dispatch(GuardarRecord(record))
    }

    const precision = ( record?.aciertos / record?.preguntas?.length ) * 100

    const precisionFinal = ( precision > 0 ) ? precision.toFixed(1) : precision

    useEffect(() => {
      
        if (!record) {
            navigate('/Lobi')
        }

    }, [record, navigate])

    const [ respWidth ] = useResponsive();

    const percent = ( respWidth > 600 ) ? '80%' : '75%'

    const percent2 = ( respWidth > 600 ) ? '20%' : '25%'

    const variant = ( respWidth > 700 ) ? 'h2' : ( respWidth >= 460 && respWidth <= 700 ) ? 'h3' : 'h4'

    const py = ( respWidth > 700 ) ? 3 : 2

    const px = ( respWidth > 700 ) ? 3 : 1.5

    // const resultsRecord = [{ labbel: 'Puntuación', record: record?.puntos }, { label: 'Aciertos', record: record?.aciertos }, { label: 'Errores', record: record?.errores }, { label: ( respWidth > 700 ) ? 'Total de preguntas' : 'Preguntas', record: record?.preguntas?.length }, { label: 'Precisión' , record: `${ precisionFinal }%` }]
    
  return (
    <Box py={ py } px={ px } sx={{ height: '100vh', width: '100%', position: 'relative' }}>
        <Box display={ 'flex' } justifyContent={ 'space-between' }>
            <Typography variant='h4' className='noTextWhite'>Resultados</Typography>

            <ListToPDF record={ record } />
        </Box>
        <Box component={ Paper } p={ 2 } elevation={10} sx = {{width: '100%', height: '80vh', borderRadius: '10px'}}>
            <Box overflow={ 'auto' } height={ percent }>
                <Grid container spacing={2} mb={ 3 }>
                    {
                        record?.preguntas?.map(( pregunta, index ) => (
                            <Grid key={ pregunta._id } item xs={12} sm={ 6 } md={ 4 } lg={ 4 }>
                                <Box component={ Paper } elevation={ 5 } sx={{ p: 2, borderRadius: '11px', height: '100%' }} display={ 'flex' } justifyContent={ 'space-between' } flexDirection={ 'column' } className={`${ ( record?.seleccionadas[index]?.respuesta?.correcta ) ? 'bg-success' : 'bg-danger' }`}>
                                    { pregunta.pregunta }

                                    <Box display={ 'flex' }>
                                        {
                                            ( record?.preguntas[index]?.desdeVersiculo === record?.preguntas[index]?.hastaVersiculo )
                                                ?
                                            <Typography sx={{ backgroundColor: 'black', borderRadius: '11px', px: 1, py: 0.5 }} variant='subtitle2' color={'white'} component={'span'}>Leer: {record?.preguntas[index]?.libro} {Number(record?.preguntas[index]?.capitulo) + 1}:{Number(record?.preguntas[index]?.desdeVersiculo) + 1}</Typography>
                                                :
                                            <Typography sx={{ backgroundColor: 'black', borderRadius: '11px', px: 1, py: 0.5 }} variant='subtitle2' color={'white'} component={'span'}>Leer: {record?.preguntas[index]?.libro} {Number(record?.preguntas[index]?.capitulo) + 1}:{Number(record?.preguntas[index]?.desdeVersiculo) + 1}-{Number(record?.preguntas[index]?.hastaVersiculo) + 1}</Typography>
                                        }
                                    </Box>
                                </Box>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>

            <Grid borderTop={ 1 } container display={ 'flex' } justifyContent={ 'space-between' } alignItems={ 'center' } height={ percent2 }>
                <Box>
                    <Typography textAlign={ 'center' } variant={ variant } className='TextInfo'>{ record?.puntos }</Typography>
                    <Typography textAlign={ 'center' }>Puntuación</Typography>
                </Box>
                <Box mx={ 1 }>
                    <Typography textAlign={ 'center' } variant={ variant } className='TextSuccess'>{ record?.aciertos }</Typography>
                    <Typography textAlign={ 'center' }>Aciertos</Typography>
                </Box>
                <Box mx={ 1 }>
                    <Typography textAlign={ 'center' } variant={ variant } className='TextError'>{ record?.errores }</Typography>
                    <Typography textAlign={ 'center' }>Errores</Typography>
                </Box>
                <Box mx={ 1 }>
                    <Typography textAlign={ 'center' } variant={ variant } className='TextPrimary'>{ record?.preguntas?.length }</Typography>
                    <Typography textAlign={ 'center' }>Total de preguntas</Typography>
                </Box>
                <Box>
                    <Typography textAlign={ 'center' } variant={ variant } className='noTextWhite'>{ precisionFinal }%</Typography>
                    <Typography textAlign={ 'center' }>Precisión</Typography>
                </Box>
            </Grid>
        </Box>

        {
            ( respWidth > 600 )
                ?
            <Box position={ 'absolute' } bottom={ 15 } right={ 20 }>
                <Button sx={{ width: 300 }} onClick={terminarJuego} variant = 'contained'>Terminar</Button>
            </Box>
                :
            <Box position={ 'absolute' } bottom={ 7.5 } right={ '50%' } sx={{ transform: 'translateX(50%)' }}>
                <Button sx={{ width: 300 }} onClick={terminarJuego} variant = 'contained'>Terminar</Button>
            </Box>
        }    
    </Box>
  )
}

const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
    },
    author: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 40,
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: 'justify',
      fontFamily: 'Times-Roman',
      position: 'relative'
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey',
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
    IsCorrecta: {
        padding: 4,
        borderRadius: '11px',
        color: 'white',
        backgroundColor: 'rgba(33,93,59,255)',
        position: 'absolute',
        left: 0,
        marginLeft: 12,
        bottom: 0
    },
    IsIncorrecta: {
        padding: 4,
        borderRadius: '11px',
        color: 'white',
        backgroundColor: '#FF1744',
        position: 'absolute',
        left: 0,
        marginLeft: 12,
        bottom: 0
    },
    leer: {
        backgroundColor: 'black', 
        borderRadius: '11px',
        color: 'white',
        padding: 4,
        marginLeft: 12,
        position: 'absolute',
        right: 0,
        bottom: 0
    }
  });

const MyDocument = ({ record }) => {
    return (
    <Document>
        <Page size="A4" style={styles.body}>
            <Text style={styles.title}>Listado de preguntas</Text>
            {
                record?.preguntas?.map((item, index) => (
                    <Fragment key={index}>
                        <Text style={ styles.text }>
                            {`${index + 1}. ${item.pregunta} ` }
                        </Text>

                        <View style={{ display: 'flex', position: 'relative', marginTop: 30 }}>

                            {
                                ( record?.seleccionadas[index]?.respuesta?.correcta )
                                    ?
                                <Text style={ styles.IsCorrecta }>Correcta</Text>
                                    :
                                <Text style={ styles.IsIncorrecta }>Incorrecta</Text>
                            }

                            {
                                ( item?.desdeVersiculo === item?.hastaVersiculo )
                                    ?
                                <Text strokeWidth={'100px'} style={ styles.leer } variant='subtitle2' color={'white'} component={'span'}>Leer: {item?.libro} {Number(item?.capitulo) + 1}:{Number(item?.desdeVersiculo) + 1}</Text>
                                    :
                                <Text strokeWidth={'100px'} style={ styles.leer } variant='subtitle2' color={'white'} component={'span'}>Leer: {item?.libro} {Number(item?.capitulo) + 1}:{Number(item?.desdeVersiculo) + 1}-{Number(item?.hastaVersiculo) + 1}</Text>
                            }
                        </View>

                            
                    </Fragment>
                ))
            }
        </Page>
    </Document>
    )
}

const ListToPDF = ({ record }) => {
    return (
      <PDFDownloadLink document={<MyDocument record={ record } />} fileName="Listado de preguntas.pdf">
        {
            ({ loading }) => (
                ( loading ) 
                    ?
                <div style={{ paddingRight: 5 }}>
                    <CircularProgress size='30px' />
                </div>
                    : 
                <IconButton>
                    <Download color='info' />
                </IconButton>
            )
        }
      </PDFDownloadLink>
    );
};