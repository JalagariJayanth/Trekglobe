

import { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [credentials,setCredentials] = useState({ name: "", email: "", password: "", otp: "" })
    const [errors,setErrors] =  useState({ name: "", email: "", password: "", otp: "" })
    const [backendMsg,setBackendMsg] = useState("")
    const [OTP,setOTP] = useState("")
    let navigate = useNavigate()

    const onClickSendOTP =async event => {
        event.preventDefault()
        const errors= {}
        setBackendMsg("")
        if (credentials.email.trim() === ""){
            errors.email = "This field is required"
        }else if (!isValidEmail(credentials.email)){
            errors.email = "Invalid email Format"
        }
        setErrors(errors)
        if (Object.keys(errors).length === 0){
            const options = {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                body:JSON.stringify({
                    OTP:"",
                    email:credentials.email
                })
            }
            const  url = "http://localhost:5000/user/sendotp"
            const response = await fetch(url,options)
            const json = await response.json()
            if (json.success){
                alert("OTP sent successfully")
                setOTP(JSON.stringify(json.OTP))
            }else{
                setBackendMsg(json.message)
            }
        }

    }

    const handleSubmitForm =async event => {
        event.preventDefault()
        const errors = {}
        setBackendMsg("")
        if (credentials.name.trim() === ""){
            errors.name = 'This field is required.'
        }
        if (credentials.email.trim() === ""){
            errors.email = "This field is required"
        }else if (!isValidEmail(credentials.email)){
            errors.email = "Invalid email Format"
        }
        if(credentials.password.trim() === ""){
            errors.password = "This field is required"
        }else if(credentials.password.length < 8){
            errors.password = "Password must be at least 8 characters long."
        }
        if (credentials.otp.trim() === ""){
            errors.otp = "This field is required"
        }else if (credentials.otp !== OTP){
            errors.otp = "Invalid OTP"
            console.log(credentials.otp)
            console.log(OTP)
        }
        setErrors(errors)
        if (Object.keys(errors).length === 0){
            const options = {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    name:credentials.name,
                    email:credentials.email,
                    password:credentials.password,
                })   
            }
            const  url = "http://localhost:5000/user/signup"
            const response = await fetch(url,options)
            const json = await response.json()
            if (json.success){
                navigate("/login")
            }else{
                setBackendMsg(json.message)
            }

        }
    }



    const onChangeName = event => {
        setCredentials({...credentials, name: event.target.value});
        setErrors({...errors,name:""})
    };

    const onChangeEmail = event => {
        setCredentials({...credentials, email: event.target.value});
        setErrors({...errors,email:""})
    };

    const onChangeOtp = event => {
        setCredentials({...credentials, otp: event.target.value});
        setErrors({...errors,otp:""})
    };

    const onChangePassword = event => {
        setCredentials({...credentials, password: event.target.value});
        setErrors({...errors,password:""})
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

  return (
    <div className="signup_form_container">
      <img
        src="https://res.cloudinary.com/dau2bi3nn/image/upload/v1693192656/Screenshot_420_ysaot0.png"
        className="signup-image-logo-trekglobal"
        alt="loading"
      />
      <div className="login_background_container">
        <form onSubmit={handleSubmitForm} className="singup_inputfield_form_container">
          <h1 className="singup_text">Sign Up</h1>
          <div className="input-container">
            <label className="input-label" htmlFor="username">
              NAME
            </label>
            <input
              type="text"
              id="username"
              className="username_input_field"
              placeholder="Username"
              value={credentials.name}
              onChange={onChangeName}
              
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div className="input-container">
            <label className="input-label" htmlFor="email">
              EMAIL
            </label>
            <div className="email_input_container">
              <input
                placeholder="Email"
                type="email"
                className="input_field_email"
                onChange={onChangeEmail}
                value={credentials.email}
                
              />
              <button onClick={onClickSendOTP} className="otp_button">Send OTP</button>
            </div>
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="input-container">
            <label className="input-label" htmlFor="otp">
              OTP
            </label>
            <input
            type="number"
              id="otp"
              className="password_input_field"
              placeholder="OTP"
              onChange={onChangeOtp}
              value={credentials.otp}
              maxLength="6"
              

            />
            {errors.otp && <p className="error-message">{errors.otp}</p>}
          </div>

          <div className="input-container">
            <label className="input-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="password_input_field"
              placeholder="Password"
              onChange={onChangePassword}
              value={credentials.password}
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
            {backendMsg && <p className="error-message">{backendMsg}</p>}
          </div>

          <button type="submit" className="singup_button">
            Signup
          </button>
        </form>
        <p className="dont_have_account_text">
          Already have an account?
          <a href="/login" className="link-primary">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};
export default Signup;
