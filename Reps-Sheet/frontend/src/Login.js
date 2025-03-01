import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import './Login.css';

function Login() {
    const [values, setValues] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const err = Validation(values);
        setErrors(err);

        if (!err.email && !err.password) {
            const baseUrl = process.env.REACT_APP_API_URL;
            axios.post(`${baseUrl}/login`, values)
                .then((res) => {
                    if (res.data === 'Invalid Email or Password') {
                        alert('No Record Found');
                    } else if (res.data.status === 'Login Success') {
                        localStorage.setItem('userName', res.data.name);
                        navigate('/GUI/dashboard');
                    } else {
                        alert('Some error: ' + res.data);
                    }
                })
                .catch((err) => console.error('Login Error:', err));
        }
    };

    const handleInput = (event) => {
        setValues((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    return (
        <div className="background-video-wrapper">
            <video
                className="background-video"
                autoPlay
                loop
                muted
                src={`${process.env.PUBLIC_URL}/resources/lloop.mp4`}
            />
            
            <Link to="/GUI/">
                <img 
                    src={`${process.env.PUBLIC_URL}/logo192.png`}
                    alt="Logo"
                    className="snav-logo"
                />
            </Link>

            <div className="login-container">
                <div className="login-box">
                    <h2 className="login-title">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email Address:</label>
                            <input
                                type="email"
                                name="email"
                                placeholder='ex:- eg245364@engug.ruh.ac.lk'
                                value={values.email}
                                onChange={handleInput}
                            />
                            {errors.email && <span className="error-text">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                placeholder='********'
                                value={values.password}
                                onChange={handleInput}
                            />
                            {errors.password && <span className="error-text">{errors.password}</span>}
                        </div>

                        <button type="submit" className="Lbtn-login">Login</button>
                        <Link to="/GUI/signup" className="btn-create">
                            Create Account
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
