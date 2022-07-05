import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import { AuthRouter } from './AuthRouter';
import moment from 'moment';
import 'moment/locale/es';
import { obtenerUsuarios } from '../store/auth/thunk';

moment.locale('es');

export const AppRouter = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(obtenerUsuarios())
    }, [dispatch])
    
    return (
        <Router>

            <div>
                <Switch>

                    {/* <PublicRoute exact path = '/Login' component = {LoginScreen} isAuthenticated = {!!uid} /> */}
                    {/* <Route path="/auth/*" element={ <AuthRoutes /> } /> */}
                    <Route path = '/' component = {AuthRouter} />

                </Switch>
            </div>

        </Router>
    )
}
