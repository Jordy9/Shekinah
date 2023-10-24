import { Avatar, Box, CircularProgress, Divider, Grid, Paper, Typography } from '@mui/material'
import React from 'react'

export const CuestionarioNew = () => {
  return (
    <Box id='image' sx={{ height: '100vh', width: '100%', p: 2, color: 'white', position: 'relative' }}>
        <Box sx={{ position: 'absolute', top: 0, left: 0 }}>
            <Box>
                <Avatar
                    src='https://mui.com/static/images/avatar/1.jpg'
                />
                <Typography>
                    Fulano
                </Typography>

                <CircularProgress variant="deteminate" value={50} />
            </Box>
        </Box>
        <Box display={ 'flex' } justifyContent={ 'center' } alignItems={ 'end' } height={ '100%' }>
            <Box className='glass' px={ 3 } py={ 2 } sx={{ width: '70%', height: '85vh' }} display={ 'flex' } flexDirection={ 'column' } justifyContent={ 'space-between' }>
                <Box className='glassTitle' sx={{ height: '150px', overflow: 'auto' }}>
                    <h2>Esse aute do sit enim cillum duis Lorem sint nostrud excepteur sit voluptate labore. Quis voluptate cupidatat est officia consectetur ullamco fugiat enim duis. Exercitation consectetur duis reprehenderit labore id in dolor. Nostrud magna id do est ea cupidatat.</h2>
                </Box>
                <Divider variant='middle' />
                
                <Grid container columnSpacing={ 2 } rowSpacing={ 2 } sx={{ color: 'white' }}>
                    <Grid item xs={ 6 }>
                        <Box className='glassResp' elevation={ 10 } component={ Paper} sx={{ height: '150px', width: '100%', px: 2, py: 1, border: '1px solid blue', borderRadius: '11px', backgroundColor: 'transparent', overflow: 'auto' }}>
                            <Typography color={ 'black' } component={ 'span' } align='left'>
                                Irure Lorem irure magna est veniam exercitation veniam elit ullamco ea magna pariatur ea adipisicing.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={ 6 }>
                        <Box className='glassResp' elevation={ 10 } component={ Paper} sx={{ height: '150px', width: '100%', px: 2, py: 1, border: '1px solid blue', borderRadius: '11px', backgroundColor: 'transparent', overflow: 'auto' }}>
                            <Typography color={ 'black' } component={ 'span' } align='left'>
                                Commodo eiusmod ex nostrud eu id eiusmod ex in incididunt anim consectetur incididunt.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={ 6 }>
                        <Box className='glassResp' elevation={ 10 } component={ Paper} sx={{ height: '150px', width: '100%', px: 2, py: 1, border: '1px solid blue', borderRadius: '11px', backgroundColor: 'transparent', overflow: 'auto' }}>
                            <Typography color={ 'black' } component={ 'span' } align='left'>
                                Minim pariatur velit aliqua nisi consequat labore deserunt quis.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={ 6 }>
                        <Box className='glassResp' elevation={ 10 } component={ Paper} sx={{ height: '150px', width: '100%', px: 2, py: 1, border: '1px solid blue', borderRadius: '11px', backgroundColor: 'transparent', overflow: 'auto' }}>
                            <Typography color={ 'black' } component={ 'span' } align='left'>
                                Et adipisicing adipisicing et eu laborum nisi minim.
                            </Typography>
                        </Box>
                    </Grid>

                </Grid>
            </Box>
        </Box>
    </Box>
  )
}
