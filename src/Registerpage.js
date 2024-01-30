import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser , faLock} from '@fortawesome/free-solid-svg-icons';

import './Registerstyle.css';

const Registerpage = () => {
    return(
        <div className='wrapper'>
        <form action=''>
            <h1>Register</h1>
            <div className='input-box'>
                <input type='text' placeholder='Email' required />
                <FontAwesomeIcon icon={faUser} className='icon' />
            </div>
            <div className='input-box'>
                <input type='password' placeholder='New Password' required />
                <FontAwesomeIcon icon={faLock} className='icon' />
            </div>
            <div className='input-box'>
                <input type='password' placeholder='Confirm Password' required />
                <FontAwesomeIcon icon={faLock} className='icon' />
            </div>
            <Link to='/accessories'>
            <button type='Submit'>Register</button>
            </Link>
            <div className='register-link'>
                <p>Already have an account? <Link to='/'>Login</Link></p>
            </div>
        </form>
    </div>
    );
};
export default Registerpage;