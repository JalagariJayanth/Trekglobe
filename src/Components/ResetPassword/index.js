import { useState } from "react";
import "./index.css";
import { useLocation } from "react-router-dom";


const ResetPassword = () => { 
  const [credentials,setCredentials] = useState({password:"",cpassword:""})
  const [errors,setErrors] = useState({password:"",cpassword:""})
  const [reseted,setReseted] = useState(false)
  let location = useLocation()


  const handleSubmitForm =async event => {
    event.preventDefault()
    const errors = {}
   
    if (credentials.password.trim() === ""){
        errors.password = "This field is required"
    }else if (credentials.password.length < 8) {
        errors.password = "Password must be at least 8 characters long."
    }
   if (credentials.cpassword.trim() === "") {
        errors.cpassword = "This field is required";
   }
   else if (credentials.cpassword !== credentials.password) {
    errors.cpassword = "Passwords do not match";
} 

   setErrors(errors)
   if (Object.keys(errors).length === 0){
      const options = {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            password: credentials.password,
            resetToken: location.pathname.split('/')[2]
        }),
      }
      const url = "http://localhost:5000/user/resetpassword"
      const response = await fetch(url,options)
      const json = await response.json()
      if (json.success){
        console.log("success")
        setReseted(true)
      }else{

        alert(json.message)
      }
   }


  }


 

const onChangePassword = event => {
  setCredentials({...credentials, password: event.target.value});
  setErrors({...errors,password:""})
};

const onChangeNewPassword = event => {
    setCredentials({...credentials,cpassword:event.target.value})
    setErrors({...errors,cpassword:""})
}


  if (!reseted){

  return (
    <div className="reset-form-container">
      <div className="login-background-container">
        <form onSubmit={handleSubmitForm} className="form-container">
          <h1 className="reset-password-text">Reset password</h1>
          <div className="input-container">
            <label className="reset_input_label" htmlFor="password">
              ENTER NEW PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="reset_password_input_field"
              placeholder="Password"
              value={credentials.password}
              onChange={onChangePassword}
            />
             {errors.password && <p className="error-message">{errors.password}</p>}
            
          </div>
          <div className="input-container">
            <label className="reset_input_label" htmlFor="cpassword">
              CONFIRM ENTER NEW PASSWORD
            </label>
            <input
              type="password"
              id="cpassword"
              className="reset_password_input_field"
              placeholder="Confirm Password"
              value={credentials.cpassword}
              onChange={onChangeNewPassword}
            />
             {errors.cpassword && <p className="error-message">{errors.cpassword}</p>}
           
          </div>
          <button type="submit" className="login-button">
            Reset
          </button>
        </form>
       
        </div>
      </div>
  );
  }else{
    return(
        <div className="reset-successful-bg-container">
            <p className="password-resested-text">Your Password is reset.</p>
            <p className="dont_have_account_text">
          Already have an account?
          <a href="/login" className="link-primary">
            Login
          </a>
        </p>
        </div>
    )
  }
};
export default ResetPassword;
