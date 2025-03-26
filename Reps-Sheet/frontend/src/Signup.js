import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';
import './Signup.css';

const BASE_URL = process.env.REACT_APP_API_URL; // Use base URL from .env

function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const err = Validation(values);
    setErrors(err);

    if (!err.name && !err.email && !err.password) {
      axios.post(`${BASE_URL}/signup`, values)
        .then(() => {
          navigate('/GUI/login');
        })
        .catch(err => console.log(err));
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
      {/* Background video for signup */}
      <video
        className="background-video"
        autoPlay
        loop
        muted
        src={`${process.env.PUBLIC_URL}/resources/sloop.mp4`}
      />
      <div>
        <Link to="/GUI/">
          <img
            src={`${process.env.PUBLIC_URL}/logo192.png`}
            alt="logo"
            className="snav-logo"
          />
        </Link>
      </div>

      <div className="signup-container">
        <div className="signup-box">
          <h2 className="signup-title">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name"><strong>Name</strong></label>
              <input
                type="text"
                name="name"
                placeholder="ex:- Thanujaya"
                onChange={handleInput}
              />
              {errors.name && (
                <span className="error-text">{errors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email"><strong>Email Address</strong></label>
              <input
                type="email"
                name="email"
                placeholder="ex:- eg245364@engug.ruh.ac.lk"
                onChange={handleInput}
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password"><strong>Password</strong></label>
              <input
                type="password"
                name="password"
                placeholder="**********"
                onChange={handleInput}
              />
              {errors.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>

            <p className='p1'>
              <input type="checkbox" className="checkbox"/>Agree to T&C
            </p>
            <button type="submit" className="btn-signup">Sign Up</button>
            
            <Link to="/GUI/login" className="btn-login">
              Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
