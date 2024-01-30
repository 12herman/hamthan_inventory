import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser , faLock} from '@fortawesome/free-solid-svg-icons';

import './Loginstyle.css';

const Loginpage = () => {
    return(
        <div className='wrapper'>
            <form action=''>
                <h1>Login</h1>
                <div className='input-box'>
                    <input type='text' placeholder='Username' required />
                    <FontAwesomeIcon icon={faUser} className='icon' />
                </div>
                <div className='input-box'>
                    <input type='password' placeholder='Password' required />
                    <FontAwesomeIcon icon={faLock} className='icon' />
                </div>
                <div className='remember-forgot'>
                    <label><input type="checkbox"/>Remember me</label>
                    <a href='#'>Forgot Password?</a>
                </div>
                <Link to='/user'>
                <button type='Submit'>Login</button>
                </Link>
                <div className='register-link'>
                    <p>Don,t have an account? <Link to='/register'>Register</Link></p>
                </div>
            </form>
        </div>
    );
};
export default Loginpage;