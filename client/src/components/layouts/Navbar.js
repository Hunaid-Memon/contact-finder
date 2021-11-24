import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

const Navbar = ({ title, icon }) => {
    return (
        <div className="navbar bg-primary" >
            <h1>
            <i className={icon} /> {title }
            </h1>
            <ul>
                <li>
                    <Link to='/' >Home</Link>
                    <Link to='/about' >About</Link>
                    <Link to='/register' >Register User</Link>
                    <Link to='/login' >Login User</Link>
                </li>
            </ul>
        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}

Navbar.defaultProps = {
    title: "Contact Management",
    icon: "fas fa-id-card-alt"
}

export default Navbar;