import { ArrowBackIos, Logout } from '@mui/icons-material';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { iniciarLogout } from '../../store/auth/thunk'

export const Navb = () => {

  const dispatch = useDispatch();

  const { uid } = useSelector(state => state.auth);

  const navigate = useNavigate()

  const { pathname } = useLocation()

  return (
    <>
      <AppBar color='primary' component="nav">
        <Toolbar>
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