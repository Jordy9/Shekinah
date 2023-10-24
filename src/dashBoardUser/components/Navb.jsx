import { ArrowBackIos, Logout, MenuTwoTone } from '@mui/icons-material';
import { AppBar, Avatar, Box, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { iniciarLogout } from '../../store/auth/thunk'
import { LineasProgress } from './LineasProgress';
import { useResponsive } from '../../hooks/useResponsive';

export const Navb = ({setShow}) => {

  const dispatch = useDispatch();

  const { uid, usuarioActivo } = useSelector(state => state.auth);

  const navigate = useNavigate()

  const { pathname } = useLocation()

  const isCCbs = ( usuarioActivo?.id === '652469d52449387ebbff39da' ) && 'https://yt3.ggpht.com/mf1VTcWGDbw6SnUd1sBFdLFD-Y1LxrJpPWAcqoCZ-9xBOx7UDevKXkzGpxLzotTDFNM5zQCcWg=s176-c-k-c0x00ffffff-no-rj-mo'

  const [ respWidth ] = useResponsive();

  let colorMessage = ''

  if ( usuarioActivo?.level === 'Tierno' ) {
    colorMessage = '#0288d1'
  }

  if ( usuarioActivo?.level === 'Medio' ) {
    colorMessage = '#f57c00'
  }

  if ( usuarioActivo?.level === 'Avanzado' ) {
    colorMessage = 'error.main'
  }

  const withoutProgress = ( usuarioActivo?.level === 'Avanzado' ) ? '6%' : '20%'

  const withoutProgress2 = ( usuarioActivo?.level === 'Avanzado' ) ? ( respWidth > 580 ) ? '15%' : '25' : '50%'

  let total = ( usuarioActivo?.level === 'Medio' ) ? 100 : 200
  
  const porcentage = ( usuarioActivo?.nextLevel / total ) * 100 || 0

  return (
    <>
      <AppBar color='primary' component="nav">
        <Toolbar>

          {
            (usuarioActivo?.role === 'administrador')
              &&
            <IconButton
              onClick={() => setShow(true)}
              size="large"
              edge="start"
              color="secondary"
              aria-label="menu"
              sx={{ }}
            >
              <MenuTwoTone />
            </IconButton>
          }

          {
            (pathname === '/Perfil')
              &&
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBackIos sx = {{color: 'secondary.main'}} />
            </IconButton>
          }
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1}}
          >
            Shekinah
          </Typography>

          {
            ( usuarioActivo )
              &&
            <Box display={ 'flex' } justifyContent={ 'space-between' } alignItems={ 'center' } width={ '100%' }>
              {
                ( respWidth > 360 )
                  ?
                <Box sx={{ ml: 'auto', width: ( respWidth > 991 ) ? withoutProgress : withoutProgress2 }}>
                  <Box sx={{ width: '100%' }}>
                    <Typography p={ 0.5 } component={ 'span' } sx={{ backgroundColor: colorMessage, borderRadius: '12px' }} color={ 'white' } fontSize={ '12px' }>
                      { usuarioActivo?.level }
                    </Typography>
                    {
                      ( usuarioActivo?.level !== 'Avanzado' && respWidth > 370 )
                        &&
                      <LineasProgress value={ porcentage } />
                    }
                  </Box>
                </Box>
                  :
                <Box></Box>
              }

              <Grid
                display={'flex'}
                item justifyContent='end'
                alignItems={'center'}
                mx={1}
                sx = {{overflow: 'hidden'}}
              >
                {/* https://api.dicebear.com/7.x/${category}/svg?seed=${nameAvatar || name} */}
                {
                  ( isCCbs )
                    ?
                  <Avatar onClick = { () => navigate('/Perfil') } src={ isCCbs } variant='circular' sx={{ width: '50px', height: '50px', cursor: 'pointer' }} />
                    :
                  <Avatar sx={{ cursor: 'pointer' }} onClick = {() => navigate('/Perfil')} src={`https://api.dicebear.com/7.x/${usuarioActivo?.avatar?.category}/svg?seed=${usuarioActivo?.avatar?.name || usuarioActivo?.name}`}
                    style = {{
                      backgroundColor: usuarioActivo?.avatar?.backGround, 
                      width: 50, 
                      height: 50, 
                      borderRadius: `${usuarioActivo?.avatar?.radius}%`,
                      transform: 
                        `rotate(${usuarioActivo?.avatar?.rotate}deg) 
                        translateX(${usuarioActivo?.avatar?.translateX}%) 
                        translateY(${usuarioActivo?.avatar?.translateY}%) 
                        scaleX(${(usuarioActivo?.avatar?.flip) ? '-1' : '1'})`,
                      cursor: 'pointer'
                    }}
                    alt="" 
                  />
                }
              </Grid>
            </Box>
          }

          <Box>
            {
              (uid)
                &&
              <IconButton color='error' onClick={() => dispatch(iniciarLogout())}>
                <Logout />
              </IconButton>
            }
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}