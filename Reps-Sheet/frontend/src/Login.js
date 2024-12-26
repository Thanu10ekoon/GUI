import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';  // We'll update this too
import './Signup.css';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));

    if (errors.email === '' && errors.password === '') {
      axios.post('http://localhost:8082/login', values)
        .then(res => {
          if (res.data === 'Login Success') {
            navigate('/GUI/dashboard');
          } else {
            alert('No Record Found');
          }
        })
        .catch(err => console.log(err));
    }
  };

  const handleINput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }));
  };

  return (
    <div className="background-video-wrapper">
      {/* The video is absolutely/fixed positioned in CSS, behind everything */}
      <video 
        className="background-video" 
        autoPlay 
        loop 
        muted 
        src={`${process.env.PUBLIC_URL}/resources/lloop.mp4`}
      />
      
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email"><strong>Email Address</strong></label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                onChange={handleINput}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password"><strong>Password</strong></label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={handleINput}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <button type="submit" className="btn-signup">Login</button>
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
