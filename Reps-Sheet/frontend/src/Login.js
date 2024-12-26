import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import './Login.css'; // Make sure this is the file with the background-video code

function Login() {
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values)); // run your validation

    // If no errors, attempt login:
    if (!errors.email && !errors.password) {
      axios.post('http://localhost:8082/login', values)
        .then((res) => {
          if (res.data === 'Invalid Email or Password') {
            alert('No Record Found');
          } else if (res.data.status === 'Login Success') {
            // Store the name if your backend provides it
            localStorage.setItem('userName', res.data.name);
            navigate('/GUI/dashboard');
          } else {
            alert('Some error: ' + res.data);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const handleInput = (event) => {
    setValues(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  return (
    <div className="background-video-wrapper">
      {/* Background video */}
      <video
        className="background-video"
        autoPlay
        loop
        muted
        src={`${process.env.PUBLIC_URL}/resources/lloop.mp4`}
        // or "/sloop.mp4", make sure the file is in your public/ folder
      />

      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address:</label>
              <input
                type="email"
                name="email"
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
                value={values.password}
                onChange={handleInput}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            {/* Use the same button classes that are in your CSS */}
            <button type="submit" className="btn-login">Login</button>

            {/* Link also styled as a button in your CSS */}
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
