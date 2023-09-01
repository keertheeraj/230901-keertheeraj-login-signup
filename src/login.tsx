import { Link,useNavigate } from 'react-router-dom';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import './login.css';
import axios from 'axios';
import { error } from "console";
import Validation from './loginValid'; 

interface Values {
  email: string;
  password: string;
}

interface Errors {
  email: string;
  password: string;
}

function Login() {
  const [values, setValues] = useState<Values>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Errors>({
    email: '',
    password: '',
  });

  const HandleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const navigate = useNavigate();
  const HandleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);
    if ( !validationErrors.email && !validationErrors.password) {
      axios.post('http://localhost:8085/login',values)
          .then(res => {
              if(res.data === "Success"){
                localStorage.setItem('userEmail', values.email);
                navigate('/profile')
              } else{
                alert("No record existed");
              }
          })
          .catch(err => console.log(err));
  }
  };

  return (
    <div className="login-main-container">
      <div className="loginsub-container">
        <h1 className="login-heading">Sign In</h1>
        <form className="login-form" onSubmit={HandleSubmit}>
          <div>
            <label></label>
            <br />
            <div className="input-icon">
              <input
                type="email"
                placeholder="E-mail"
                id="userName"
                onChange={HandleInput}
                name="email"
                value={values.email}
              />
              {errors.email && <span className="text-danger">{errors.email}</span>}
            </div>
          </div>
          <div>
            <label></label>
            <br />
            <div className="input-icon">
              <input
                type="password"
                placeholder="Password"
                id="password"
                onChange={HandleInput}
                name="password"
                value={values.password}
              />
              {errors.password && <span className="text-danger">{errors.password}</span>}
            </div>
          </div>
          <button className="login-button" type="submit">
            Sign In
          </button>
          <Link to='/dashboard'></Link>
        </form>
        <h3 className="sign-in-footer-text">
          Don't have an account?{' '}
          <Link to="/registration" className="sign-up-text">
            Sign up
          </Link>
        </h3>
      </div>
    </div>
  );
}
export default Login;