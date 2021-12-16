import React, {useContext} from 'react';
import {  Routes, Route, Navigate  } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';





const PrivateRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, loading } = authContext;
    // const location = useLocation();
    return (
            <Routes>
                <Route {...rest} 
                render={props =>  !isAuthenticated && !loading ? (
                    <Navigate to='/login'
                    // replace
                    // state={{ path: location.pathname }}

                    // <Login />

                // />
                //     <Navigate
                //     to={{ pathname: '/login', state: { from: props.location } }}
                  />
                ): (
                    <Component {...props} />
                )} />
            </Routes>
    )
}

export default PrivateRoute;
