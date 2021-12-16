import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes , Route , Navigate} from 'react-router-dom'
import Navbar from './components/layouts/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AlertState from './context/alert/AlertState';
import Alerts from './components/layouts/Alerts';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';


if(localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className='container' >
                <Alerts />
                  <Routes>
                    {/* <Route
                        path='/'
                        element={
                          <PrivateRoute>
                            <Home />
                          </PrivateRoute>}
                      /> */}

                    {/* <Route element={<PrivateRoute/>} >
                    
                     <Route path="/" element= {<Home />} />

                    </Route> */}

                    {/* <PrivateRoute path="/" component={Home} /> */}

                    {/* <PrivateRoute exact path="/" element={<Home />} /> */}
                    {/* <PrivateRoute path="/" element={<Navigate replace to="/home"/>}/> */}
                    <Route path="/" element= {<Home />} />
                    <Route exact path="/about" element= {<About />} />
                    <Route exact path="/register" element= {<Register />} />
                    <Route exact path="/login" element= {<Login />} />
                  </Routes>
              </div>
            </Fragment>
          </Router>
          </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
