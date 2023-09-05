import { useNavigate } from "react-router-dom";
import "./index.css";

const Navbar = () => {
  const navigate = useNavigate()
  
  const onClickLogin = () => {
    navigate("/login")
  }
  const onClickSignup = () => {
    navigate("/signup")
  }

  const onClickLogout = () => {

    //const token = localStorage.getItem("jwtToken")
    //console.log(token)
    localStorage.removeItem("jwtToken")
    navigate("/login")
  }


  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
            <img
              src="https://res.cloudinary.com/dau2bi3nn/image/upload/v1693057885/trekglobal.logo_l6eqft.png"
              className="website-logo"
              alt="website logo"
            />

         {!localStorage.getItem("jwtToken") ? (
          <div>
           <button onClick={onClickLogin} className="logout-desktop-btn"> Login </button>
           <button onClick={onClickSignup} className="logout-desktop-btn"> Signup </button>
           </div>
         ) :(
          <div className="mobile_navbar_button_text_container">
          
           <button onClick={onClickLogout} type="button" className="nav-mobile-btn">
           <img
             src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
             alt="nav logout"
             className="nav-bar-img"
           />
         </button>
         </div>

         )}

          
         
        </div>
        <div className="nav-bar-large-container">
            <img
              src="https://res.cloudinary.com/dau2bi3nn/image/upload/v1693057885/trekglobal.logo_l6eqft.png"
              className="website-logo"
              alt="website logo"
            />
          
          {!localStorage.getItem("jwtToken")? 
            (<div className="nav_bar_large_items_container">
             <button onClick={onClickLogin} className="logout-desktop-btn"> Login </button>
             <button onClick={onClickSignup} className="logout-desktop-btn"> Signup </button>
             </div>)
          :(
            <div className="nav_bar_large_items_container">
              
              <button onClick={onClickLogout} className="logout-desktop-btn">Logout</button>
              </div>
          )}

        </div>
      </div>
    </nav>
  );
};
export default Navbar;
