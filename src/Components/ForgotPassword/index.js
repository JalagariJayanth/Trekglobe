import { useState } from "react";
import "./index.css";


const ForgotPassword = () => {
  const [credentials, setCredentials] = useState({ email: "" });
  const [errors, setErrors] = useState({ email: "" });
  const [backendMsg, setBackendMsg] = useState("");



  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const errors = {};
    setBackendMsg("");
   
    if (credentials.email.trim() === "") {
      errors.email = "This field is required";
    } else if (!isValidEmail(credentials.email)) {
      errors.email = "Invalid email Format";
    }
    setErrors(errors);
    // console.log("succed")

    if (Object.keys(errors).length === 0) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
        }),
      };
      const url = "http://localhost:5000/user/forgotpassword";
      const response = await fetch(url, options);
      const json = await response.json();
      if (json.success) {
        setCredentials({ ...credentials, email: "" });
        alert("Please check your inbox for further instruction to recover your password.")
       
      } else {
        setBackendMsg(json.message);
      }
    }
  };

  const onChangeEmail = (event) => {
    setCredentials({ ...credentials, email: event.target.value });
    setErrors({ ...errors, email: "" });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  return (

    <div className="forgot-form-container">
      <img
        src="https://res.cloudinary.com/dau2bi3nn/image/upload/v1693192656/Screenshot_420_ysaot0.png"
        alt="loading"
        className="forgotpassword-image-logo-trekglobal"
      />
      <div className="forgot-background-container">
        <form onSubmit={handleSubmitForm} className="form-container">
          <h1 className="forgot-text">Password Recovery</h1>
          <div className="input-container">
            <label className="input-label" htmlFor="email">
              Enter user registered email
            </label>
            <input
              type="text"
              id="email"
              className="forgot_password_input_field"
              placeholder="Email"
              onChange={onChangeEmail}
              value={credentials.email}
            /> 
          </div>
          {errors.email && <p className="error-message">{errors.email}</p>}
          {backendMsg && <p className="error-message">{backendMsg}</p>}
         
          <button type="submit" className="login-button">
            Continue
          </button>
        </form>
      </div>
    </div>
  ) 
};
export default ForgotPassword;
