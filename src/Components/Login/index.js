import "./index.css";
import { useState } from "react";

import { useNavigate } from "react-router-dom";


const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [backendMsg, setBackendMsg] = useState("");
  let navigate = useNavigate();

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const errors = {};
    setBackendMsg("");
    if (credentials.email.trim() === "") {
      errors.email = "This field is required";
    } else if (!isValidEmail(credentials.email)) {
      errors.email = "Invalid email Format";
    }
    if (credentials.password.trim() === "") {
      errors.password = "This field is required";
    } else if (credentials.password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      };
      const url = "http://localhost:5000/user/login";
      const response = await fetch(url, options);
      const json = await response.json();
      if (json.success) {
        localStorage.setItem("jwtToken", json.jwtToken);
        navigate("/");
      } else {
        setBackendMsg(json.message);
      }
    }
  };

  const onChangeEmail = (event) => {
    setCredentials({ ...credentials, email: event.target.value });
    setErrors({ ...errors, email: "" });
  };

  const onChangePassword = (event) => {
    setCredentials({ ...credentials, password: event.target.value });
    setErrors({ ...errors, password: "" });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="login-form-container">
      <img
        src="https://res.cloudinary.com/dau2bi3nn/image/upload/v1693192656/Screenshot_420_ysaot0.png"
        alt="loading"
        className="login-image-logo-trekglobal"
      />
      <div className="login-background-container">
        <form
          onSubmit={handleSubmitForm}
          className="login-input-form-container"
        >
          <h1 className="login-text">Log in</h1>
          <div className="input-container">
            <label className="input-label" htmlFor="email">
              EMAIL
            </label>
            <input type="email"  className="login_email_input_field" id="email" placeholder="Email" 
            onChange={onChangeEmail} value={credentials.email}/>

            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="input-container">
            <label className="input-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="login_password_input_field"
              placeholder="Password"
              value={credentials.password}
              onChange={onChangePassword}
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
            {backendMsg && <p className="error-message">{backendMsg}</p>}

            





          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="forgot_password_text">
          <a href="/forgotpassword" className="link-primary">
            Forgot Password?
          </a>
        </p>
        <p className="dont_have_account_text">
          Don't have an account?
          <a href="/signup" className="link-primary">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
};
export default Login;
