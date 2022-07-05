import {
    Switch,
    Route,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Navb } from '../Components/navbar/Navb';
import { UserRoute } from '../dashBoard/routes/UserRoute';

export const AuthRouter = () => {

    return (
        <>
        <Navb />
        <Container>
            <>
                <Switch>
                    <Route path="/auth/*" element={ <UserRoute /> } />
                </Switch>
            </>
        </Container>
    </>
    )
}
