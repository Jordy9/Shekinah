import { Navbar, Container, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useResponsive } from '../../hooks/useResponsive';
import { obtenerPreguntasJuego } from '../../store/preguntas/thunk';
import { iniciarLogout } from '../../store/auth/thunk'

export const Navb = () => {

  const dispatch = useDispatch();

  const comenzarJuegoRapido = () => {
    dispatch(obtenerPreguntasJuego())
  }

  const { uid } = useSelector(state => state.auth);

  const [respWidth] = useResponsive()

  return (
    <>

      {
        (respWidth >= 992)
          ?
        <Navbar fixed='top' expand="lg" bg = 'dark' variant="dark">
          <Container>
            <Navbar.Brand style = {{cursor: 'pointer'}}>Shekinah</Navbar.Brand>
        
            <Nav className="ml-auto">
              <button onClick={comenzarJuegoRapido} className='btn text-white' style={{backgroundColor: 'rgba(33,93,59,255)'}}>Jugar partida rapida</button>
              {
                (uid)
                  &&
                <button onClick={() => dispatch(iniciarLogout())} className='btn text-white ml-5' style={{backgroundColor: 'red'}}><i className="bi bi-box-arrow-right"></i></button>
              }
            </Nav>
          </Container>
        </Navbar>
          :
        <Navbar fixed='bottom' expand="lg" bg = 'dark' variant="dark">
          <Container>
            <Navbar.Brand style = {{cursor: 'pointer'}}>Shekinah</Navbar.Brand>
        
            <Nav className="ml-auto" style={{flexDirection: 'row'}}>
              <button onClick={comenzarJuegoRapido} className='btn text-white' style={{backgroundColor: 'rgba(33,93,59,255)'}}>Jugar</button>
              {
                (uid)
                  &&
                <button onClick={() => dispatch(iniciarLogout())} className='btn text-white mx-4' style={{backgroundColor: 'red'}}><i className="bi bi-box-arrow-right"></i></button>
              }
            </Nav>
          </Container>
        </Navbar>
      }
    </>
  );
}