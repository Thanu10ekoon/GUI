import React, { useState } from "react"
import { Link } from "react-router-dom"
import Validation from "./SignupValidation";
import axios from "axios"
import { useNavigate } from 'react-router-dom';


function Signup() 
{
    const [values,setValues]=useState({
        name:'',
        email:'',
        password:''
      })

      const navigate = useNavigate();
    
      const [errors,setErrors]=useState({})
    
      const handleSubmit=(event)=>{
        event.preventDefault();
        const err = Validation(values);
        setErrors(err);
        if(errors.name === "" && errors.email === "" && errors.password === "")
            {
                axios.post('http://localhost:8082/signup',values)
                .then(res => {
                    navigate('/login');
                })
                .catch(err => console.log(err));
            }
      }
    
      const handleINput = (event)=>{
        setValues(prev => ({...prev,[event.target.name]:[event.target.value]}))
      }

    return(
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Sign-Up</h2>
        <form action="" onSubmit={handleSubmit}>
        <div className='mb-3'>
                <label htmlFor="name"><strong>Name</strong></label>
                <input type="text" placeholder='Enter Name' name="name"
                onChange={handleINput} className='form-control rounded-0'/>
                {errors.name && <span class='text-danger'>{errors.name}</span>}
            </div>

            <div className='mb-3'>
                <label htmlFor="email"><strong>Email address</strong></label>
                <input type="email" placeholder='Enter Email' name="email"
                onChange={handleINput} className='form-control rounded-0'/>
                {errors.email && <span class='text-danger'>{errors.email}</span>}
            </div>

            <div className='mb-3'>
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password" placeholder='Enter Password' name="password"
                onChange={handleINput} className='form-control rounded-0'/>
                {errors.password && <span class='text-danger'>{errors.password}</span>}
            </div>
            <button type="submit" className='btn btn-success w-100 rounded-0'><strong>Sign Up</strong></button>
            <p>Agree to T&C</p>
            <Link to='/GUI/login' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'><strong>Login</strong></Link>
        </form>
      </div>
    </div>
    );

}

export default Signup;