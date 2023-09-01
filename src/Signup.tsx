import React, { useState, ChangeEvent, FormEvent } from "react"; 
import Validation from "./SignupValid";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
 import { error } from "console";
 import './signup.css'
interface Values {
    Name: string;
    email: string;
    password: string;
    mobile:string;
}

interface Errors {
    Name: string;
    email: string;
    password: string;
    mobile: string;
}

function Signup() {
    const [values, setValues] = useState<Values>({
        Name: "",
        email: "",
        password: "",
        mobile:""
    });

    const [errors, setErrors] = useState<Errors>({
        Name: "",
        email: "",
        password: "",
        mobile:""
    });
    const navigate = useNavigate();

    const HandleInput = (event: ChangeEvent<HTMLInputElement>) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const HandleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validationErrors = Validation(values);
         setErrors(validationErrors );
         if (!validationErrors.Name && !validationErrors.email && !validationErrors.password && !validationErrors.mobile) {
            axios.post('http://localhost:8085/signup',values)
                .then(res => {
                    navigate('/');
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="reg-main-container">
            <div className="reg-image">
      </div>
            <div className="reg-sub-container">
                <h1 className="registration-heading">Registration </h1>
                <form className="reg-form" onSubmit={HandleSubmit}>
                    <div>
                        <label htmlFor="name">Name : </label>
                        <br />
                        <input
                            type="text"
                            placeholder="Enter Your name"
                            id="name"
                            onChange={HandleInput}
                            name="Name"
                            value={values.Name}
                        />
                        {errors.Name && <span className="text-danger">{errors.Name}</span>}
                    </div>
                    <div>
                        <label htmlFor="E-mail">E-mail : </label>
                        <br />
                        <input
                            type="email"
                            placeholder="Enter User name"
                            id="userName"
                            onChange={HandleInput}
                            name="email"
                            value={values.email}
                        />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div>
                        <label htmlFor="password">Password : </label>
                        <br />
                        <input
                            type="password"
                            placeholder="Enter password"
                            id="password"
                            onChange={HandleInput}
                            name="password"
                            value={values.password}
                        />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <div>
                        <label htmlFor="mobile">Mobile-No : </label>
                        <br />
                        <input
                            type="text"
                            placeholder="Enter Mobile number"
                            id="mobile"
                            onChange={HandleInput}
                            name="mobile"
                            value={values.mobile}
                        />
                        </div>
                    <button type="submit" className="reg-button">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;