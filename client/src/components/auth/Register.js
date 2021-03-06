// import { set } from 'mongoose';
import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
// import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';



const Register = props => {
    // const history = useHistory();
    const navigate = useNavigate();
    
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext)
    
    const { setAlert } = alertContext;
    const { register, error, clearErrors, isAuthenticated } = authContext;
    
    useEffect(() => {
        
        if(isAuthenticated) {
            // history.push('/');
            navigate('/');
        }

        if (error === 'A User with this email already exists.') {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = user;

    const onChange = e => setUser({...user, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if(name === '' || email === '' || password === '' ) {
            setAlert('Please enter all fields', 'danger')
        } else if (password !== password2) {
            setAlert('Password and Confirm Password do not match', 'danger')
        } else {
           register({
               name,
               email,
               password
           })
        }
    }

    return (
        <div className='form-container'>
            <h1>User Register</h1>
            <form onSubmit={onSubmit} >
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name='name' value={name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name='email' value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name='password' value={password} minLength='6' onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password:</label>
                    <input type="password" name='password2' value={password2} minLength='6' onChange={onChange} />
                </div>
                <input type="submit" value="Register" className='btn btn-primary btn-block' />
            </form>
        </div>
    )
}

export default Register;
