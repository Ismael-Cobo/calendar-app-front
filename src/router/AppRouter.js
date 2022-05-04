import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';

export const AppRouter = () => {

    const dispatch = useDispatch()
    const { chekcing, uid } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(startChecking())
    }, [dispatch])

    if( chekcing ) {
        return <h1>Espere...</h1>
    }


    

    return (
        <Router>

            <Switch>
                <PrivateRoutes isAuthenticated={!!uid} exact path='/' component={CalendarScreen} />
                <PublicRoutes isAuthenticated={!!uid} exact path='/login' component={LoginScreen} />
                { /*<Route exact path='/' component={CalendarScreen} /> */}
                {/* <Route exact path='/login' component={LoginScreen} /> */}
                <Redirect to='/' />
            </Switch>
        </Router>
    )
}
