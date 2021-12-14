import React, {useContext} from 'react';
import {  Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import Login from '../auth/Login';


const PrivateRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, loading } = authContext;
    return (
            <Routes>
                <Route {...rest} 
                render={props =>  !isAuthenticated && !loading ? (
                    <Navigate to='/login' replace />
                //     <Navigate
                //     to={{ pathname: '/login', state: { from: props.location } }}
                //   />
                ): (
                    <Component {...props} />
                )} />
            </Routes>
    )
}

export default PrivateRoute;
