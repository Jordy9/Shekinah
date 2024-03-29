import { ArrowBackIos, Logout, MenuTwoTone } from '@mui/icons-material';
import { AppBar, Avatar, Box, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { iniciarLogout } from '../../store/auth/thunk'

export const Navb = ({setShow}) => {

  const dispatch = useDispatch();

  const { uid, usuarioActivo } = useSelector(state => state.auth);

  const navigate = useNavigate()

  const { pathname } = useLocation()

  const { name, category, backGround, radius, flip, rotate, translateX, translateY } = usuarioActivo?.avatar

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
              sx={{ mr: 2 }}
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

          <Grid
            item justifyContent='end'
            mx={1}
            sx = {{overflow: 'hidden'}}
          >
            <img onClick = {() => navigate('/Perfil')} loading="lazy" src={`https://avatars.dicebear.com/api/${category}/:${name || usuarioActivo?.name}.svg`} 
              style = {{
                backgroundColor: backGround, 
                width: 50, 
                height: 50, 
                borderRadius: `${radius}%`,
                transform: 
                  `rotate(${rotate}deg) 
                  translateX(${translateX}%) 
                  translateY(${translateY}%) 
                  scaleX(${(flip) ? '-1' : '1'})`,
                cursor: 'pointer'
              }}
              alt="" />
          </Grid>

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