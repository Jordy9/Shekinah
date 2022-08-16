import { Navbar, Container, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { iniciarLogout } from '../../store/auth/thunk'

export const Navb = () => {

  const dispatch = useDispatch();

  const { uid } = useSelector(state => state.auth);

  return (
    <>
      <Navbar fixed='top' expand="lg" bg = 'dark' variant="dark">
        <Container>
          <Navbar.Brand style = {{cursor: 'pointer'}}>Shekinah</Navbar.Brand>
      
          <Nav className="ml-auto">
            {
              (uid)
                &&
              <button onClick={() => dispatch(iniciarLogout())} className='button-75 text-white ml-5' style={{backgroundColor: 'red'}}><i className="bi bi-box-arrow-right"></i></button>
            }
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}