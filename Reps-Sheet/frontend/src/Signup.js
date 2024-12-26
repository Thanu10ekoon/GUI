import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';
import './Signup.css';

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

    // Only post if no errors
    if (!err.name && !err.email && !err.password) {
      axios.post('http://localhost:8082/signup', values)
        .then(() => {
          navigate('/GUI/login');
        })
        .catch(err => console.log(err));
    }
  };

  const handleINput = (event) => {
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

      <div className="signup-container">
        <div className="signup-box">
          <h2 className="signup-title">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name"><strong>Name</strong></label>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                onChange={handleINput}
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
                placeholder="Enter Email"
                onChange={handleINput}
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
                placeholder="Enter Password"
                onChange={handleINput}
              />
              {errors.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>

            <p className='p1'>Agree to T&C</p>
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
