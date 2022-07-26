import { Navbar, Container, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useResponsive } from '../../hooks/useResponsive';
import { obtenerPreguntasJuego } from '../../store/preguntas/thunk';

export const Navb = () => {

  const dispatch = useDispatch();

  const comenzarJuegoRapido = () => {
    dispatch(obtenerPreguntasJuego())
  }

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
            </Nav>
          </Container>
        </Navbar>
          :
        <Navbar fixed='bottom' expand="lg" bg = 'dark' variant="dark">
          <Container>
            <Navbar.Brand style = {{cursor: 'pointer'}}>Shekinah</Navbar.Brand>
        
            <Nav className="ml-auto">
              <button onClick={comenzarJuegoRapido} className='btn text-white' style={{backgroundColor: 'rgba(33,93,59,255)'}}>Jugar</button>
            </Nav>

            <Nav className="ml-auto">
              <button onClick={comenzarJuegoRapido} className='btn text-white' style={{backgroundColor: 'rgba(33,93,59,255)'}}>Personalizada</button>
            </Nav>
          </Container>
        </Navbar>
      }
    </>
  );
}