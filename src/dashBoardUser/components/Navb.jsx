import { ArrowBackIos, Logout, MenuTwoTone } from '@mui/icons-material';
import { AppBar, Avatar, Box, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { iniciarLogout } from '../../store/auth/thunk'

export const Navb = ({setShow}) => {

  const dispatch = useDispatch();

  const { uid } = useSelector(state => state.auth);

  const navigate = useNavigate()

  const { pathname } = useLocation()

  const activeStyle = {
    textDecoration: "none",
    color: 'white'
}

const noStyle = {
    textDecoration: 'none',
    color: 'grey'
}

  return (
    <>
      <AppBar color='primary' component="nav">
        <Toolbar>

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
          {
            (pathname === '/Perfil')
              &&
            <IconButton onClick={() => navigate('/lobi')}>
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
          >
            <Avatar
              onClick = {() => navigate('/Perfil')}
              alt="Remy Sharp"
              src="https://mui.com/static/images/avatar/2.jpg"
              sx={{ width: 50, height: 50, cursor: 'pointer' }}
            />
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